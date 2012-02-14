/**
 * Gère la partie réseau (connexions) du client.
 */
function Network (){
  this.connected = false;
  
  var ws;
  
  this.events = {
    onConnect: function(){},
    onDisconnect: function(){},
    onError: function(){},
    onGStat: function(gameStatus){},
    onContact: function(x, y, offset){},
    onSyncJ: function(joueurs){},
    onCollision: function(){}
  };
  
  /**
   * Traite un message en provenance du serveur.
   * @param message Le contenu du message, en JSON.
   * @param events Les évenements à exécuter.
   */
  this.parseMsg = function(message,events){
    var data = JSON.parse(message);
        
    if(data.msg == "GStat")        // Nombre de joueurs et score
    {
      if(PR_DEBUG) console.log("Dans GStat");
      game.setJoueurs(data.players);
    }
    else if(data.msg == "SyncJ"){    // Position des raquettes
      if(PR_DEBUG) console.log("Dans SyncJ ");// + data.raquettes["Thomas"]);
      for (key in data.raquettes){     
        if(PR_DEBUG) console.log(key + " : Raquettes SyncJ : " + data.raquettes[key]);
        game.moveSliderServer(game.tabJoueurs[key].slider, data.raquettes[key])
      }
    }
    else if(data.msg == "Collision")
    {
      if(PR_DEBUG) console.log("Collision : " + data.status);
      game.gestionCollision(data.status);
    }
    else if (data.msg == "Trajectoire")
    {
      game.nouveauPaquetTrajectoire();
      game.calculPositionBalle(data.point[0][0],data.point[0][1],data.point[1]);
    }
    else if (data.msg == "newPseudo")
    {
        game.changePseudo(data.pseudo);
    }
	else if (data.msg == "RoomsStats")
    {
        game.roomsStats(data.rooms);
    }
    else
    {
        //alert("Type : " + data.type);
    	this.not_supported = true;
    }
  };
  
  /**
   * Se connecte au serveur et initialise le Websocket utilisé pour 
   * les échanges avec le serveur.
   */  
  this.connect = function(){
    ws = new WebSocket("ws://localhost:8080/form");
    
    var parseMsg = this.parseMsg;
    var events = this.events;

    ws.onopen = function() {
      this.connected = true;
      game.connect();
      if(PR_DEBUG) console.log("WebSocket connected");
      events.onConnect();
    };
    ws.onclose = function() {
      this.connected = false;
      events.onDisconnect();
    };
    ws.onmessage = function(e) {
      parseMsg(e.data,events);
    };
    ws.onerror = function() {
      events.onError();
    };
  };
  
  this.broadcast = function(msg){
    //console.log(JSON.stringify(msg));
    if (ws.readyState == 1)
        ws.send(JSON.stringify(msg));
    else
        if(PR_DEBUG) console.log(ws.readyState);
  };
  
  
   this.disconnect = function(){
    	this.connected = false;  
  };
  
  this.sendHello = function(nameJ){
  	    var date = new Date();  // On recupere le timestamp
	    var hello = {   "msg":"Hello",
	                    "pseudo":nameJ,
	                    "time":date.getTime()};
	    this.broadcast(hello);
  };
  
  this.sendBouge = function(pos){
        var date = new Date();  // On recupere le timestamp
	    var bouge = {   "msg":"Bouge",
	                    "raquette":pos,
	                    "time":date.getTime()};
	    this.broadcast(bouge);
  };
  
  this.sendNewRule = function(message) {
		this.broadcast(message);
  };
  
  
}