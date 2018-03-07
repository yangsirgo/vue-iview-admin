function initIconPicker(target){
	var $target = $(target);
	$target.unbind("click").click(function() {
		var $content = $("<div/>").attr("id", "iconPickerWidget");
		var el = $target, iconUrl = el.attr("iconPath"), iconCfgData = $.topology.iconConfig();
		var $iconTabs = $("<div/>").attr("id", "iconTabs");
		$content.empty().css("overflow-y", "hidden").append($iconTabs);
		var tabUl = $("<ul/>"),
			tabDivs = [],
			checkedTab = 0,
			checkedRow = 0;
		for (var i = 0, len = iconCfgData.length; i < len; i++) {
			var $iconTabsTitle = $("<a href='#iconTabs-" + i + "'>" + iconCfgData[i].label + "</a>");
			$("<li/>").append($iconTabsTitle).appendTo(tabUl);
			var icons = iconCfgData[i].icons;
			var tabId = "iconTabs-" + i,
				tab = $("<div/>").attr("id", tabId).css({
					"padding": "8px; 0 0 0"
				}),
				icon = null,
				$table = $("<table></table>").addClass("icon-picker-table"),
				$tr = null,
				iconPath = "",
				isChecked = false,
				_row = 0;
			for (var j = 0, iconLen = icons.length; j < iconLen; j++) {
				icon = icons[j];
				iconPath = ctxImg+"/topology/icon_svg/" ;
				if ((icon.path + icon.name) === iconUrl) {
					checkedTab = i;
					isChecked = true
				} else {
					isChecked = false
				}
				if (j % 8 === 0) {
					$tr = $("<tr></tr>").appendTo($table);
					_row++
				}
				iconPath += icon.path + (icon.name.split(".")[1].toLowerCase() === "svg" ? (icon.name.split(".")[0] + ".gif") : icon.name);
				var $img = $("<div/>").append($("<img/>").attr({
					id: "icon-" + icon.name.split(".")[0],
					src: iconPath,
					title: icon.desc,
					width: 48,
					height: 48
				}).addClass("icon-item")).attr("id", "icon-container-" + icon.name.split(".")[0]),
					$radio = $("<input>").attr({
						name: "iconrdo",
						type: "radio",
						value: (icon.path + icon.name + ";" + icon.width + ";" + icon.height),
						id: icon.name.split(".")[0]
					});
				if (isChecked) {
					$img.removeClass().addClass("icon-container-checked");
					$radio.attr("checked", "checked");
					checkedRow = _row
				} else {
					$img.removeClass().addClass("icon-container")
				}
				$("<td></td>").append($img).append($radio).appendTo($tr)
			}
			tab.append($table);
			tabDivs.push(tab)
		}
		//$iconTabs.append(tabUl);
		for (i = 0, len = tabDivs.length; i < len; i++) {
			$iconTabs.append(tabDivs[i])
		}
		$iconTabs.tabs();
		
		openwindow("图标选取器", 600, 440, $content.html(), function(){
			var chkrdo = $("input[name='iconrdo']:checked");
			var vals = chkrdo.attr("value").split(";");
			var iconStr = vals[0];
			var width = vals[1];
			var height = vals[2];
			var $nodeImg = $("<div/>").append($("<img/>").attr({src: ctxImg+"/topology/icon_svg/"+iconStr, width: width, height: height}));
			$target.attr("iconPath", iconStr);
			$target.html($nodeImg);
			closeWindow();
		}, function(){
			closeWindow();
		})
		
		
		$("#iconTabs>ul").children(":eq(" + checkedTab + ")").children().trigger("click");
		var offsetTop = (checkedRow - 1) * 52 > 0 ? ((checkedRow - 1) * 52) : 0;
		$("#iconTabs-" + checkedTab).scrollTop(offsetTop);
		
		$(":radio[name='iconrdo']").unbind("click").click(function() {
			if ($(this).prop("checked")) {
				$("div[id^='icon-container-'][class='icon-container-checked']").removeClass("icon-container-checked").addClass("icon-container");
				$("#icon-container-" + $(this).attr("id")).removeClass("icon-container").addClass("icon-container-checked")
			}
		});
		$(".icon-item").unbind("click").click(function() {
			var id = $(this).attr("id");
			$("div[id^='icon-container-'][class='icon-container-checked']").removeClass("icon-container-checked").addClass("icon-container");
			$("#icon-container-" + id.replace(/icon-/i, "")).removeClass("icon-container").addClass("icon-container-checked");
			$("#" + id.replace(/icon-/i, "")).prop("checked", true)
		})
	})
}
