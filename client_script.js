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
	
	// On rend draggable les éléments dans les boîtes condition
	$('div.box_condition').each(function(i) {
		console.log("box = " + $(this).html());
		makeDraggable($('.liste_capteurs', $(this)), $('.sel_capteur', $(this)), $(this));
		console.log('klerjgn')
		makeDraggable($('.liste_operation', $(this)), $('.sel_operateur', $(this)), $(this));
	});
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
		
		var capteur = $('#ens_condition div.sel_capteur li.capteur').attr("id");
		var operateur = $('#ens_condition div.sel_operateur li.operateur').attr("title");
		var valeur = $('#valeur_condition').val();
		var actionneur = $('#ens_condition div.sel_actionneur li.capteur').attr("id");

		$.ajax({
			type: 'POST',
			url: "/form",
			data: '{"type": "newRule", "rule": {"ruleName": "", "conditions": [{"type":"' + operateur + '", "leftOp":"' + capteur + '", "rightOp":"' + valeur + '"}], \
											 "actions": [{"actuator": "' + actionneur + '", "value": "0"}]}}',
			dataType: "json"
		});
	});
	
	$('.btn_ajout_cond').click(function() {
		
		 $.getJSON('/capteurs/alldevices', function(data) {
            console.log("recu =" +data); //uncomment this for debug
            //alert (data.item1+" "+data.item2+" "+data.item3); //further debug
            //$('#showdata').html("<p>item1="+data.item1+" item2="+data.item2+" item3="+data.item3+"</p>");
        });
		/*
		$('#ens_condition').height($('#ens_condition').height() + 310);
		$('.fleche_condition').height($('#ens_condition').height());
		$('#ens_condition div.box_condition:last').after('<div class="box_condition"></div>');
		*/
	});
	
});
