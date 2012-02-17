/**
 * Gère la partie réseau (connexions) du client.
 */

  
var wsuri = "ws://localhost:8080"; // + $('#urlServer').text().split(":")[0] + ":9000";
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
		var msgParsed = JSON.parse(e.data);
		console.log("Got parsed: " + msgParsed);
		console.log("msg type : " + msgParsed.msgType);
		if (msgParsed.id) { console.log("id : " + msgParsed.id); }
		if (msgParsed.status) { console.log("status : " + msgParsed.status); }
		if (msgParsed.data) { console.log("value : " + msgParsed.data); }
		if (msgParsed.error) { console.log("error : " + msgParsed.error); }
	}
});			 

function sendNewRule(message) {
	console.log("message = " + message);
	console.log("webSocket = " + webSocket);
	console.log("JSON = " + JSON);
	console.log("JSON = " + JSON.parse(message));
	console.log("JSON = " + JSON.stringify(message);

	webSocket.send(JSON.stringify(message));
};
  
  
