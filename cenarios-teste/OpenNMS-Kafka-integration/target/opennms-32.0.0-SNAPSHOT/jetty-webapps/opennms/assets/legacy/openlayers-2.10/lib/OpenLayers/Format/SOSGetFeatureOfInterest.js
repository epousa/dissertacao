OpenLayers.Format.SOSGetFeatureOfInterest=OpenLayers.Class(OpenLayers.Format.XML,{VERSION:"1.0.0",namespaces:{sos:"http://www.opengis.net/sos/1.0",gml:"http://www.opengis.net/gml",sa:"http://www.opengis.net/sampling/1.0",xsi:"http://www.w3.org/2001/XMLSchema-instance"},schemaLocation:"http://www.opengis.net/sos/1.0 http://schemas.opengis.net/sos/1.0.0/sosAll.xsd",defaultPrefix:"sos",regExes:{trimSpace:/^\s*|\s*$/g,removeSpace:/\s*/g,splitSpace:/\s+/,trimComma:/\s*,\s*/g},initialize:function(e){OpenLayers.Format.XML.prototype.initialize.apply(this,[e])},read:function(e){"string"==typeof e&&(e=OpenLayers.Format.XML.prototype.read.apply(this,[e])),e&&9==e.nodeType&&(e=e.documentElement);var t={features:[]};this.readNode(e,t);for(var s=[],r=0,a=t.features.length;r<a;r++){var n=t.features[r];this.internalProjection&&this.externalProjection&&n.components[0]&&n.components[0].transform(this.externalProjection,this.internalProjection);var i=new OpenLayers.Feature.Vector(n.components[0],n.attributes);s.push(i)}return s},readers:{sa:{SamplingPoint:function(e,t){if(!t.attributes){var s={attributes:{}};t.features.push(s),t=s}t.attributes.id=this.getAttributeNS(e,this.namespaces.gml,"id"),this.readChildNodes(e,t)},position:function(e,t){this.readChildNodes(e,t)}},gml:OpenLayers.Util.applyDefaults({FeatureCollection:function(e,t){this.readChildNodes(e,t)},featureMember:function(e,t){var s={attributes:{}};t.features.push(s),this.readChildNodes(e,s)},name:function(e,t){t.attributes.name=this.getChildValue(e)},pos:function(e,t){this.externalProjection||(this.externalProjection=new OpenLayers.Projection(e.getAttribute("srsName"))),OpenLayers.Format.GML.v3.prototype.readers.gml.pos.apply(this,[e,t])}},OpenLayers.Format.GML.v3.prototype.readers.gml)},writers:{sos:{GetFeatureOfInterest:function(e){for(var t=this.createElementNSPlus("GetFeatureOfInterest",{attributes:{version:this.VERSION,service:"SOS","xsi:schemaLocation":this.schemaLocation}}),s=0,r=e.fois.length;s<r;s++)this.writeNode("FeatureOfInterestId",{foi:e.fois[s]},t);return t},FeatureOfInterestId:function(e){return this.createElementNSPlus("FeatureOfInterestId",{value:e.foi})}}},CLASS_NAME:"OpenLayers.Format.SOSGetFeatureOfInterest"});