function misaAJourCapteurs() {

	$.getJSON('/capteurs/alldevices', function(data) {
            console.log("recu =" + data);
    });
}


$(function() {
	
	// On active le rafraichissement des valeurs des capteurs toutes les 10 secondes
	window.setInterval(yourfunction, 10000);
});