/**
 * Gère la partie réseau (connexions) du client.
 */

  
var wsuri = "ws://" + $('#urlServer').text().split(":")[0] + ":9000";
var webSocket;

$(function() {

	if ("WebSocket" in window) {
		webSocket = new WebSocket(wsuri);
	}
	else {
	// Firefox currently prefixes the WebSocket object
		webSocket = new MozWebSocket(wsuri);
	}

	webSocket.onmessage = function(e) {
		console.log("Got echo: " + e.data);
		console.log("msg type : " + e.data.msgType);
		console.log("id : " + e.data.status);
		console.log("value : " + e.data.error);
	}
});			 

function sendNewRule(message) {
	webSocket.send(JSON.stringify(message));
};
  
  
