OpenLayers.Layer.MultiMap=OpenLayers.Class(OpenLayers.Layer.EventPane,OpenLayers.Layer.FixedZoomLevels,{MIN_ZOOM_LEVEL:1,MAX_ZOOM_LEVEL:17,RESOLUTIONS:[9,1.40625,.703125,.3515625,.17578125,.087890625,.0439453125,.02197265625,.010986328125,.0054931640625,.00274658203125,.001373291015625,.0006866455078125,.00034332275390625,.000171661376953125,858306884765625e-19,4291534423828125e-20],type:null,initialize:function(e,t){OpenLayers.Layer.EventPane.prototype.initialize.apply(this,arguments),OpenLayers.Layer.FixedZoomLevels.prototype.initialize.apply(this,arguments),this.sphericalMercator&&(OpenLayers.Util.extend(this,OpenLayers.Layer.SphericalMercator),this.initMercatorParameters(),this.RESOLUTIONS.unshift(10))},loadMapObject:function(){try{this.mapObject=new MultimapViewer(this.div)}catch(e){}},getWarningHTML:function(){return OpenLayers.i18n("getLayerWarning",{layerType:"MM",layerLib:"MultiMap"})},setMapObjectCenter:function(e,t){this.mapObject.goToPosition(e,t)},getMapObjectCenter:function(){return this.mapObject.getCurrentPosition()},getMapObjectZoom:function(){return this.mapObject.getZoomFactor()},getMapObjectLonLatFromMapObjectPixel:function(e){return e.x=e.x-this.map.getSize().w/2,e.y=e.y-this.map.getSize().h/2,this.mapObject.getMapPositionAt(e)},getMapObjectPixelFromMapObjectLonLat:function(e){return this.mapObject.geoPosToContainerPixels(e)},getLongitudeFromMapObjectLonLat:function(e){return this.sphericalMercator?this.forwardMercator(e.lon,e.lat).lon:e.lon},getLatitudeFromMapObjectLonLat:function(e){return this.sphericalMercator?this.forwardMercator(e.lon,e.lat).lat:e.lat},getMapObjectLonLatFromLonLat:function(e,t){var a;if(this.sphericalMercator){var r=this.inverseMercator(e,t);a=new MMLatLon(r.lat,r.lon)}else a=new MMLatLon(t,e);return a},getXFromMapObjectPixel:function(e){return e.x},getYFromMapObjectPixel:function(e){return e.y},getMapObjectPixelFromXY:function(e,t){return new MMPoint(e,t)},CLASS_NAME:"OpenLayers.Layer.MultiMap"});