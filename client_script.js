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


$(function() {
	
	// On rend draggable les �l�ments dans les bo�tes condition
	$('#ens_condition').each(function(i) {
		console.log("dragaglisation");
		makeDraggable($('.liste_capteurs', $(this)), $('.sel_capteur', $(this)), $('.box_condition', $(this)));
		makeDraggable($('.liste_operation', $(this)), $('.sel_operateur', $(this)), $('.box_condition', $(this)));
		makeDraggable($('.liste_actionneurs', $(this)), $('.sel_actionneur', $(this)), $('.box_action', $(this)));
	});
	
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
	
	/*
	{
		"rule": {"ruleName": "nomRegle", "conditions": [ { "type": "inf", "leftOp": "1", "rightOp": "@10" },
														 { "type": "sup_date", "date": "08: 00" } ],
										 "actions": [ { "actuator": "20", "value": "21" },
													  { "actuator": "14", "value": "27" } ] }
	}
	*/
	
	$('#btn_valider').click(function() {
		
		var capteur = $('#ens_condition div.sel_capteur li.capteur').attr("id");
		var operateur = $('#ens_condition div.sel_operateur li.operateur').attr("title");
		var valeur = $('#valeur_condition').val();
		var actionneur = $('#ens_condition div.sel_actionneur li.capteur').attr("id");
		
	
		$.ajax({
			type: 'POST',
			url: "",
			data: '{"rule": {"ruleName": "", "conditions": [{"type": "' + operateur + '", "leftOp": ' + capteur + ', "rightOp": ' + valeur + '}], \
											 "actions": [{"actuator": ' + actionneur + ', "value": 0}]}}',
			dataType: "json"
		});
	});
	
});