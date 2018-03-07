var mxPopupMenuTimer;

$(function() {

	// 窗口close悬停事件
	$(".titleclose").hover(function() {
		$(this).addClass("titlecloseon");
	}, function() {
		$(this).removeClass("titlecloseon");
	});

	initToolBar();

	function initToolBar() {
		bindAction("organization", "$.lab.topo.forceLayout")
		bindAction("actualsize", "$.lab.topo.viewOrigiZoom")
		bindAction("screen", "$.lab.topo.viewFitToCanvas")
		bindAction("zoomin", "$.lab.topo.viewZoomIn")
		bindAction("zoomout", "$.lab.topo.viewZoomOut")

		bindAction("save", "$.lab.topo.saveTopo")
		bindAction("refresh", "$.lab.topo.viewRefresh")
		bindAction("undo", "")
		bindAction("redo", "")
		bindAction("close", "$.lab.topo.realDeleteElement")
		bindAction("bold", "$.lab.topo.fontWeight")
		bindAction("italic", "$.lab.topo.fontItalic")
		bindAction("underline", "$.lab.topo.fontDecoration")
		//bindAction("left", "$.lab.topo.fontAlign")
		bindAction("left", "fontAlignMenu")
		bindAction("fontcolor", "$.lab.topo.fontColor")
		bindAction("fontstyle", "fontStyleMenu")
		bindAction("fontsize", "fontSizeMenu")
		bindAction("orthogonal", "")
		bindAction("startclassic", "")
		bindAction("endclassic", "")
		bindAction("dotline", "lineStyleMenu")
		bindAction("threeline", "lineWeightMenu")
		bindAction("strokecolor", "")
		bindAction("fillcolor", "")
		bindAction("gradientcolor", "")
		bindAction("hand", "$.lab.ui.setViewDragMove")
		bindAction("grid", "$.lab.ui.gridAndSnap")
		bindAction("warn", "warn")
		bindAction("smallmap", "eagleEye")
		bindAction("formatpanel", "formatpanel")
	}
	function fontAlignMenu(e){
		if(!$.lab.menu.testSelectSymbol()){
			return;
		}
		var $popupMenu = $("<table class=\"mxPopupMenu\" style=\"width:25px;\"></table>")
		$("#mxPopupMenu").html("");
		$("#mxPopupMenu").append($popupMenu)
		var array=[{"title":"居左","class":"geSprite-left", "action":"$.lab.topo.fontAlign", "value":"left"},
		           {"title":"居中","class":"geSprite-center", "action":"$.lab.topo.fontAlign", "value":"center"},
		           {"title":"居右","class":"geSprite-right", "action":"$.lab.topo.fontAlign", "value":"right"}]
		for (var i = 0; i < array.length; i++) {
			var $tr=$("<tr class=\"mxPopupMenuItem\" title=\" " + array[i]["title"] + "\"><td class=\"mxPopupMenuIcon\">" +
					"<div class=\"geIcon " + array[i]["class"] + "\" value=\""+ array[i]["value"]
					+"\" style=\" font-family:"+ array[i]["value"]  +";margin:3px;cursor:pointer;\"></div></td></tr>");
			$popupMenu.append($tr);
			$tr.bind("click", eval(array[i]["action"]));
		}
		$("#mxPopupMenu").css("left", $(e.target).offset().left - 55 + "px");
		$("#mxPopupMenu").css("top", '28px');
		$("#mxPopupMenu").show();
		mxPopupMenuTimer=setTimeout(function() {
			$("#mxPopupMenu").hide()
		},3000);
		$("#mxPopupMenu").hover(function(){
		   clearTimeout(mxPopupMenuTimer);
		},function(){
			$("#mxPopupMenu").hide()
		});

	}

	function fontStyleMenu(e){
		if(!$.lab.menu.testSelectSymbol()){
			return;
		}
		var $popupMenu = $("<table class=\"mxPopupMenu\"></table>")
		$("#mxPopupMenu").html("");
		$("#mxPopupMenu").append($popupMenu)
		var array=[{"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Arial"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Comic Sans MS"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Courier New"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Garamond"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Georgia"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Helvetica"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Lucid Console"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Tahma"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Times New Roman"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"Verdana"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"微软雅黑"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"黑体"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"宋体"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"楷体"},
		           {"title":"","class":"", "action":"$.lab.topo.fontFamily", "value":"仿宋"}]
		for (var i = 0; i < array.length; i++) {
			var $tr=$("<tr class=\"mxPopupMenuItem\" title=\" " + array[i]["title"] + "\"><td class=\"mxPopupMenuIcon\">" +
					"<div class=\"" + array[i]["class"] + "\" value=\""+ array[i]["value"]
					+"\" style=\" font-family:"+ array[i]["value"]  +";margin:3px;cursor:pointer;\">"+ array[i]["value"]  +"</div></td></tr>");
			$popupMenu.append($tr);
			$tr.bind("click", eval(array[i]["action"]));
		}
		$("#mxPopupMenu").css("left", $(e.target).offset().left - 55 + "px");
		$("#mxPopupMenu").css("top", '28px');
		$("#mxPopupMenu").show();
		mxPopupMenuTimer=setTimeout(function() {
			$("#mxPopupMenu").hide()
		},3000);
		$("#mxPopupMenu").hover(function(){
		   clearTimeout(mxPopupMenuTimer);
		},function(){
			$("#mxPopupMenu").hide()
		});
	}

	function fontSizeMenu(e){
		if(!$.lab.menu.testSelectSymbol()){
			return;
		}
		var $popupMenu = $("<table class=\"mxPopupMenu\"></table>")
		$("#mxPopupMenu").html("");
		$("#mxPopupMenu").append($popupMenu)
		var array=[{"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"6"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"8"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"9"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"10"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"11"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"12"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"14"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"16"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"18"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"24"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"36"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"48"},
		           {"title":"","class":"", "action":"$.lab.topo.fontSize", "value":"72"}]
		for (var i = 0; i < array.length; i++) {
			var $tr=$("<tr class=\"mxPopupMenuItem\" title=\" " + array[i]["title"] + "\"><td class=\"mxPopupMenuIcon\">" +
					"<div class=\"" + array[i]["class"] + "\" value=\""+ array[i]["value"]
					+"\" style=\" font-size:"+ array[i]["value"]  +"px;margin:3px;cursor:pointer;\">"+ array[i]["value"]  +"</div></td></tr>");
			$popupMenu.append($tr);
			$tr.bind("click", eval(array[i]["action"]));
		}
		$("#mxPopupMenu").css("left", $(e.target).offset().left - 55 + "px");
		$("#mxPopupMenu").css("top", '28px');
		$("#mxPopupMenu").show();
		mxPopupMenuTimer=setTimeout(function() {
			$("#mxPopupMenu").hide()
		},3000);
		$("#mxPopupMenu").hover(function(){
		   clearTimeout(mxPopupMenuTimer);
		},function(){
			$("#mxPopupMenu").hide()
		});
	}

	function lineWeightMenu(e){
		if(!$.lab.menu.testSelectLine()){
			return;
		}
		var $popupMenu = $("<table class=\"mxPopupMenu\"></table>")
		$("#mxPopupMenu").html("");
		$("#mxPopupMenu").append($popupMenu)
		var array=[{"title":"","class":"geSprite_line2", "action":"$.lab.topo.lineWeight", "value":"2"},
		           {"title":"","class":"geSprite_line4", "action":"$.lab.topo.lineWeight", "value":"4"},
		           {"title":"","class":"geSprite_line6", "action":"$.lab.topo.lineWeight", "value":"6"},
		           {"title":"","class":"geSprite_line8", "action":"$.lab.topo.lineWeight", "value":"8"},
		           {"title":"","class":"geSprite_line10", "action":"$.lab.topo.lineWeight", "value":"10"}]
		for (var i = 0; i < array.length; i++) {
			var $tr=$("<tr class=\"mxPopupMenuItem\" title=\" " + array[i]["title"] + "\"><td class=\"mxPopupMenuIcon\">" +
					"<div class=\"geIcon geSpritex " + array[i]["class"] + "\" value=\""+ array[i]["value"]  +"\"></div></td></tr>");
			$popupMenu.append($tr);
			$tr.bind("click", eval(array[i]["action"]));
		}
		$("#mxPopupMenu").css("left", $(e.target).offset().left - 55 + "px");
		$("#mxPopupMenu").css("top", '28px');
		$("#mxPopupMenu").show();
		mxPopupMenuTimer=setTimeout(function() {
			$("#mxPopupMenu").hide()
		},3000);
		$("#mxPopupMenu").hover(function(){
		   clearTimeout(mxPopupMenuTimer);
		},function(){
			$("#mxPopupMenu").hide()
		});
	}

	function lineStyleMenu(e){
		if(!$.lab.menu.testSelectLine()){
			return;
		}
		var $popupMenu = $("<table class=\"mxPopupMenu\"></table>")
		$("#mxPopupMenu").html("");
		$("#mxPopupMenu").append($popupMenu)
		//"8_8", "8_14", "14_8", "14_14", "4_14_8_14", "8_4_14_4"
		var array=[{"title":"","class":"geSprite_line_none", "action":"$.lab.topo.lineStyle", "value":"none"},
		           {"title":"","class":"geSprite_line_8_8", "action":"$.lab.topo.lineStyle", "value":"8,8"},
		           {"title":"","class":"geSprite_line_8_14", "action":"$.lab.topo.lineStyle", "value":"8,14"},
		           {"title":"","class":"geSprite_line_14_8", "action":"$.lab.topo.lineStyle", "value":"14,8"},
		           {"title":"","class":"geSprite_line_14_14", "action":"$.lab.topo.lineStyle", "value":"14,14"},
		           {"title":"","class":"geSprite_line_4_14_8_14", "action":"$.lab.topo.lineStyle", "value":"4,14,8,14"},
		           {"title":"","class":"geSprite_line_8_4_14_4", "action":"$.lab.topo.lineStyle", "value":"8,4,14,4"}]
		for (var i = 0; i < array.length; i++) {
			var $tr=$("<tr class=\"mxPopupMenuItem\" title=\" " + array[i]["title"] + "\"><td class=\"mxPopupMenuIcon\">" +
					"<div class=\"geIcon geSpritex " + array[i]["class"] + "\" value=\""+ array[i]["value"]  +"\"></div></td></tr>");
			$popupMenu.append($tr);
			$tr.bind("click", eval(array[i]["action"]));
		}
		$("#mxPopupMenu").css("left", $(e.target).offset().left - 57 + "px");
		$("#mxPopupMenu").css("top", '28px');
		$("#mxPopupMenu").show();
		mxPopupMenuTimer=setTimeout(function() {
			$("#mxPopupMenu").hide()
		},3000);
		$("#mxPopupMenu").hover(function(){
		   clearTimeout(mxPopupMenuTimer);
		},function(){
			$("#mxPopupMenu").hide()
		});
	}

	function bindAction(target, action) {
		$(".geSprite-" + target).bind("click", eval(action));
	}
	function formatpanel() {
		$("#huitudiv").toggle();
	}
	Date.prototype.Format = function(fmt)
	{ //author: meizz
	  var o = {
	    "M+" : this.getMonth()+1,                 //月份
	    "d+" : this.getDate(),                    //日
	    "h+" : this.getHours(),                   //小时
	    "m+" : this.getMinutes(),                 //分
	    "s+" : this.getSeconds(),                 //秒
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度
	    "S"  : this.getMilliseconds()             //毫秒
	  };
	  if(/(y+)/.test(fmt))
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	  for(var k in o)
	    if(new RegExp("("+ k +")").test(fmt))
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	  return fmt;
	}
	function getLocalTime(nS) {
	   return new Date(Number(nS)).Format("yyyy-MM-dd hh:mm:ss");
	}

	var warmTimer=undefined;
	function warn() {
		function refreshAlarm(){
			warmTimer = setTimeout(function() {refreshAlarm()},5*60*1000);//告警列表5分钟定时刷新
			var $topo = $.topology;
			$.ajax({
				type : "get",
				timeout : 10000, //超时时间设置，单位毫秒
				url : ctx + "/network/topologyAlarmDatas.do?topoId="+$topo.view.id+"&tmp="+new Date().getTime(),
				dataType : "json",
				success : function(msg) {
					console.log(msg.alarms)
					if(msg.alarms){
						$(".warninglistcontent").html("")
						var $table = $("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"></table>");
						for (var i = 0; i < msg.alarms.length; i++) {
							var alarm = msg.alarms[i];
							var $tr = $("<tr></tr>");
							$tr.append("<td class=\"warnword\"><span class=\"warnlevel"+alarm.alarmLevel+"\" title=\""+alarm.alarmRoot+"\">"+alarm.alarmRoot+"</span></td>")
							$tr.append("<td class=\"warnword\"><span class=\"warnlevel"+alarm.alarmLevel+"\">"+alarm.alarmContext+"</td>")
							$tr.append("<td class=\"warnword\"><span class=\"warnlevel"+alarm.alarmLevel+"\">"+getLocalTime(alarm.createdTime)+"</span></td>")
							$table.append($tr)
						}
						$(".warninglistcontent").append($table)
					}
				}
			});
		}
		if(warmTimer!=undefined){
			clearTimeout(warmTimer);
			warmTimer = undefined;
		}else{
			refreshAlarm();
		}
		$("#warninglist").toggle();
	}

	$("#huituclose").click(function() {
		$("#huitudiv").hide();
	});
	$("#warninglistclose").click(function() {
		$("#warninglist").hide();
	});

	$("#gehidetoolbar").click(function() {
		unbindtoolbarhover();
	});

	$("#gefixdtoolbar").click(function() {
		$(this).hide();
		unbindtoolbarhover();
		$("#gefreetoolbar").show();

	});

	$("#gefreetoolbar").click(function() {
		$(this).hide();
		bindtoolbarhover();
	    $("#gefixdtoolbar").show();
	});



	function bindtoolbarhover(){

		$("#topologyCanvasToolBar").bind("mouseenter",function(){

		     $(this).css("height","34px");
			 $("#geToolbarContainer").show(500);
			 $("#svgCanvas").css("top","35px");

		});

		$("#topologyCanvasToolBar").bind("mouseleave",function(){

			 $(this).css("height","5px");
			 $("#geToolbarContainer").hide(500);
			 $("#svgCanvas").css("top","6px");

		});

	}

	function unbindtoolbarhover(){

		$("#topologyCanvasToolBar").unbind();

	}


	// warninglist
});