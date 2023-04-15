/*******************************************************************************
 * This file is part of OpenNMS(R).
 *
 * Copyright (C) 2021 The OpenNMS Group, Inc.
 * OpenNMS(R) is Copyright (C) 1999-2021 The OpenNMS Group, Inc.
 *
 * OpenNMS(R) is a registered trademark of The OpenNMS Group, Inc.
 *
 * OpenNMS(R) is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * OpenNMS(R) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with OpenNMS(R).  If not, see:
 *      http://www.gnu.org/licenses/
 *
 * For more information contact:
 *     OpenNMS(R) Licensing <license@opennms.org>
 *     http://www.opennms.org/
 *     http://www.opennms.com/
 *******************************************************************************/

 package org.opennms.features.kafka.consumer.events;

 import java.util.List;
 import java.util.Objects;
 import java.util.Optional;
 import java.util.stream.Collectors;
 
 import org.opennms.core.utils.InetAddressUtils;
 import org.opennms.netmgt.model.OnmsSeverity;
 import org.opennms.netmgt.model.events.EventBuilder;
 import org.opennms.netmgt.xml.event.Event;
 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;
 
 import com.google.common.base.Strings;
 
 //imports needed for xml parser
 import javax.xml.stream.XMLEventReader;
 import java.io.StringReader;
 import java.util.HashMap;
 import java.util.Map;
 import java.util.function.Consumer;
 import javax.xml.stream.XMLInputFactory;
 import javax.xml.stream.XMLStreamException;
 import javax.xml.stream.events.StartElement;
 import javax.xml.stream.events.XMLEvent;
 import org.apache.kafka.clients.consumer.ConsumerRecord;
 import java.text.ParseException;
 import java.text.SimpleDateFormat;
 import java.util.ArrayList;
 import java.util.Date;
 
 //imports needed to turn a event into an alarm
 import org.opennms.netmgt.xml.event.AlarmData;
 
 //imports needed to access opennms postgres database
 import java.sql.Connection;
 import java.sql.DriverManager;
 import java.sql.PreparedStatement;
 import java.sql.ResultSet;
 import java.sql.SQLException;

 public class EventsMapper{
    
     //Logger variable
     private static final Logger LOG = LoggerFactory.getLogger(EventsMapper.class);

     //To handle each parameter of the xml event
     private static final Map<String, Consumer<XMLEvent>> handlers = new HashMap<>();
    
     //Variables needed for xml event parser logic
     private static final XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
     private static EventBuilder opennms_event;
     private static AlarmData alarmData;

     //Variables needed to set the raised event time
     private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
     private static Date date;
     
     //Variables needed for accessing opennms postgres database
     private static final String jdbcUrl = "jdbc:postgresql://localhost:5432/opennms";
     private static final String username = "opennms";
     private static final String password = "opennms";
     private static final String query = "SELECT nodeid FROM node WHERE nodelabel = ?";

     //Handlers implementation
     static{
        // handlers.put("eventTime", event -> LOG.info(event.asCharacters().getData()));
        handlers.put("alarm-id", event -> {
           opennms_event.setUei("uei.nokia/"+event.asCharacters().getData());
           alarmData.setReductionKey("uei.nokia/"+event.asCharacters().getData());
            //alarmData.setClearKey(source.getClearKey());
           // LOG.info(event.asCharacters().getData());
        });

        //handlers.put("idalarm", handlers.get("alarm-id"));
        handlers.put("alarmNotificationOrigin", event -> {
           opennms_event.setSource("Default");
           // LOG.info(event.asCharacters().getData());
        });

        handlers.put("alarmResource", event -> {
           // LOG.info(event.asCharacters().getData());
        });

        handlers.put("alarmResourceUiName", event -> {
           // LOG.info(event.asCharacters().getData());
        });

        handlers.put("alarmSeverity", event -> {
            //severity
            opennms_event.setSeverity(OnmsSeverity.get(event.asCharacters().getData()).getLabel());
        });

        handlers.put("alarmStatus", event -> {
            if(event.asCharacters().getData().equalsIgnoreCase("Active")){
                alarmData.setAlarmType(1);
            }else if(event.asCharacters().getData().equalsIgnoreCase("Inactive")){
                alarmData.setAlarmType(2);
            }
            LOG.info(event.asCharacters().getData());

            opennms_event.setAlarmData(alarmData);
        });

        // handlers.put("alarmText", event -> {
        //     if (event.isCharacters()) {
        //         String data = event.asCharacters().getData();
        //         if (!data.trim().isEmpty()) {
        //             LOG.info(" {}", data);
        //         }
        //     }
        // });
        // handlers.put("alarmText", event -> LOG.info(event.asCharacters().getData()));

        handlers.put("alarmType", event -> {
           // getString(event.asCharacters().getData()).ifPresent(opennms_event::setLogMessage);
           // LOG.info(event.asCharacters().getData());
        });

        handlers.put("alarmTypeId", event -> {
           //logMessage
           // opennms_event.setLogMessage(event.asCharacters().getData());
           opennms_event.setLogDest("logndisplay");
           getString(event.asCharacters().getData()).ifPresent(opennms_event::setLogMessage);
        });

        // handlers.put("customField1", event -> LOG.info(event.asCharacters().getData()));
        // handlers.put("customField2", event -> LOG.info(event.asCharacters().getData()));
        // handlers.put("customField3", event -> LOG.info(event.asCharacters().getData()));
        handlers.put("deviceRefId", event -> {
           try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password)) {
               String query = "SELECT nodeid FROM node WHERE nodelabel = ?";
               PreparedStatement pstmt = conn.prepareStatement(query);
               pstmt.setString(1, event.asCharacters().getData());
               ResultSet rs = pstmt.executeQuery();
               while (rs.next()) {
                   // LOG.info("Node ID: " + rs.getInt("nodeid"));
                   opennms_event.setNodeid(rs.getInt("nodeid"));
               }
           } catch (SQLException e) {
               e.printStackTrace();
           }
           
           // LOG.info(event.asCharacters().getData());
        });

        handlers.put("eventType", event -> {
           // LOG.info(event.asCharacters().getData());
        });

        handlers.put("lastStatusChangeTime", event -> {
            
           // LOG.info(event.asCharacters().getData());
        });

        handlers.put("neIpAddress", event -> {
           //ip address.
           getString(event.asCharacters().getData()).ifPresent(ip -> opennms_event.setInterface(InetAddressUtils.getInetAddress(ip)));
           
        });

        handlers.put("objectId", event -> {
           //LOG.info(event.asCharacters().getData());
        });

        handlers.put("proposedRepairAction", event -> {
            //description
            getString(event.asCharacters().getData()).ifPresent(opennms_event::setDescription);
        });

        handlers.put("raisedTime", event -> {
            try {
               opennms_event.setTime(dateFormat.parse(event.asCharacters().getData()));
            //    LOG.info(event.asCharacters().getData());
            } catch (ParseException e) {
                e.printStackTrace();
            }
           
        });

        handlers.put("serviceAffecting", event -> {
           // LOG.info(event.asCharacters().getData());
        });

        handlers.put("tl1Cause", event -> {
           // LOG.info(event.asCharacters().getData());
        });
    }
 
     //Function to parse xml events
     public static Event toEventXml(ConsumerRecord<String, String> record) throws XMLStreamException{
 
         XMLEventReader xmlEventReader = xmlInputFactory.createXMLEventReader(new StringReader(record.value()));
         opennms_event = new EventBuilder();
         alarmData = new AlarmData();

         while(xmlEventReader.hasNext()) {
             XMLEvent event = xmlEventReader.nextEvent();
             if (event.isStartElement()) {
                 StartElement startElement = event.asStartElement();
                 String elementName = startElement.getName().getLocalPart();
                 Consumer<XMLEvent> handler = handlers.get(elementName);
                 if (handler != null) {
                     handler.accept(xmlEventReader.nextEvent());
                 }
             }else if (event.isEndElement() && event.asEndElement().getName().getLocalPart().equals("alarms")) {
                 LOG.info("---- finished parsing ------");
             }
         }
         return opennms_event.getEvent();
     }
    
     //Function to parse protobuf events
     public static Event toEvent(EventsProto.Event pbEvent) {
         if (Strings.isNullOrEmpty(pbEvent.getUei())) {
             LOG.warn("Event will not be forwarded, `uei` is required field, skipped Event : \n {}", pbEvent);
             return null;
         }
         if (Strings.isNullOrEmpty(pbEvent.getSource())) {
             LOG.warn("Event will not be forwarded, `source` is required field, skipped Event : \n {}", pbEvent);
             return null;
         }
         final EventBuilder builder = new EventBuilder(pbEvent.getUei(), pbEvent.getSource());
         builder.setSeverity(OnmsSeverity.get(pbEvent.getSeverity().name()).getLabel());
         getString(pbEvent.getHost()).ifPresent(builder::setHost);
         if (pbEvent.getNodeId() > 0) {
             builder.setNodeid(pbEvent.getNodeId());
         }
         getString(pbEvent.getIpAddress()).ifPresent(ip -> builder.setInterface(InetAddressUtils.getInetAddress(ip)));
         getString(pbEvent.getServiceName()).ifPresent(builder::setService);
         if (pbEvent.getIfIndex() > 0) {
             builder.setIfIndex(pbEvent.getIfIndex());
         }
         getString(pbEvent.getDistPoller()).ifPresent(builder::setDistPoller);
         getString(pbEvent.getDescription()).ifPresent(builder::setDescription);
         getString(pbEvent.getLogDest()).ifPresent(builder::setLogDest);
         getString(pbEvent.getLogContent()).ifPresent(builder::setLogMessage);
         for (EventsProto.EventParameter p : pbEvent.getParameterList()) {
             builder.setParam(p.getName(), p.getValue());
         }
         return builder.getEvent();
     }
     
     //Function to parse protobuf events
     public static List<Event> mapProtobufToEvents(List<EventsProto.Event> pbEvents) {
         return pbEvents.stream().map(EventsMapper::toEvent).filter(Objects::nonNull).collect(Collectors.toList());
     }
     
     //Aux function to detect if a parameter is null or not
     private static Optional<String> getString(String value) {
         if (!Strings.isNullOrEmpty(value)) {
             return Optional.of(value);
         }
         return Optional.empty();
     }
 }
 