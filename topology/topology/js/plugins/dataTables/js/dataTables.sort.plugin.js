jQuery.extend(jQuery.fn.dataTableExt.oSort, {
	"html-percent-pre" : function(a) {
		var x = String(a).replace(/<[\s\S]*?>/g, ""); // 去除html标记
		x = x.replace(/&nbsp;/ig, ""); // 去除空格
		x = x.replace(/%/, ""); // 去除百分号
		x = x.replace(/-/, "-1"); // 
		return parseFloat(x);
	}
});

jQuery.extend(jQuery.fn.dataTableExt.oSort, {
	"html-css-pre" : function(a) {
		var x = jQuery(a).attr("class");
		return x;
	}
});