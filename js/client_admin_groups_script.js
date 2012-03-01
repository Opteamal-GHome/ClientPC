function makeDraggable($liste_initiale, $zone_selection) {
	
	$( "li", $liste_initiale ).draggable({
		revert: "invalid", // when not dropped, the item will revert back to its initial position
		helper: "clone",
		cursor: "move"
	});

	$zone_selection.droppable({
		accept: $("li", $liste_initiale),
		activeClass: "ui-state-highlight",
		drop: function( event, ui ) {
			deleteImage( ui.draggable );
		}
	});
	$liste_initiale.droppable({
		accept: "." + $zone_selection.attr("class").split(" ", 1) + " li",
		activeClass: "custom-state-active",
		drop: function( event, ui ) {
			recycleImage( ui.draggable );
			
			if ( $( "ul", $zone_selection ).children().length == 2 ) {
				$zone_selection.droppable("option", "accept", 'li');
			}
		}
	});

	function deleteImage( $item ) {
		$item.fadeOut(function() {
			var $list = $( "ul", $zone_selection );
			
			if ( $list.children().length > 0) {
				var $element = $( "li", $list );
				$item.appendTo( $list ).fadeIn(function() {});
			} else {
				$zone_selection.droppable( "option", "accept", '[alt="' + $item.attr("alt") + '"]' );
				$item.appendTo( $list ).fadeIn(function() {});
			}
			
		});
	}
	
	function recycleImage( $item ) {

		$item.fadeOut(function() {
			$item.appendTo( $liste_initiale ).fadeIn(function() {
			});
		});
	}
}

$(function() {
	makeDraggable($('#box_periph'), $('#box_groupe'));
	
	$('#name_group').focus(function() {
		$(this).val("");
	}).focusout(function() {
		if ($(this).val() == "") {
			$(this).val("Nom Groupe");
		}
	});
	
	$('#btn_valider').click(function() {
	
		var $list_devices = $('#box_groupe ul');
	
		if ( $list_devices.children().length > 0 ) {
		
			var arrayId = new Array();
			$('li', $list_devices).each(function(i) {
				arrayId.push( $(this).attr("id") );
			});
		
			var data =  {"msgType": "new_group", 
						 "name": $('#name_group').val(),
						 "type": $('li:first', $list_devices).attr("alt"),
						 "devices": arrayId
						};

			sendJson(data);
			
			// On ajoute le nouveau groupe dans la liste et on associe la touche de suppression
			$('#liste_groupes').append('<li class="group"><img class="btn_del_grp" src="images/moblin-close2.png"><img src="images/ring-icon.png">' + $('#name_group').val() + '</li>');
			$('#liste_groupes li.group:last img.btn_del_grp').click(function() {
			
				var $group = $(this).parents("li.group");
			
				var data =  {"msgType": "remove_group", 
							 "name": $group.text()
							};
				
				sendJson(data);				
			    $group.remove();
			});
		}
	});
	
	// On associe la touche de suppression pour les groupes déjà présents
	$('#liste_groupes li.group img.btn_del_grp').each(function(i) {
		$(this).click(function() {
			
				var $group = $(this).parents("li.group");
			
				var data =  {"msgType": "remove_group", 
							 "name": $group.text()
							};
				
				sendJson(data);				
			    $group.remove();
			})
		});
});
