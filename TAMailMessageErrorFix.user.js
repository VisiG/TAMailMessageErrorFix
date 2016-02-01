// ==UserScript==
// @name            TAMailMessageErrorFix.js
// @description     Fix an script error when writing a new message.
// @author          VisiG
// @version         0.1
// @namespace       https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL       https://raw.githubusercontent.com/VisiG/TAMailMessageErrorFix/master/TAMailMessageErrorFix.user.js
// @downloadURL     https://raw.githubusercontent.com/VisiG/TAMailMessageErrorFix/master/TAMailMessageErrorFix.user.js
// ==/UserScript==

(function () {
    var TAMailMessageErrorFix_main = function () {
        function TAMailMessageErrorFix_checkIfLoaded() {
        	if (PerforceChangelist >= 443425) { // patch 16.1 
        		try {
					if (typeof qx !== 'undefined' && typeof qx.core !== 'undefined' && typeof qx.core.Init !== 'undefined') {
						try {
							for (var key in webfrontend.gui.mail.MailMessage.prototype) {
								if (webfrontend.gui.mail.MailMessage.prototype.hasOwnProperty(key) && typeof(webfrontend.gui.mail.MailMessage.prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
									strFunction = webfrontend.gui.mail.MailMessage.prototype[key].toString();
									if (strFunction.indexOf("this.kids") > -1) {
										strFunction = strFunction.replace("this.kids", "dr");
										webfrontend.gui.mail.MailMessage.prototype[key] = eval('(' + strFunction + ')');
										console.log("TAMailMessageErrorFix: Replaced undefined field");
										break;
									}
								}
							}
						} catch (e) {
							window.setTimeout(TAMailMessageErrorFix_checkIfLoaded, 1000);
						}
					} else {
						window.setTimeout(TAMailMessageErrorFix_checkIfLoaded, 1000);
					}
				} catch (e) {
					console.log("TAMailMessageErrorFix_checkIfLoaded: ", e);
				}
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(TAMailMessageErrorFix_checkIfLoaded, 1000);
		}
    }
    
  try {
    var script = document.createElement("script");
    script.innerHTML = "(" + TAMailMessageErrorFix_main.toString() + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
  } catch (e) {
    console.log("TAMailMessageErrorFix: init error: ", e);
  }
  
})();