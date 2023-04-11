L.GeoJSON=L.FeatureGroup.extend({initialize:function(e,t){L.setOptions(this,t),this._layers={},e&&this.addData(e)},addData:function(e){var t,o,r,n=L.Util.isArray(e)?e:e.features;if(n){for(t=0,o=n.length;t<o;t++)((r=n[t]).geometries||r.geometry||r.features||r.coordinates)&&this.addData(r);return this}var i=this.options;if(i.filter&&!i.filter(e))return this;var a=L.GeoJSON.geometryToLayer(e,i);return a?(a.feature=L.GeoJSON.asFeature(e),a.defaultOptions=a.options,this.resetStyle(a),i.onEachFeature&&i.onEachFeature(e,a),this.addLayer(a)):this},resetStyle:function(e){return e.options=L.Util.extend({},e.defaultOptions),this._setLayerStyle(e,this.options.style),this},setStyle:function(e){return this.eachLayer((function(t){this._setLayerStyle(t,e)}),this)},_setLayerStyle:function(e,t){"function"==typeof t&&(t=t(e.feature)),e.setStyle&&e.setStyle(t)}}),L.extend(L.GeoJSON,{geometryToLayer:function(e,t){var o,r,n,i,a="Feature"===e.type?e.geometry:e,s=a?a.coordinates:null,u=[],l=t&&t.pointToLayer,y=t&&t.coordsToLatLng||this.coordsToLatLng;if(!s&&!a)return null;switch(a.type){case"Point":return o=y(s),l?l(e,o):new L.Marker(o);case"MultiPoint":for(n=0,i=s.length;n<i;n++)o=y(s[n]),u.push(l?l(e,o):new L.Marker(o));return new L.FeatureGroup(u);case"LineString":case"MultiLineString":return r=this.coordsToLatLngs(s,"LineString"===a.type?0:1,y),new L.Polyline(r,t);case"Polygon":case"MultiPolygon":return r=this.coordsToLatLngs(s,"Polygon"===a.type?1:2,y),new L.Polygon(r,t);case"GeometryCollection":for(n=0,i=a.geometries.length;n<i;n++){var g=this.geometryToLayer({geometry:a.geometries[n],type:"Feature",properties:e.properties},t);g&&u.push(g)}return new L.FeatureGroup(u);default:throw new Error("Invalid GeoJSON object.")}},coordsToLatLng:function(e){return new L.LatLng(e[1],e[0],e[2])},coordsToLatLngs:function(e,t,o){for(var r,n=[],i=0,a=e.length;i<a;i++)r=t?this.coordsToLatLngs(e[i],t-1,o):(o||this.coordsToLatLng)(e[i]),n.push(r);return n},latLngToCoords:function(e){return void 0!==e.alt?[e.lng,e.lat,e.alt]:[e.lng,e.lat]},latLngsToCoords:function(e,t,o){for(var r=[],n=0,i=e.length;n<i;n++)r.push(t?L.GeoJSON.latLngsToCoords(e[n],t-1,o):L.GeoJSON.latLngToCoords(e[n]));return!t&&o&&r.push(r[0]),r},getFeature:function(e,t){return e.feature?L.extend({},e.feature,{geometry:t}):L.GeoJSON.asFeature(t)},asFeature:function(e){return"Feature"===e.type||"FeatureCollection"===e.type?e:{type:"Feature",properties:{},geometry:e}}});var PointToGeoJSON={toGeoJSON:function(){return L.GeoJSON.getFeature(this,{type:"Point",coordinates:L.GeoJSON.latLngToCoords(this.getLatLng())})}};L.Marker.include(PointToGeoJSON),L.Circle.include(PointToGeoJSON),L.CircleMarker.include(PointToGeoJSON),L.Polyline.prototype.toGeoJSON=function(){var e=!L.Polyline._flat(this._latlngs),t=L.GeoJSON.latLngsToCoords(this._latlngs,e?1:0);return L.GeoJSON.getFeature(this,{type:(e?"Multi":"")+"LineString",coordinates:t})},L.Polygon.prototype.toGeoJSON=function(){var e=!L.Polyline._flat(this._latlngs),t=e&&!L.Polyline._flat(this._latlngs[0]),o=L.GeoJSON.latLngsToCoords(this._latlngs,t?2:e?1:0,!0);return e||(o=[o]),L.GeoJSON.getFeature(this,{type:(t?"Multi":"")+"Polygon",coordinates:o})},L.LayerGroup.include({toMultiPoint:function(){var e=[];return this.eachLayer((function(t){e.push(t.toGeoJSON().geometry.coordinates)})),L.GeoJSON.getFeature(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===e)return this.toMultiPoint();var t="GeometryCollection"===e,o=[];return this.eachLayer((function(e){if(e.toGeoJSON){var r=e.toGeoJSON();o.push(t?r.geometry:L.GeoJSON.asFeature(r))}})),t?L.GeoJSON.getFeature(this,{geometries:o,type:"GeometryCollection"}):{type:"FeatureCollection",features:o}}}),L.geoJSON=function(e,t){return new L.GeoJSON(e,t)},L.geoJson=L.geoJSON;