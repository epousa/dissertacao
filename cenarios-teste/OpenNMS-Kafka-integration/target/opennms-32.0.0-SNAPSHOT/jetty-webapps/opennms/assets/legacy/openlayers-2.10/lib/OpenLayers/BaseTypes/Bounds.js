OpenLayers.Bounds=OpenLayers.Class({left:null,bottom:null,right:null,top:null,centerLonLat:null,initialize:function(t,n,o,e){null!=t&&(this.left=OpenLayers.Util.toFloat(t)),null!=n&&(this.bottom=OpenLayers.Util.toFloat(n)),null!=o&&(this.right=OpenLayers.Util.toFloat(o)),null!=e&&(this.top=OpenLayers.Util.toFloat(e))},clone:function(){return new OpenLayers.Bounds(this.left,this.bottom,this.right,this.top)},equals:function(t){var n=!1;return null!=t&&(n=this.left==t.left&&this.right==t.right&&this.top==t.top&&this.bottom==t.bottom),n},toString:function(){return"left-bottom=("+this.left+","+this.bottom+") right-top=("+this.right+","+this.top+")"},toArray:function(t){return!0===t?[this.bottom,this.left,this.top,this.right]:[this.left,this.bottom,this.right,this.top]},toBBOX:function(t,n){null==t&&(t=6);var o=Math.pow(10,t),e=Math.round(this.left*o)/o,i=Math.round(this.bottom*o)/o,r=Math.round(this.right*o)/o,s=Math.round(this.top*o)/o;return!0===n?i+","+e+","+s+","+r:e+","+i+","+r+","+s},toGeometry:function(){return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left,this.bottom),new OpenLayers.Geometry.Point(this.right,this.bottom),new OpenLayers.Geometry.Point(this.right,this.top),new OpenLayers.Geometry.Point(this.left,this.top)])])},getWidth:function(){return this.right-this.left},getHeight:function(){return this.top-this.bottom},getSize:function(){return new OpenLayers.Size(this.getWidth(),this.getHeight())},getCenterPixel:function(){return new OpenLayers.Pixel((this.left+this.right)/2,(this.bottom+this.top)/2)},getCenterLonLat:function(){return this.centerLonLat||(this.centerLonLat=new OpenLayers.LonLat((this.left+this.right)/2,(this.bottom+this.top)/2)),this.centerLonLat},scale:function(t,n){var o,e;null==n&&(n=this.getCenterLonLat()),"OpenLayers.LonLat"==n.CLASS_NAME?(o=n.lon,e=n.lat):(o=n.x,e=n.y);var i=(this.left-o)*t+o,r=(this.bottom-e)*t+e,s=(this.right-o)*t+o,h=(this.top-e)*t+e;return new OpenLayers.Bounds(i,r,s,h)},add:function(t,n){if(null==t||null==n){var o=OpenLayers.i18n("boundsAddError");return OpenLayers.Console.error(o),null}return new OpenLayers.Bounds(this.left+t,this.bottom+n,this.right+t,this.top+n)},extend:function(t){var n=null;if(t){switch(t.CLASS_NAME){case"OpenLayers.LonLat":n=new OpenLayers.Bounds(t.lon,t.lat,t.lon,t.lat);break;case"OpenLayers.Geometry.Point":n=new OpenLayers.Bounds(t.x,t.y,t.x,t.y);break;case"OpenLayers.Bounds":n=t}n&&(this.centerLonLat=null,(null==this.left||n.left<this.left)&&(this.left=n.left),(null==this.bottom||n.bottom<this.bottom)&&(this.bottom=n.bottom),(null==this.right||n.right>this.right)&&(this.right=n.right),(null==this.top||n.top>this.top)&&(this.top=n.top))}},containsLonLat:function(t,n){return this.contains(t.lon,t.lat,n)},containsPixel:function(t,n){return this.contains(t.x,t.y,n)},contains:function(t,n,o){if(null==o&&(o=!0),null==t||null==n)return!1;t=OpenLayers.Util.toFloat(t),n=OpenLayers.Util.toFloat(n);return o?t>=this.left&&t<=this.right&&n>=this.bottom&&n<=this.top:t>this.left&&t<this.right&&n>this.bottom&&n<this.top},intersectsBounds:function(t,n){null==n&&(n=!0);var o=!1,e=this.left==t.right||this.right==t.left||this.top==t.bottom||this.bottom==t.top;if(n||!e){var i=t.bottom>=this.bottom&&t.bottom<=this.top||this.bottom>=t.bottom&&this.bottom<=t.top,r=t.top>=this.bottom&&t.top<=this.top||this.top>t.bottom&&this.top<t.top,s=t.left>=this.left&&t.left<=this.right||this.left>=t.left&&this.left<=t.right,h=t.right>=this.left&&t.right<=this.right||this.right>=t.left&&this.right<=t.right;o=(i||r)&&(s||h)}return o},containsBounds:function(t,n,o){null==n&&(n=!1),null==o&&(o=!0);var e=this.contains(t.left,t.bottom,o),i=this.contains(t.right,t.bottom,o),r=this.contains(t.left,t.top,o),s=this.contains(t.right,t.top,o);return n?e||i||r||s:e&&i&&r&&s},determineQuadrant:function(t){var n="",o=this.getCenterLonLat();return n+=t.lat<o.lat?"b":"t",n+=t.lon<o.lon?"l":"r"},transform:function(t,n){this.centerLonLat=null;var o=OpenLayers.Projection.transform({x:this.left,y:this.bottom},t,n),e=OpenLayers.Projection.transform({x:this.right,y:this.bottom},t,n),i=OpenLayers.Projection.transform({x:this.left,y:this.top},t,n),r=OpenLayers.Projection.transform({x:this.right,y:this.top},t,n);return this.left=Math.min(o.x,i.x),this.bottom=Math.min(o.y,e.y),this.right=Math.max(e.x,r.x),this.top=Math.max(i.y,r.y),this},wrapDateLine:function(t,n){var o=(n=n||{}).leftTolerance||0,e=n.rightTolerance||0,i=this.clone();if(t){for(;i.left<t.left&&i.right-e<=t.left;)i=i.add(t.getWidth(),0);for(;i.left+o>=t.right&&i.right>t.right;)i=i.add(-t.getWidth(),0)}return i},CLASS_NAME:"OpenLayers.Bounds"}),OpenLayers.Bounds.fromString=function(t){var n=t.split(",");return OpenLayers.Bounds.fromArray(n)},OpenLayers.Bounds.fromArray=function(t){return new OpenLayers.Bounds(parseFloat(t[0]),parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3]))},OpenLayers.Bounds.fromSize=function(t){return new OpenLayers.Bounds(0,t.h,t.w,0)},OpenLayers.Bounds.oppositeQuadrant=function(t){var n="";return n+="t"==t.charAt(0)?"b":"t",n+="l"==t.charAt(1)?"r":"l"};