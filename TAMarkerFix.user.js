// ==UserScript==
// @name            TAMarkerFix.js
// @description     Fix an script error when selecting marker.
// @author          VisiG
// @version         0.1
// @namespace       https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL       https://raw.githubusercontent.com/VisiG/TAMailMessageErrorFix/master/TAMarkerFix.user.js
// @downloadURL     https://raw.githubusercontent.com/VisiG/TAMailMessageErrorFix/master/TAMarkerFix.user.js
// ==/UserScript==

(function () {
    var TAMarkerFix_main = function () {
        function TAMarkerFix_checkIfLoaded() {
        	if (PerforceChangelist >= 443425) { // patch 16.1 
        		try {
					if (typeof qx !== 'undefined' && typeof qx.core !== 'undefined' && typeof qx.core.Init !== 'undefined') {
						try {
							webfrontend.gui.region.RegionInfoAllianceMarker.prototype.onCitiesChange = function () {};
						} catch (e) {
							window.setTimeout(TAMarkerFix_checkIfLoaded, 1000);
						}
					} else {
						window.setTimeout(TAMarkerFix_checkIfLoaded, 1000);
					}
				} catch (e) {
					console.log("TAMarkerFix_checkIfLoaded: ", e);
				}
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(TAMarkerFix_checkIfLoaded, 1000);
		}
    }
    
  try {
    var script = document.createElement("script");
    script.innerHTML = "(" + TAMarkerFix_main.toString() + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
  } catch (e) {
    console.log("AMarkerFix: init error: ", e);
  }
  
})();
