/**
 * Gère la partie réseau (connexions) du client.
 */

  
var wsuri = "ws://localhost:9000";
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
		alert("Got echo: " + e.data);
	}
});			 

function sendNewRule(message) {
	webSocket.send(JSON.stringify(message));
};
  
  
