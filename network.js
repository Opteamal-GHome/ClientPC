/**
 * Gère la partie réseau (connexions) du client.
 */

  this.connected = false;
  
var wsuri = "ws://localhost:9000";
var webSocket;

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
         
  
  this.sendNewRule = function(message) {
		webSocket.send(JSON.stringify(message));
  };
  
  
