L.MarkerClusterGroup.include({refreshClusters:function(e){return e?e instanceof L.MarkerClusterGroup?e=e._topClusterLevel.getAllChildMarkers():e instanceof L.LayerGroup?e=e._layers:e instanceof L.MarkerCluster?e=e.getAllChildMarkers():e instanceof L.Marker&&(e=[e]):e=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(e),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(e),this},_flagParentsIconsNeedUpdate:function(e){var r,s;for(r in e)for(s=e[r].__parent;s;)s._iconNeedsUpdate=!0,s=s.__parent},_refreshSingleMarkerModeMarkers:function(e){var r,s;for(r in e)s=e[r],this.hasLayer(s)&&s.setIcon(this._overrideMarkerIcon(s))}}),L.Marker.include({refreshIconOptions:function(e,r){var s=this.options.icon;return L.setOptions(s,e),this.setIcon(s),r&&this.__parent&&this.__parent._group.refreshClusters(this),this}});