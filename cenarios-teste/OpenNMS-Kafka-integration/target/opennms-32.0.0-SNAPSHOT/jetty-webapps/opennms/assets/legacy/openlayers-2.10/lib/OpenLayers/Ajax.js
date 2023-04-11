OpenLayers.ProxyHost="",OpenLayers.nullHandler=function(e){OpenLayers.Console.userError(OpenLayers.i18n("unhandledRequest",{statusText:e.statusText}))},OpenLayers.loadURL=function(e,t,s,n,r){"string"==typeof t&&(t=OpenLayers.Util.getParameters(t));var o=n||OpenLayers.nullHandler,a=r||OpenLayers.nullHandler;return OpenLayers.Request.GET({url:e,params:t,success:o,failure:a,scope:s})},OpenLayers.parseXMLString=function(e){var t=e.indexOf("<");return t>0&&(e=e.substring(t)),OpenLayers.Util.Try((function(){var t=new ActiveXObject("Microsoft.XMLDOM");return t.loadXML(e),t}),(function(){return(new DOMParser).parseFromString(e,"text/xml")}),(function(){var t=new XMLHttpRequest;return t.open("GET","data:text/xml;charset=utf-8,"+encodeURIComponent(e),!1),t.overrideMimeType&&t.overrideMimeType("text/xml"),t.send(null),t.responseXML}))},OpenLayers.Ajax={emptyFunction:function(){},getTransport:function(){return OpenLayers.Util.Try((function(){return new XMLHttpRequest}),(function(){return new ActiveXObject("Msxml2.XMLHTTP")}),(function(){return new ActiveXObject("Microsoft.XMLHTTP")}))||!1},activeRequestCount:0},OpenLayers.Ajax.Responders={responders:[],register:function(e){for(var t=0;t<this.responders.length;t++)if(e==this.responders[t])return;this.responders.push(e)},unregister:function(e){OpenLayers.Util.removeItem(this.reponders,e)},dispatch:function(e,t,s){for(var n,r=0;r<this.responders.length;r++)if((n=this.responders[r])[e]&&"function"==typeof n[e])try{n[e].apply(n,[t,s])}catch(e){}}},OpenLayers.Ajax.Responders.register({onCreate:function(){OpenLayers.Ajax.activeRequestCount++},onComplete:function(){OpenLayers.Ajax.activeRequestCount--}}),OpenLayers.Ajax.Base=OpenLayers.Class({initialize:function(e){this.options={method:"post",asynchronous:!0,contentType:"application/xml",parameters:""},OpenLayers.Util.extend(this.options,e||{}),this.options.method=this.options.method.toLowerCase(),"string"==typeof this.options.parameters&&(this.options.parameters=OpenLayers.Util.getParameters(this.options.parameters))}}),OpenLayers.Ajax.Request=OpenLayers.Class(OpenLayers.Ajax.Base,{_complete:!1,initialize:function(e,t){OpenLayers.Ajax.Base.prototype.initialize.apply(this,[t]),OpenLayers.ProxyHost&&OpenLayers.String.startsWith(e,"http")&&(e=OpenLayers.ProxyHost+encodeURIComponent(e)),this.transport=OpenLayers.Ajax.getTransport(),this.request(e)},request:function(e){this.url=e,this.method=this.options.method;var t=OpenLayers.Util.extend({},this.options.parameters);"get"!=this.method&&"post"!=this.method&&(t._method=this.method,this.method="post"),this.parameters=t,(t=OpenLayers.Util.getParameterString(t))&&("get"==this.method?this.url+=(this.url.indexOf("?")>-1?"&":"?")+t:/Konqueror|Safari|KHTML/.test(navigator.userAgent)&&(t+="&_="));try{var s=new OpenLayers.Ajax.Response(this);this.options.onCreate&&this.options.onCreate(s),OpenLayers.Ajax.Responders.dispatch("onCreate",this,s),this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous),this.options.asynchronous&&window.setTimeout(OpenLayers.Function.bind(this.respondToReadyState,this,1),10),this.transport.onreadystatechange=OpenLayers.Function.bind(this.onStateChange,this),this.setRequestHeaders(),this.body="post"==this.method?this.options.postBody||t:null,this.transport.send(this.body),!this.options.asynchronous&&this.transport.overrideMimeType&&this.onStateChange()}catch(e){this.dispatchException(e)}},onStateChange:function(){var e=this.transport.readyState;e>1&&(4!=e||!this._complete)&&this.respondToReadyState(this.transport.readyState)},setRequestHeaders:function(){var e={"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*",OpenLayers:!0};if("post"==this.method&&(e["Content-type"]=this.options.contentType+(this.options.encoding?"; charset="+this.options.encoding:""),this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005&&(e.Connection="close")),"object"==typeof this.options.requestHeaders){var t=this.options.requestHeaders;if("function"==typeof t.push)for(var s=0,n=t.length;s<n;s+=2)e[t[s]]=t[s+1];else for(var s in t)e[s]=t[s]}for(var r in e)this.transport.setRequestHeader(r,e[r])},success:function(){var e=this.getStatus();return!e||e>=200&&e<300},getStatus:function(){try{return this.transport.status||0}catch(e){return 0}},respondToReadyState:function(e){var t=OpenLayers.Ajax.Request.Events[e],s=new OpenLayers.Ajax.Response(this);if("Complete"==t){try{this._complete=!0,(this.options["on"+s.status]||this.options["on"+(this.success()?"Success":"Failure")]||OpenLayers.Ajax.emptyFunction)(s)}catch(e){this.dispatchException(e)}s.getHeader("Content-type")}try{(this.options["on"+t]||OpenLayers.Ajax.emptyFunction)(s),OpenLayers.Ajax.Responders.dispatch("on"+t,this,s)}catch(e){this.dispatchException(e)}"Complete"==t&&(this.transport.onreadystatechange=OpenLayers.Ajax.emptyFunction)},getHeader:function(e){try{return this.transport.getResponseHeader(e)}catch(e){return null}},dispatchException:function(e){var t=this.options.onException;if(t)t(this,e),OpenLayers.Ajax.Responders.dispatch("onException",this,e);else{for(var s=!1,n=OpenLayers.Ajax.Responders.responders,r=0;r<n.length;r++)if(n[r].onException){s=!0;break}if(!s)throw e;OpenLayers.Ajax.Responders.dispatch("onException",this,e)}}}),OpenLayers.Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"],OpenLayers.Ajax.Response=OpenLayers.Class({status:0,statusText:"",initialize:function(e){this.request=e;var t=this.transport=e.transport,s=this.readyState=t.readyState;if((s>2&&(!window.attachEvent||window.opera)||4==s)&&(this.status=this.getStatus(),this.statusText=this.getStatusText(),this.responseText=null==t.responseText?"":String(t.responseText)),4==s){var n=t.responseXML;this.responseXML=void 0===n?null:n}},getStatus:OpenLayers.Ajax.Request.prototype.getStatus,getStatusText:function(){try{return this.transport.statusText||""}catch(e){return""}},getHeader:OpenLayers.Ajax.Request.prototype.getHeader,getResponseHeader:function(e){return this.transport.getResponseHeader(e)}}),OpenLayers.Ajax.getElementsByTagNameNS=function(e,t,s,n){return e.getElementsByTagNameNS?e.getElementsByTagNameNS(t,n):e.getElementsByTagName(s+":"+n)},OpenLayers.Ajax.serializeXMLToString=function(e){return(new XMLSerializer).serializeToString(e)};