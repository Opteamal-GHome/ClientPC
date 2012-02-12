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
});