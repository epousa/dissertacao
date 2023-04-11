OpenLayers.Format.CSWGetDomain.v2_0_2=OpenLayers.Class(OpenLayers.Format.XML,{namespaces:{xlink:"http://www.w3.org/1999/xlink",xsi:"http://www.w3.org/2001/XMLSchema-instance",csw:"http://www.opengis.net/cat/csw/2.0.2"},defaultPrefix:"csw",version:"2.0.2",schemaLocation:"http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd",PropertyName:null,ParameterName:null,initialize:function(e){OpenLayers.Format.XML.prototype.initialize.apply(this,[e])},read:function(e){"string"==typeof e&&(e=OpenLayers.Format.XML.prototype.read.apply(this,[e])),e&&9==e.nodeType&&(e=e.documentElement);var t={};return this.readNode(e,t),t},readers:{csw:{GetDomainResponse:function(e,t){this.readChildNodes(e,t)},DomainValues:function(e,t){t.DomainValues instanceof Array||(t.DomainValues=[]);for(var a=e.attributes,r={},i=0,n=a.length;i<n;++i)r[a[i].name]=a[i].nodeValue;this.readChildNodes(e,r),t.DomainValues.push(r)},PropertyName:function(e,t){t.PropertyName=this.getChildValue(e)},ParameterName:function(e,t){t.ParameterName=this.getChildValue(e)},ListOfValues:function(e,t){t.ListOfValues instanceof Array||(t.ListOfValues=[]),this.readChildNodes(e,t.ListOfValues)},Value:function(e,t){for(var a=e.attributes,r={},i=0,n=a.length;i<n;++i)r[a[i].name]=a[i].nodeValue;r.value=this.getChildValue(e),t.push({Value:r})},ConceptualScheme:function(e,t){t.ConceptualScheme={},this.readChildNodes(e,t.ConceptualScheme)},Name:function(e,t){t.Name=this.getChildValue(e)},Document:function(e,t){t.Document=this.getChildValue(e)},Authority:function(e,t){t.Authority=this.getChildValue(e)},RangeOfValues:function(e,t){t.RangeOfValues={},this.readChildNodes(e,t.RangeOfValues)},MinValue:function(e,t){for(var a=e.attributes,r={},i=0,n=a.length;i<n;++i)r[a[i].name]=a[i].nodeValue;r.value=this.getChildValue(e),t.MinValue=r},MaxValue:function(e,t){for(var a=e.attributes,r={},i=0,n=a.length;i<n;++i)r[a[i].name]=a[i].nodeValue;r.value=this.getChildValue(e),t.MaxValue=r}}},write:function(e){var t=this.writeNode("csw:GetDomain",e);return OpenLayers.Format.XML.prototype.write.apply(this,[t])},writers:{csw:{GetDomain:function(e){var t=this.createElementNSPlus("csw:GetDomain",{attributes:{service:"CSW",version:this.version}});return e.PropertyName||this.PropertyName?this.writeNode("csw:PropertyName",e.PropertyName||this.PropertyName,t):(e.ParameterName||this.ParameterName)&&this.writeNode("csw:ParameterName",e.ParameterName||this.ParameterName,t),this.readChildNodes(t,e),t},PropertyName:function(e){return this.createElementNSPlus("csw:PropertyName",{value:e})},ParameterName:function(e){return this.createElementNSPlus("csw:ParameterName",{value:e})}}},CLASS_NAME:"OpenLayers.Format.CSWGetDomain.v2_0_2"});