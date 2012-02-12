function miseAJourCapteur(jsonMess) {

	var capteur = $('#' + jsonMess.id);
	$("div.val_capteur", capteur).text(jsonMess.data);
}

$(function() {
	
	$('input.nom_capteur').focus(function() {
		$(this).select();
	});
	
	$('input.nom_capteur').focusout(function() {
		
		var data =  {"msgType": "rename_device", 
					 "id": $(this).parent().attr("id"),
					 "name": $(this).val()
					};

		sendJson(data);
	});
	
	$('#Meteo').parent().click(function() {
	    $('#panneau_cp').fadeIn(1000);
	});
	
	$('#panneau_cp #cp_valider').click(function() {
	
	    var data = {"msgType":"meteo", 
					"codePostal": $('#panneau_cp input').val()
				   };
	    sendJson(data);
	    $('#panneau_cp').fadeOut(1000);
	});
	
	$('#cp_annuler').click(function() {
	    $('#panneau_cp').fadeOut(1000);
	});
	
});
