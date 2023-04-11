OpenLayers.Control.LayerSwitcher=OpenLayers.Class(OpenLayers.Control,{roundedCorner:!0,roundedCornerColor:"darkblue",layerStates:null,layersDiv:null,baseLayersDiv:null,baseLayers:null,dataLbl:null,dataLayersDiv:null,dataLayers:null,minimizeDiv:null,maximizeDiv:null,ascending:!0,initialize:function(e){OpenLayers.Control.prototype.initialize.apply(this,arguments),this.layerStates=[]},destroy:function(){OpenLayers.Event.stopObservingElement(this.div),OpenLayers.Event.stopObservingElement(this.minimizeDiv),OpenLayers.Event.stopObservingElement(this.maximizeDiv),this.clearLayersArray("base"),this.clearLayersArray("data"),this.map.events.un({addlayer:this.redraw,changelayer:this.redraw,removelayer:this.redraw,changebaselayer:this.redraw,scope:this}),OpenLayers.Control.prototype.destroy.apply(this,arguments)},setMap:function(e){OpenLayers.Control.prototype.setMap.apply(this,arguments),this.map.events.on({addlayer:this.redraw,changelayer:this.redraw,removelayer:this.redraw,changebaselayer:this.redraw,scope:this})},draw:function(){return OpenLayers.Control.prototype.draw.apply(this),this.loadContents(),this.outsideViewport||this.minimizeControl(),this.redraw(),this.div},clearLayersArray:function(e){var i=this[e+"Layers"];if(i)for(var s=0,t=i.length;s<t;s++){var a=i[s];OpenLayers.Event.stopObservingElement(a.inputElem),OpenLayers.Event.stopObservingElement(a.labelSpan)}this[e+"LayersDiv"].innerHTML="",this[e+"Layers"]=[]},checkRedraw:function(){var e=!1;if(this.layerStates.length&&this.map.layers.length==this.layerStates.length)for(var i=0,s=this.layerStates.length;i<s;i++){var t=this.layerStates[i],a=this.map.layers[i];if(t.name!=a.name||t.inRange!=a.inRange||t.id!=a.id||t.visibility!=a.visibility){e=!0;break}}else e=!0;return e},redraw:function(){if(!this.checkRedraw())return this.div;this.clearLayersArray("base"),this.clearLayersArray("data");var e=!1,i=!1,s=this.map.layers.length;this.layerStates=new Array(s);for(var t=0;t<s;t++){var a=this.map.layers[t];this.layerStates[t]={name:a.name,visibility:a.visibility,inRange:a.inRange,id:a.id}}var n=this.map.layers.slice();this.ascending||n.reverse();for(t=0,s=n.length;t<s;t++){var r=(a=n[t]).isBaseLayer;if(a.displayInLayerSwitcher){r?i=!0:e=!0;var l=r?a==this.map.baseLayer:a.getVisibility(),h=document.createElement("input");h.id=this.id+"_input_"+a.name,h.name=r?this.id+"_baseLayers":a.name,h.type=r?"radio":"checkbox",h.value=a.name,h.checked=l,h.defaultChecked=l,r||a.inRange||(h.disabled=!0);var y={inputElem:h,layer:a,layerSwitcher:this};OpenLayers.Event.observe(h,"mouseup",OpenLayers.Function.bindAsEventListener(this.onInputClick,y));var o=document.createElement("span");OpenLayers.Element.addClass(o,"labelSpan"),r||a.inRange||(o.style.color="gray"),o.innerHTML=a.name,o.style.verticalAlign=r?"bottom":"baseline",OpenLayers.Event.observe(o,"click",OpenLayers.Function.bindAsEventListener(this.onInputClick,y));var d=document.createElement("br");(r?this.baseLayers:this.dataLayers).push({layer:a,inputElem:h,labelSpan:o});var p=r?this.baseLayersDiv:this.dataLayersDiv;p.appendChild(h),p.appendChild(o),p.appendChild(d)}}return this.dataLbl.style.display=e?"":"none",this.baseLbl.style.display=i?"":"none",this.div},onInputClick:function(e){this.inputElem.disabled||("radio"==this.inputElem.type?(this.inputElem.checked=!0,this.layer.map.setBaseLayer(this.layer)):(this.inputElem.checked=!this.inputElem.checked,this.layerSwitcher.updateMap())),OpenLayers.Event.stop(e)},onLayerClick:function(e){this.updateMap()},updateMap:function(){for(var e=0,i=this.baseLayers.length;e<i;e++){(s=this.baseLayers[e]).inputElem.checked&&this.map.setBaseLayer(s.layer,!1)}for(e=0,i=this.dataLayers.length;e<i;e++){var s;(s=this.dataLayers[e]).layer.setVisibility(s.inputElem.checked)}},maximizeControl:function(e){this.div.style.width="",this.div.style.height="",this.showControls(!1),null!=e&&OpenLayers.Event.stop(e)},minimizeControl:function(e){this.div.style.width="0px",this.div.style.height="0px",this.showControls(!0),null!=e&&OpenLayers.Event.stop(e)},showControls:function(e){this.maximizeDiv.style.display=e?"":"none",this.minimizeDiv.style.display=e?"none":"",this.layersDiv.style.display=e?"none":""},loadContents:function(){OpenLayers.Event.observe(this.div,"mouseup",OpenLayers.Function.bindAsEventListener(this.mouseUp,this)),OpenLayers.Event.observe(this.div,"click",this.ignoreEvent),OpenLayers.Event.observe(this.div,"mousedown",OpenLayers.Function.bindAsEventListener(this.mouseDown,this)),OpenLayers.Event.observe(this.div,"dblclick",this.ignoreEvent),this.layersDiv=document.createElement("div"),this.layersDiv.id=this.id+"_layersDiv",OpenLayers.Element.addClass(this.layersDiv,"layersDiv"),this.baseLbl=document.createElement("div"),this.baseLbl.innerHTML=OpenLayers.i18n("baseLayer"),OpenLayers.Element.addClass(this.baseLbl,"baseLbl"),this.baseLayersDiv=document.createElement("div"),OpenLayers.Element.addClass(this.baseLayersDiv,"baseLayersDiv"),this.dataLbl=document.createElement("div"),this.dataLbl.innerHTML=OpenLayers.i18n("overlays"),OpenLayers.Element.addClass(this.dataLbl,"dataLbl"),this.dataLayersDiv=document.createElement("div"),OpenLayers.Element.addClass(this.dataLayersDiv,"dataLayersDiv"),this.ascending?(this.layersDiv.appendChild(this.baseLbl),this.layersDiv.appendChild(this.baseLayersDiv),this.layersDiv.appendChild(this.dataLbl),this.layersDiv.appendChild(this.dataLayersDiv)):(this.layersDiv.appendChild(this.dataLbl),this.layersDiv.appendChild(this.dataLayersDiv),this.layersDiv.appendChild(this.baseLbl),this.layersDiv.appendChild(this.baseLayersDiv)),this.div.appendChild(this.layersDiv),this.roundedCorner&&(OpenLayers.Rico.Corner.round(this.div,{corners:"tl bl",bgColor:"transparent",color:this.roundedCornerColor,blend:!1}),OpenLayers.Rico.Corner.changeOpacity(this.layersDiv,.75));var e=OpenLayers.Util.getImagesLocation(),i=new OpenLayers.Size(18,18),s=e+"layer-switcher-maximize.png";this.maximizeDiv=OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MaximizeDiv",null,i,s,"absolute"),OpenLayers.Element.addClass(this.maximizeDiv,"maximizeDiv"),this.maximizeDiv.style.display="none",OpenLayers.Event.observe(this.maximizeDiv,"click",OpenLayers.Function.bindAsEventListener(this.maximizeControl,this)),this.div.appendChild(this.maximizeDiv);s=e+"layer-switcher-minimize.png",i=new OpenLayers.Size(18,18);this.minimizeDiv=OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MinimizeDiv",null,i,s,"absolute"),OpenLayers.Element.addClass(this.minimizeDiv,"minimizeDiv"),this.minimizeDiv.style.display="none",OpenLayers.Event.observe(this.minimizeDiv,"click",OpenLayers.Function.bindAsEventListener(this.minimizeControl,this)),this.div.appendChild(this.minimizeDiv)},ignoreEvent:function(e){OpenLayers.Event.stop(e)},mouseDown:function(e){this.isMouseDown=!0,this.ignoreEvent(e)},mouseUp:function(e){this.isMouseDown&&(this.isMouseDown=!1,this.ignoreEvent(e))},CLASS_NAME:"OpenLayers.Control.LayerSwitcher"});