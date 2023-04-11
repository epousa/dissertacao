L.Map=L.Evented.extend({options:{crs:L.CRS.EPSG3857,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,i){i=L.setOptions(this,i),this._initContainer(t),this._initLayout(),this._onResize=L.bind(this._onResize,this),this._initEvents(),i.maxBounds&&this.setMaxBounds(i.maxBounds),void 0!==i.zoom&&(this._zoom=this._limitZoom(i.zoom)),i.center&&void 0!==i.zoom&&this.setView(L.latLng(i.center),i.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this.callInitHooks(),this._zoomAnimated=L.DomUtil.TRANSITION&&L.Browser.any3d&&!L.Browser.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),L.DomEvent.on(this._proxy,L.DomUtil.TRANSITION_END,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,i,n){if((i=void 0===i?this._zoom:this._limitZoom(i),t=this._limitCenter(L.latLng(t),i,this.options.maxBounds),n=n||{},this._stop(),this._loaded&&!n.reset&&!0!==n)&&(void 0!==n.animate&&(n.zoom=L.extend({animate:n.animate},n.zoom),n.pan=L.extend({animate:n.animate,duration:n.duration},n.pan)),this._zoom!==i?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,i,n.zoom):this._tryAnimatedPan(t,n.pan)))return clearTimeout(this._sizeTimer),this;return this._resetView(t,i),this},setZoom:function(t,i){return this._loaded?this.setView(this.getCenter(),t,{zoom:i}):(this._zoom=t,this)},zoomIn:function(t,i){return t=t||(L.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,i)},zoomOut:function(t,i){return t=t||(L.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,i)},setZoomAround:function(t,i,n){var e=this.getZoomScale(i),o=this.getSize().divideBy(2),s=(t instanceof L.Point?t:this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1-1/e),a=this.containerPointToLatLng(o.add(s));return this.setView(a,i,{zoom:n})},_getBoundsCenterZoom:function(t,i){i=i||{},t=t.getBounds?t.getBounds():L.latLngBounds(t);var n=L.point(i.paddingTopLeft||i.padding||[0,0]),e=L.point(i.paddingBottomRight||i.padding||[0,0]),o=this.getBoundsZoom(t,!1,n.add(e));o="number"==typeof i.maxZoom?Math.min(i.maxZoom,o):o;var s=e.subtract(n).divideBy(2),a=this.project(t.getSouthWest(),o),r=this.project(t.getNorthEast(),o);return{center:this.unproject(a.add(r).divideBy(2).add(s),o),zoom:o}},fitBounds:function(t,i){if(!(t=L.latLngBounds(t)).isValid())throw new Error("Bounds are not valid.");var n=this._getBoundsCenterZoom(t,i);return this.setView(n.center,n.zoom,i)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,i){return this.setView(t,this._zoom,{pan:i})},panBy:function(t,i){if(i=i||{},!(t=L.point(t).round()).x&&!t.y)return this.fire("moveend");if(!0!==i.animate&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new L.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),i.noMoveStart||this.fire("movestart"),!1!==i.animate){L.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var n=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,n,i.duration||.25,i.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,i,n){if(!1===(n=n||{}).animate||!L.Browser.any3d)return this.setView(t,i,n);this._stop();var e=this.project(this.getCenter()),o=this.project(t),s=this.getSize(),a=this._zoom;t=L.latLng(t),i=void 0===i?a:i;var r=Math.max(s.x,s.y),h=r*this.getZoomScale(a,i),m=o.distanceTo(e)||1,d=1.42,u=2.0164;function c(t){var i=(h*h-r*r+(t?-1:1)*u*u*m*m)/(2*(t?h:r)*u*m),n=Math.sqrt(i*i+1)-i;return n<1e-9?-18:Math.log(n)}function l(t){return(Math.exp(t)-Math.exp(-t))/2}function _(t){return(Math.exp(t)+Math.exp(-t))/2}var f=c(0);function g(t){return r*(_(f)*(l(i=f+d*t)/_(i))-l(f))/u;var i}var p=Date.now(),v=(c(1)-f)/d,P=n.duration?1e3*n.duration:1e3*v*.8;return this._moveStart(!0),function n(){var s=(Date.now()-p)/P,h=function(t){return 1-Math.pow(1-t,1.5)}(s)*v;s<=1?(this._flyToFrame=L.Util.requestAnimFrame(n,this),this._move(this.unproject(e.add(o.subtract(e).multiplyBy(g(h)/m)),a),this.getScaleZoom(r/function(t){return r*(_(f)/_(f+d*t))}(h),a),{flyTo:!0})):this._move(t,i)._moveEnd(!0)}.call(this),this},flyToBounds:function(t,i){var n=this._getBoundsCenterZoom(t,i);return this.flyTo(n.center,n.zoom,i)},setMaxBounds:function(t){return(t=L.latLngBounds(t)).isValid()?(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this.off("moveend",this._panInsideMaxBounds))},setMinZoom:function(t){return this.options.minZoom=t,this._loaded&&this.getZoom()<this.options.minZoom?this.setZoom(t):this},setMaxZoom:function(t){return this.options.maxZoom=t,this._loaded&&this.getZoom()>this.options.maxZoom?this.setZoom(t):this},panInsideBounds:function(t,i){this._enforcingBounds=!0;var n=this.getCenter(),e=this._limitCenter(n,this._zoom,L.latLngBounds(t));return n.equals(e)||this.panTo(e,i),this._enforcingBounds=!1,this},invalidateSize:function(t){if(!this._loaded)return this;t=L.extend({animate:!1,pan:!0},!0===t?{animate:!0}:t);var i=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var n=this.getSize(),e=i.divideBy(2).round(),o=n.divideBy(2).round(),s=e.subtract(o);return s.x||s.y?(t.animate&&t.pan?this.panBy(s):(t.pan&&this._rawPanBy(s),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(L.bind(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:i,newSize:n})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=L.extend({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var i=L.bind(this._handleGeolocationResponse,this),n=L.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(i,n,t):navigator.geolocation.getCurrentPosition(i,n,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var i=t.code,n=t.message||(1===i?"permission denied":2===i?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:i,message:"Geolocation error: "+n+"."})},_handleGeolocationResponse:function(t){var i=t.coords.latitude,n=t.coords.longitude,e=new L.LatLng(i,n),o=e.toBounds(t.coords.accuracy),s=this._locateOptions;if(s.setView){var a=this.getBoundsZoom(o);this.setView(e,s.maxZoom?Math.min(a,s.maxZoom):a)}var r={latlng:e,bounds:o,timestamp:t.timestamp};for(var h in t.coords)"number"==typeof t.coords[h]&&(r[h]=t.coords[h]);this.fire("locationfound",r)},addHandler:function(t,i){if(!i)return this;var n=this[t]=new i(this);return this._handlers.push(n),this.options[t]&&n.enable(),this},remove:function(){if(this._initEvents(!0),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=void 0,this._containerId=void 0}for(var t in L.DomUtil.remove(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this._loaded&&this.fire("unload"),this._layers)this._layers[t].remove();return this},createPane:function(t,i){var n="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),e=L.DomUtil.create("div",n,i||this._mapPane);return t&&(this._panes[t]=e),e},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),i=this.unproject(t.getBottomLeft()),n=this.unproject(t.getTopRight());return new L.LatLngBounds(i,n)},getMinZoom:function(){return void 0===this.options.minZoom?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return void 0===this.options.maxZoom?void 0===this._layersMaxZoom?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,i,n){t=L.latLngBounds(t),n=L.point(n||[0,0]);var e=this.getZoom()||0,o=this.getMinZoom(),s=this.getMaxZoom(),a=t.getNorthWest(),r=t.getSouthEast(),h=this.getSize().subtract(n),m=this.project(r,e).subtract(this.project(a,e)),d=L.Browser.any3d?this.options.zoomSnap:1,u=Math.min(h.x/m.x,h.y/m.y);return e=this.getScaleZoom(u,e),d&&(e=Math.round(e/(d/100))*(d/100),e=i?Math.ceil(e/d)*d:Math.floor(e/d)*d),Math.max(o,Math.min(s,e))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new L.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,i){var n=this._getTopLeftPoint(t,i);return new L.Bounds(n,n.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(void 0===t?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,i){var n=this.options.crs;return i=void 0===i?this._zoom:i,n.scale(t)/n.scale(i)},getScaleZoom:function(t,i){var n=this.options.crs;i=void 0===i?this._zoom:i;var e=n.zoom(t*n.scale(i));return isNaN(e)?1/0:e},project:function(t,i){return i=void 0===i?this._zoom:i,this.options.crs.latLngToPoint(L.latLng(t),i)},unproject:function(t,i){return i=void 0===i?this._zoom:i,this.options.crs.pointToLatLng(L.point(t),i)},layerPointToLatLng:function(t){var i=L.point(t).add(this.getPixelOrigin());return this.unproject(i)},latLngToLayerPoint:function(t){return this.project(L.latLng(t))._round()._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(L.latLng(t))},distance:function(t,i){return this.options.crs.distance(L.latLng(t),L.latLng(i))},containerPointToLayerPoint:function(t){return L.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return L.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var i=this.containerPointToLayerPoint(L.point(t));return this.layerPointToLatLng(i)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(t)))},mouseEventToContainerPoint:function(t){return L.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var i=this._container=L.DomUtil.get(t);if(!i)throw new Error("Map container not found.");if(i._leaflet_id)throw new Error("Map container is already initialized.");L.DomEvent.addListener(i,"scroll",this._onScroll,this),this._containerId=L.Util.stamp(i)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&L.Browser.any3d,L.DomUtil.addClass(t,"leaflet-container"+(L.Browser.touch?" leaflet-touch":"")+(L.Browser.retina?" leaflet-retina":"")+(L.Browser.ielt9?" leaflet-oldie":"")+(L.Browser.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var i=L.DomUtil.getStyle(t,"position");"absolute"!==i&&"relative"!==i&&"fixed"!==i&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),L.DomUtil.setPosition(this._mapPane,new L.Point(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(L.DomUtil.addClass(t.markerPane,"leaflet-zoom-hide"),L.DomUtil.addClass(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,i){L.DomUtil.setPosition(this._mapPane,new L.Point(0,0));var n=!this._loaded;this._loaded=!0,i=this._limitZoom(i),this.fire("viewprereset");var e=this._zoom!==i;this._moveStart(e)._move(t,i)._moveEnd(e),this.fire("viewreset"),n&&this.fire("load")},_moveStart:function(t){return t&&this.fire("zoomstart"),this.fire("movestart")},_move:function(t,i,n){void 0===i&&(i=this._zoom);var e=this._zoom!==i;return this._zoom=i,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),(e||n&&n.pinch)&&this.fire("zoom",n),this.fire("move",n)},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return L.Util.cancelAnimFrame(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){L.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){if(L.DomEvent){this._targets={},this._targets[L.stamp(this._container)]=this;var i=t?"off":"on";L.DomEvent[i](this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress",this._handleDOMEvent,this),this.options.trackResize&&L.DomEvent[i](window,"resize",this._onResize,this),L.Browser.any3d&&this.options.transform3DLimit&&this[i]("moveend",this._onMoveEnd)}},_onResize:function(){L.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=L.Util.requestAnimFrame((function(){this.invalidateSize({debounceMoveend:!0})}),this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,i){for(var n,e=[],o="mouseout"===i||"mouseover"===i,s=t.target||t.srcElement,a=!1;s;){if((n=this._targets[L.stamp(s)])&&("click"===i||"preclick"===i)&&!t._simulated&&this._draggableMoved(n)){a=!0;break}if(n&&n.listens(i,!0)){if(o&&!L.DomEvent._isExternalTarget(s,t))break;if(e.push(n),o)break}if(s===this._container)break;s=s.parentNode}return e.length||a||o||!L.DomEvent._isExternalTarget(s,t)||(e=[this]),e},_handleDOMEvent:function(t){if(this._loaded&&!L.DomEvent._skipped(t)){var i="keypress"===t.type&&13===t.keyCode?"click":t.type;"mousedown"===i&&L.DomUtil.preventOutline(t.target||t.srcElement),this._fireDOMEvent(t,i)}},_fireDOMEvent:function(t,i,n){if("click"===t.type){var e=L.Util.extend({},t);e.type="preclick",this._fireDOMEvent(e,e.type,n)}if(!t._stopped&&(n=(n||[]).concat(this._findEventTargets(t,i))).length){var o=n[0];"contextmenu"===i&&o.listens(i,!0)&&L.DomEvent.preventDefault(t);var s={originalEvent:t};if("keypress"!==t.type){var a=o instanceof L.Marker;s.containerPoint=a?this.latLngToContainerPoint(o.getLatLng()):this.mouseEventToContainerPoint(t),s.layerPoint=this.containerPointToLayerPoint(s.containerPoint),s.latlng=a?o.getLatLng():this.layerPointToLatLng(s.layerPoint)}for(var r=0;r<n.length;r++)if(n[r].fire(i,s,!0),s.originalEvent._stopped||n[r].options.nonBubblingEvents&&-1!==L.Util.indexOf(n[r].options.nonBubblingEvents,i))return}},_draggableMoved:function(t){return(t=t.dragging&&t.dragging.enabled()?t:this).dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,i=this._handlers.length;t<i;t++)this._handlers[t].disable()},whenReady:function(t,i){return this._loaded?t.call(i||this,{target:this}):this.on("load",t,i),this},_getMapPanePos:function(){return L.DomUtil.getPosition(this._mapPane)||new L.Point(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,i){return(t&&void 0!==i?this._getNewPixelOrigin(t,i):this.getPixelOrigin()).subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,i){var n=this.getSize()._divideBy(2);return this.project(t,i)._subtract(n)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,i,n){var e=this._getNewPixelOrigin(n,i);return this.project(t,i)._subtract(e)},_latLngBoundsToNewLayerBounds:function(t,i,n){var e=this._getNewPixelOrigin(n,i);return L.bounds([this.project(t.getSouthWest(),i)._subtract(e),this.project(t.getNorthWest(),i)._subtract(e),this.project(t.getSouthEast(),i)._subtract(e),this.project(t.getNorthEast(),i)._subtract(e)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,i,n){if(!n)return t;var e=this.project(t,i),o=this.getSize().divideBy(2),s=new L.Bounds(e.subtract(o),e.add(o)),a=this._getBoundsOffset(s,n,i);return a.round().equals([0,0])?t:this.unproject(e.add(a),i)},_limitOffset:function(t,i){if(!i)return t;var n=this.getPixelBounds(),e=new L.Bounds(n.min.add(t),n.max.add(t));return t.add(this._getBoundsOffset(e,i))},_getBoundsOffset:function(t,i,n){var e=L.bounds(this.project(i.getNorthEast(),n),this.project(i.getSouthWest(),n)),o=e.min.subtract(t.min),s=e.max.subtract(t.max),a=this._rebound(o.x,-s.x),r=this._rebound(o.y,-s.y);return new L.Point(a,r)},_rebound:function(t,i){return t+i>0?Math.round(t-i)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(i))},_limitZoom:function(t){var i=this.getMinZoom(),n=this.getMaxZoom(),e=L.Browser.any3d?this.options.zoomSnap:1;return e&&(t=Math.round(t/e)*e),Math.max(i,Math.min(n,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){L.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,i){var n=this._getCenterOffset(t)._floor();return!(!0!==(i&&i.animate)&&!this.getSize().contains(n))&&(this.panBy(n,i),!0)},_createAnimProxy:function(){var t=this._proxy=L.DomUtil.create("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",(function(i){var n=L.DomUtil.TRANSFORM,e=t.style[n];L.DomUtil.setTransform(t,this.project(i.center,i.zoom),this.getZoomScale(i.zoom,1)),e===t.style[n]&&this._animatingZoom&&this._onZoomTransitionEnd()}),this),this.on("load moveend",(function(){var i=this.getCenter(),n=this.getZoom();L.DomUtil.setTransform(t,this.project(i,n),this.getZoomScale(n,1))}),this)},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,i,n){if(this._animatingZoom)return!0;if(n=n||{},!this._zoomAnimated||!1===n.animate||this._nothingToAnimate()||Math.abs(i-this._zoom)>this.options.zoomAnimationThreshold)return!1;var e=this.getZoomScale(i),o=this._getCenterOffset(t)._divideBy(1-1/e);return!(!0!==n.animate&&!this.getSize().contains(o))&&(L.Util.requestAnimFrame((function(){this._moveStart(!0)._animateZoom(t,i,!0)}),this),!0)},_animateZoom:function(t,i,n,e){n&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=i,L.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:i,noUpdate:e}),setTimeout(L.bind(this._onZoomTransitionEnd,this),250)},_onZoomTransitionEnd:function(){this._animatingZoom&&(L.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom),L.Util.requestAnimFrame((function(){this._moveEnd(!0)}),this))}}),L.map=function(t,i){return new L.Map(t,i)};