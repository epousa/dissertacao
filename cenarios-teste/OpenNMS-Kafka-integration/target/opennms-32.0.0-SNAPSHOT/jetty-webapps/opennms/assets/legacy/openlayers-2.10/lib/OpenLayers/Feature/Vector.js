OpenLayers.State={UNKNOWN:"Unknown",INSERT:"Insert",UPDATE:"Update",DELETE:"Delete"},OpenLayers.Feature.Vector=OpenLayers.Class(OpenLayers.Feature,{fid:null,geometry:null,attributes:null,bounds:null,state:null,style:null,url:null,renderIntent:"default",initialize:function(e,t,r){OpenLayers.Feature.prototype.initialize.apply(this,[null,null,t]),this.lonlat=null,this.geometry=e||null,this.state=null,this.attributes={},t&&(this.attributes=OpenLayers.Util.extend(this.attributes,t)),this.style=r||null},destroy:function(){this.layer&&(this.layer.removeFeatures(this),this.layer=null),this.geometry=null,OpenLayers.Feature.prototype.destroy.apply(this,arguments)},clone:function(){return new OpenLayers.Feature.Vector(this.geometry?this.geometry.clone():null,this.attributes,this.style)},onScreen:function(e){var t=!1;if(this.layer&&this.layer.map){var r=this.layer.map.getExtent();if(e){var i=this.geometry.getBounds();t=r.intersectsBounds(i)}else{t=r.toGeometry().intersects(this.geometry)}}return t},getVisibility:function(){return!(this.style&&"none"==this.style.display||!this.layer||this.layer&&this.layer.styleMap&&"none"==this.layer.styleMap.createSymbolizer(this,this.renderIntent).display||this.layer&&!this.layer.getVisibility())},createMarker:function(){return null},destroyMarker:function(){},createPopup:function(){return null},atPoint:function(e,t,r){var i=!1;return this.geometry&&(i=this.geometry.atPoint(e,t,r)),i},destroyPopup:function(){},move:function(e){if(this.layer&&this.geometry.move){var t;t="OpenLayers.LonLat"==e.CLASS_NAME?this.layer.getViewPortPxFromLonLat(e):e;var r=this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat()),i=this.layer.map.getResolution();return this.geometry.move(i*(t.x-r.x),i*(r.y-t.y)),this.layer.drawFeature(this),r}},toState:function(e){if(e==OpenLayers.State.UPDATE)switch(this.state){case OpenLayers.State.UNKNOWN:case OpenLayers.State.DELETE:this.state=e;case OpenLayers.State.UPDATE:case OpenLayers.State.INSERT:}else if(e==OpenLayers.State.INSERT)if(this.state===OpenLayers.State.UNKNOWN);else this.state=e;else if(e==OpenLayers.State.DELETE)switch(this.state){case OpenLayers.State.INSERT:case OpenLayers.State.DELETE:break;case OpenLayers.State.UNKNOWN:case OpenLayers.State.UPDATE:this.state=e}else e==OpenLayers.State.UNKNOWN&&(this.state=e)},CLASS_NAME:"OpenLayers.Feature.Vector"}),OpenLayers.Feature.Vector.style={default:{fillColor:"#ee9900",fillOpacity:.4,hoverFillColor:"white",hoverFillOpacity:.8,strokeColor:"#ee9900",strokeOpacity:1,strokeWidth:1,strokeLinecap:"round",strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"inherit"},select:{fillColor:"blue",fillOpacity:.4,hoverFillColor:"white",hoverFillOpacity:.8,strokeColor:"blue",strokeOpacity:1,strokeWidth:2,strokeLinecap:"round",strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"pointer"},temporary:{fillColor:"#66cccc",fillOpacity:.2,hoverFillColor:"white",hoverFillOpacity:.8,strokeColor:"#66cccc",strokeOpacity:1,strokeLinecap:"round",strokeWidth:2,strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"inherit"},delete:{display:"none"}};