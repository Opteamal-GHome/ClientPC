function dispReponseAjtRegle(jsonMess) {
	
	var $panneau = $('#panneau_reponse');
	
	if (jsonMess.status == "REFUSED") {
		$panneau.text("Votre r�gle est refus�e \n Raison : " + jsonMess.error);
		$panneau.fadeIn(800).delay(2000).fadeOut(1000);
	} else if (jsonMess.status == "ACCEPTED") {
		$panneau.text("Votre r�gle est accept�e");
		$panneau.fadeIn(800).delay(2000).fadeOut(1000);
	}
}

function makeDraggable($liste_initiale, $zone_selection, $box) {
	
	// let the gallery items be draggable
	$( "li", $liste_initiale ).draggable({
		revert: "invalid", // when not dropped, the item will revert back to its initial position
		containment: $box, // stick to demo-frame if present
		helper: "clone",
		cursor: "move"
	});

	// let the trash be droppable, accepting the gallery items
	$zone_selection.droppable({
		accept: $("li", $liste_initiale),
		activeClass: "ui-state-highlight",
		drop: function( event, ui ) {
			deleteImage( ui.draggable );
		}
	});
	// let the gallery be droppable as well, accepting items from the trash
	$liste_initiale.droppable({
		accept: "." + $zone_selection.attr("class").split(" ", 1) + " li",
		activeClass: "custom-state-active",
		drop: function( event, ui ) {
			recycleImage( ui.draggable );
		}
	});

	// image deletion function
	function deleteImage( $item ) {
		$item.fadeOut(function() {
			var $list = $( "ul", $zone_selection );
			
			if ( $list.children().length > 0) {
				var $element = $( "li", $list );
				$element.appendTo( $liste_initiale );
			}
			
			$item.appendTo( $list ).fadeIn(function() {
			});
		});
	}
	
	// image recycle function
	function recycleImage( $item ) {
		$item.fadeOut(function() {
		
			$item.appendTo( $liste_initiale ).fadeIn(function() {
			});
		});
	}
}
function yourfunction() { alert('test'); }

function rendConditionDraggable($condition) {
	
	makeDraggable($('.liste_capteurs', $condition), $('.sel_capteur', $condition), $condition);
	makeDraggable($('.liste_operation', $condition), $('.sel_operateur', $condition), $condition);
}

$(function() {
	
	// On rend draggable les �l�ments dans les bo�tes condition
	rendConditionDraggable('#ens_condition div.box_condition');
	
	makeDraggable($('.liste_actionneurs', $('.box_action')), $('.sel_actionneur', $('.box_action')), $('.box_action'));

	$( "#slider" ).slider({
			value:0,
			min: 0,
			max: 10,
			step: 10,
			slide: function( event, ui ) {
				if ( ui.value > 0 ) {
					$('.img_action').css("background-position", "-42px -80px");
				} else {
					$('.img_action').css("background-position", "-42px -18px");					
				}
			}
		});
		
	$('.img_action').hover(function(){
		$( "#slider" ).css("opacity", 0.8);
	}, function() {
		$( "#slider" ).css("opacity", 0.0);
	});
	
	$('#btn_valider').click(function() {
		
		var nom = $('#name_rule').val();
		var capteur = $('#ens_condition div.sel_capteur li.periph').attr("id");
		var operateur = $('#ens_condition div.sel_operateur li.operateur').attr("title");
		var valeur = $('#valeur_condition').val();
		var actionneur = $('#ens_condition div.sel_actionneur li.periph').attr("id");
		var activation = ($('#ens_condition #slider a').css("left") == "0%") ? 0 : 1;


		if (typeof(nom) == 'undefined') {nom="";}
		if (typeof(capteur) == 'undefined') {capteur="";}
		if (typeof(operateur) == 'undefined') {operateur="";}
		if (typeof(valeur) == 'undefined') {valeur="";}
		if (typeof(actionneur) == 'undefined') {actionneur="";}

		var data =  {"msgType": "newRule", 
					 "rule": {"ruleName":nom, 
							  "conditions": [{"type":operateur, 
											  "leftOp":capteur,
											  "rightOp":valeur}],
							  "actions": [{"actuator":actionneur,
							  "value": activation}]
							  }
					};

		sendJson(data);
	});
	
	//window.setInterval(yourfunction, 5000);
	$('#name_rule').focus(function() {
		$(this).val("");
	}).focusout(function() {
		if ($(this).val() == "") {
			$(this).val("Nom Regle");
		}
	});
	
	$('.btn_ajout_cond').click(function() {
		
		$('#ens_condition').height($('#ens_condition').height() + 325);
		$('.fleche_condition').height($('#ens_condition').height());
		$('#col_conditions div.box_condition:last').clone().appendTo('#col_conditions');
		
		// Il faut recreer les draggable dans le panneau ajouté
		
		// Ensuite on unbind le bouton valider + on le remet en prenant en compte la condition supplémentaire
		
	});
	
	
});
