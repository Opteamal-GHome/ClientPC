// Ceci n'est pas une bonne solution
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
	$box = $('#box_periph');
	makeDraggable($('#box_periph ul'), $('#box_groupe ul'), undefined);
});