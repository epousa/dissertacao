OpenLayers.Protocol.SQL=OpenLayers.Class(OpenLayers.Protocol,{databaseName:"ol",tableName:"ol_vector_features",postReadFiltering:!0,initialize:function(e){OpenLayers.Protocol.prototype.initialize.apply(this,[e])},destroy:function(){OpenLayers.Protocol.prototype.destroy.apply(this)},supported:function(){return!1},evaluateFilter:function(e,t){return!t||!this.postReadFiltering||t.evaluate(e)},CLASS_NAME:"OpenLayers.Protocol.SQL"});