L.Projection={},L.Projection.LonLat={project:function(n){return new L.Point(n.lng,n.lat)},unproject:function(n){return new L.LatLng(n.y,n.x)},bounds:L.bounds([-180,-90],[180,90])};