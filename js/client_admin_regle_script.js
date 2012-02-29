$(function() {

	$('img.btn_close_regle').click(function() {
			
			var $btn = $(this);
			var nomRegle = $btn.parent().text();
			var $regle = $btn.parents("li.regle_desc");
			console.log("nom = " + nomRegle);
			
			var data =  {"msgType":"rule_removed", 
						 "rule":nomRegle
						};
		
			sendJson(data);
			
			$regle.remove();
	});
	
	// On rend les règles classables
	$( "#liste_regles" ).sortable({
		update: function(event, ui) {
			
			var arrayRules = new Array();
			$('#liste_regles li.regle_desc').each(function(i) {
				arrayRules.push($('div.top_regle', this).text().replace(/\t/g, '').replace(/\n/g, ''));
			});
			
			var data =  {"msgType":"priorities", 
						 "rules":arrayRules
						};

			console.log("to send:"+data.rules);
			sendJson(data);
		}
	});
	$( "#liste_regles" ).disableSelection();
});
		