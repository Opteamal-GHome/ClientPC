$(function() {

	$('img.btn_close_regle').click(function() {
		console.log("trololo");
			
			var nomRegle = $(this).parent().text();
			console.log("nom = " + nomRegle);
			
			var data =  {"msgType": "rule_removed", 
						 "rule":nomRegle
						};
		
			sendJson(data);
	});
	
	// On rend les r�gles classables
	$( "#liste_regles" ).sortable();
	$( "#liste_regles" ).disableSelection();
});
		