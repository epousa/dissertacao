OpenLayers.Format.WFST=function(e){e=OpenLayers.Util.applyDefaults(e,OpenLayers.Format.WFST.DEFAULTS);var r=OpenLayers.Format.WFST["v"+e.version.replace(/\./g,"_")];if(!r)throw"Unsupported WFST version: "+e.version;return new r(e)},OpenLayers.Format.WFST.DEFAULTS={version:"1.0.0"};