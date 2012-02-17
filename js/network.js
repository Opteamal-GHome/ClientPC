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
		if (e.data.id) { console.log("id : " + e.data.id); }
		if (e.data.id) { console.log("status : " + e.data.status); }
		if (e.data.id) { console.log("value : " + e.data.data); }
		if (e.data.id) { console.log("error : " + e.data.error); }
	}
});			 

function sendNewRule(message) {
	console.log("message = " + message);
	console.log("webSocket = " + webSocket);
	console.log("JSON = " + JSON);
	console.log("JSON = " + JSON.parse());
	console.log("JSON = " + JSON.stringify());

	webSocket.send(JSON.stringify(message));
};
  
  
