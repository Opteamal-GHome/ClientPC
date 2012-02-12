function miseAJourStat(jsonMess) {

	var graphTitle;
	var labelX = "Temps (min)";
	var labelY;
	
	$('#core_statistiques').empty();
	$('#core_statistiques').append('<div id="chartdiv" style="height:450px;width:600px;margin:auto;"></div>');

	
	
	if (jsonMess.typeStat = "T") {
		graphTitle = 'Température';
		labelY = "Température (°C)";
	} else if (jsonMess.typeStat = "P") {
	
	}
	
	var plot2 = $.jqplot ('chartdiv', [jsonMess.data], {
		title: graphTitle,

		axesDefaults: {
			labelRenderer: $.jqplot.CanvasAxisLabelRenderer
		},
		axes: {
			xaxis: {
				label: labelX,
				pad: 0
			},
			yaxis: {
				label: labelY
			}
		}
    });
}

$(function()
{
	var plot2 = $.jqplot ('chartdiv', [[3,7,9,1,4,6,8,2,5]], {
		title: 'Température',
		
		// You can specify options for all axes on the plot at once with
		// the axesDefaults object.  Here, we're using a canvas renderer
		// to draw the axis label which allows rotated text.
		axesDefaults: {
			labelRenderer: $.jqplot.CanvasAxisLabelRenderer
		},
		axes: {
			// options for each axis are specified in seperate option objects.
			xaxis: {
				label: "Temps (min)",
				// Turn off "padding".  This will allow data point to lie on the
				// edges of the grid.  Default padding is 1.2 and will keep all
				// points inside the bounds of the grid.
				pad: 0
			},
			yaxis: {
				label: "Température (°C)"
			}
		}
	});
	
	$('#ui_element').find('ul').css({
        'left'	:	'-660px'
    }).siblings('.mh_right').css({
        'left'	:	'200px'
    });
	
    var $arrow = $('#ui_element').find('.mh_right');
    var $menu  = $('#ui_element').find('ul');
    $arrow.bind('mouseenter',function(){
        var $this 	= $(this);
        $this.stop().animate({'left':'160px'},50);
        $menu.stop().animate({'left':'202px'},500,function(){
            $(this).find('a')
            .unbind('mouseenter,mouseleave')
            .bind('mouseenter',function(){
                $(this).addClass('hover');
            })
            .bind('mouseleave',function(){
                $(this).removeClass('hover');
            });
        });
    });
    $menu.bind('mouseleave',function(){
        var $this 	= $(this);
        $this.stop().animate({'left':'-660px'},500,function(){
            $arrow.stop().animate({'left':'200px'},500);
        });
    });
});
