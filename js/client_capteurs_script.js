function miseAJourCapteur(jsonMess) {

	var capteur = $('#' + jsonMess.id);
	$("div.val_capteur", capteur).text(jsonMess.data);
}

function yourfunction() {  }


$(function() {
	
	// On active le rafraichissement des valeurs des capteurs toutes les 10 secondes
	// window.setInterval(yourfunction, 10000);
	
	$('input.nom_capteur').focus(function() {
		$(this).select();
	});
	
	$('.capteur').click(function() {
	$('#panneau_reponse').text("Votre r�gle est refus�e \n Raison : ");
			$('#panneau_reponse').fadeIn(800).delay(2000).fadeOut(1000);

	});
});