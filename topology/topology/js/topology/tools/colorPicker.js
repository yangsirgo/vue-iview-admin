function initBgColorPicker(panelId){

	var allcolors = {
		level1 : [ "#FFFFFF", "#1E2D42" ],
		level1words : [ "默认", "深蓝" ],
		level2 : [ "#FFFFFF", "#000000", "#EEECE1", "#1F497D", "#4F81BD" ],

		level3 : [ "#F2F2F2", "#808080", "#DDD9C3", "#C6D9F1", "#DCE6F2",
				"#D9D9D9", "#595959", "#C4BD97", "#8EB4E3", "#B9CDE5",
				"#BFBFBF", "#404040", "#948A54", "#558ED5", "#95B3D7",
				"#A6A6A6", "#262626", "#4A452A", "#17375E", "#376092",
				"#7F7F7F", "#0D0D0D", "#1E1C11", "#10243F", "#254061" ],

		level4 : [ "#C0504D", "#9BBB59", "#8064A2", "#4BACC6", "#F79646" ],

		level5 : [ "#F2DCDB", "#EBF1DE", "#E6E0EC", "#DBEEF4", "#FDEADA",
				"#E6B9B8", "#D7E4BD", "#CCC1DA", "#B7DEE8", "#FCD5B5",
				"#D99694", "#C3D69B", "#B3A2C7", "#93CDDD", "#FAC090",
				"#953735", "#77933C", "#604A7B", "#31859C", "#E46C0A",
				"#632523", "#4F6228", "#403152", "#215968", "#984807" ],
		level6 : [ "#C00000", "#FF0000", "#FFC000", "#FFFF00", "#92D050",
				"#00B050", "#00B0F0", "#0070C0", "#002060", "#7030A0" ]
	}
    /*
	var strl1 = "<div class=\"two_color_box\">";

	for(var i = 0; i < allcolors.level1.length; i++){
		strl1 +="<div class=\"two_color_box_cell colorclick\" color=\""+allcolors.level1[i]+"\">";
		strl1 +="<div class=\"two_color_box_color\" style=\"background-color:"+allcolors.level1[i]+"\"></div>";
		strl1 +="<div class=\"two_color_box_txt\">"+allcolors.level1words[i]+"</div></div>";
	}

    strl1 += "<div class=\"clear\"></div></div>";
	strl1 += "<div class=\"themetitle\">主题颜色</div>";
	*/
	var strl1 = "<div class=\"themepart\">";

	for(var i = 0; i < allcolors.level2.length; i++){
	      strl1 +="<div class=\"five_color_box_color_head colorclick\" style=\"background-color:"+allcolors.level2[i]+"\" color=\""+allcolors.level2[i]+"\"></div>";
	}
	for(var i = 0; i < allcolors.level3.length; i++){
	      strl1 +="<div class=\"five_color_box_color_body colorclick\" style=\"background-color:"+allcolors.level3[i]+"\" color=\""+allcolors.level3[i]+"\"></div>";
	}
	for(var i = 0; i < allcolors.level4.length; i++){
	      strl1 +="<div class=\"five_color_box_color_head colorclick\" style=\"background-color:"+allcolors.level4[i]+"\" color=\""+allcolors.level4[i]+"\"></div>";
	}
	for(var i = 0; i < allcolors.level5.length; i++){
	      strl1 +="<div class=\"five_color_box_color_body colorclick\" style=\"background-color:"+allcolors.level5[i]+"\" color=\""+allcolors.level5[i]+"\"></div>";
	}

	strl1 += "<div class=\"clear\"></div></div>";
	/*
	strl1 += "<div class=\"themetitle\">标准色</div>";
	strl1 += "<div class=\"themepart\">";
	for(var i = 0; i < allcolors.level6.length; i++){
	      strl1 +="<div class=\"five_color_box_color_standard colorclick\" style=\"background-color:"+allcolors.level6[i]+"\" color=\""+allcolors.level6[i]+"\"></div>";
	}
	strl1 += "<div class=\"clear\"></div></div>";
    */
	strl1 += "<div class=\"lastcolorline\"><div class=\"five_color_box_color_head nocolorclick\"></div>";
	strl1 += "<div class=\"othercolor\">其他颜色...</div><div class=\"clear\"></div></div>";

	$("#"+panelId).find("*").unbind();
	$("#"+panelId).html("").append(strl1);

	$(".colorclick").bind("click", function(){
			$.topology.selector.reset();
			$.topology.selector.select($.topology.view.id)
			var selectNodeObj = $.topology.view;

			$.topology.view.style["background-color"]= $(this).attr("color");
			$.topology.view.style["background-opacity"]= 0.8;
			$.isFunction(selectNodeObj.change) && selectNodeObj.change();
			$.topology.selector.refresh();
			$("#background_"+$.topology.view.id).attr("fill",$(this).attr("color")).attr("opacity","1");
	});

	$(".nocolorclick").bind("click", function(){
			$.topology.selector.reset();
			$.topology.selector.select($.topology.view.id)
			var selectNodeObj = $.topology.view;

			$.topology.view.style["background-opacity"]= 0;
			$.isFunction(selectNodeObj.change) && selectNodeObj.change();
			$.topology.selector.refresh();

	});

	$(".othercolor").bind("click", function(){
		opentitlewindow("拾色器", 360, 280, "<div id='colorPickerWidget'></div>", "")
		var _color = $.topology.view.style["background-color"];
		$("#colorPickerWidget").ColorPicker({
			flat: true,
			color: _color,
			onSubmit: function(hsb, hex, rgb, el) {
				gridColor = "#" + hex;
				$.topology.selector.reset();
				$.topology.selector.select($.topology.view.id)
				var selectNodeObj = $.topology.view;
				$.topology.view.style["background-color"]= gridColor;
				$.topology.view.style["background-opacity"]= 0.8;
				$.isFunction(selectNodeObj.change) && selectNodeObj.change();
				$.topology.selector.refresh();
				//$("#background_"+$.topology.view.id).attr("fill",gridColor).attr("opacity","1");
				closeWindow();
			},
			onBeforeShow: function() {
				$(this).ColorPickerSetColor(_color)
			}
		})
	});
}