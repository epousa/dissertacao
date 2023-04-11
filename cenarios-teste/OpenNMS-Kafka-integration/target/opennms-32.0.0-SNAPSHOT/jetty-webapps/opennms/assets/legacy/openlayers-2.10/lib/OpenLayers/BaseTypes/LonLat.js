OpenLayers.LonLat=OpenLayers.Class({lon:0,lat:0,initialize:function(t,n){this.lon=OpenLayers.Util.toFloat(t),this.lat=OpenLayers.Util.toFloat(n)},toString:function(){return"lon="+this.lon+",lat="+this.lat},toShortString:function(){return this.lon+", "+this.lat},clone:function(){return new OpenLayers.LonLat(this.lon,this.lat)},add:function(t,n){if(null==t||null==n){var o=OpenLayers.i18n("lonlatAddError");return OpenLayers.Console.error(o),null}return new OpenLayers.LonLat(this.lon+OpenLayers.Util.toFloat(t),this.lat+OpenLayers.Util.toFloat(n))},equals:function(t){var n=!1;return null!=t&&(n=this.lon==t.lon&&this.lat==t.lat||isNaN(this.lon)&&isNaN(this.lat)&&isNaN(t.lon)&&isNaN(t.lat)),n},transform:function(t,n){var o=OpenLayers.Projection.transform({x:this.lon,y:this.lat},t,n);return this.lon=o.x,this.lat=o.y,this},wrapDateLine:function(t){var n=this.clone();if(t){for(;n.lon<t.left;)n.lon+=t.getWidth();for(;n.lon>t.right;)n.lon-=t.getWidth()}return n},CLASS_NAME:"OpenLayers.LonLat"}),OpenLayers.LonLat.fromString=function(t){var n=t.split(",");return new OpenLayers.LonLat(n[0],n[1])};