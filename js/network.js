/**
 * Gère la partie réseau (connexions) du client.
 */

  //"ws://localhost:8081"; //
var wsuri;
var webSocket;

$(function() {

	wsuri = "ws://" + $('#urlServer').text().split(":")[0].replace(/^\s+/g,'').replace(/\s+$/g,'') + ":8081";
	if ("WebSocket" in window) {
		webSocket = new WebSocket(wsuri);
	}
	else {
	// Firefox currently prefixes the WebSocket object
		webSocket = new MozWebSocket(wsuri);
	}

	webSocket.onmessage = function(e) {
		var msgParsed = JSON.parse(e.data);
		console.log("Got parsed: " + msgParsed);
		console.log("msg type : " + msgParsed.msgType);
		
		if (msgParsed.msgType == "device_updated") {
			miseAJourCapteur(msgParsed);
		} else if (msgParsed.msgType == "tabStat") {
			miseAJourStat(msgParsed);
		} else if (msgParsed.msgType == "answerRule") {
			dispReponseAjtRegle(msgParsed);
		}
		
	}
});			 

function sendJson(message) {
	webSocket.send(JSON.stringify(message));
};  
  
