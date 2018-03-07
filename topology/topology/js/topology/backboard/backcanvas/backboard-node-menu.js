var ul = undefined;

var NodeMenu = {
	data: {
		nodeToolBar: [{
			Text: "删除",
			value: 1,
			name: "backDel",
			edit: "1"
		}, {
			Text: "修改",
			value: 2,
			name: "backEdit",
			edit: "1"
		}],

		commonUtilsMenu: [],
		operChildMenu: [],
		monitorMenu: [],
		infotableMenu: [],
	},
	initNodeToolBar: function() {
		this.data.nodeToolBar = [{
			Text: "删",
			value: 1,
			name: "backDel",
			edit: "1"
		}, {
			Text: "修改",
			value: 2,
			name: "backEdit",
			edit: "1"
		}];
	},
	initToolBar: function() {
		/**
		 * 控制当前登陆的用户拓扑权限
		 */
		ul = Toolkit.createUL();
		ul.setAttribute("class", "rightMouseLevel_1");
		for (var p in this.data.nodeToolBar) {
			var _Object = this.data.nodeToolBar[p];

			var li = Toolkit.createLI();
			var a = Toolkit.createA(_Object.Text);
			utils.addEventHandler(a, "mouseenter", function(event) {
				if ($(event.target).next("div").hasClass('rightMouse_1')) {
					$(event.target).parent().siblings().find(".rightMouse_1").hide();
					$(event.target).next(".rightMouse_1").show();
					$(event.target).next(".rightMouse_1").css("right", -$(event.target).next(".rightMouse_1").width() - 14);
				} else {
					$(event.target).parent().siblings().find(".rightMouse_1").hide();
				}
			});

			li.appendChild(a);

			if (_Object.name == "backDel") {
				utils.addEventHandler(a, "click", nodeOperFunc.backDel);
			}

			if (_Object.name == "backEdit") {
				utils.addEventHandler(a, "click", nodeOperFunc.backEdit);
			}

			ul.appendChild(li);
		}

	},

	getUl: function() {
		return ul;
	}
}

var nodeOperFunc = {
	backDel: function() {
		Menu.deleteNode();
		Menu.removeMenu();
	},

	backEdit: function() {
		Menu.editNode();
		Menu.removeMenu();
	},
	operator: function(e) {
		// var left = $('#divMenu').css('left');
		// var top = $('#divMenu').css('top');
		// var parentMenuWidth = $('#divMenu').css('width');
		//		
		// left = left.replace("px","");
		// parentMenuWidth = parentMenuWidth.replace("px","");

		var div = Toolkit.createDiv();
		div.id = "operdiv";
		div.style.zIndex = 1000;
		div.style.position = "absolute";
		div.setAttribute("class", "rightMouse_1");
		// div.style.left = Number(left)+Number(parentMenuWidth) + "px";
		// div.style.top = (e.clientY-10) +"px";

		// div.style.width = "150px";
		// div.style.backgroundColor = "#4b4b4b";
		var ul = Toolkit.createUL();

		for (var p in NodeMenu.data.operChildMenu) {

			// _Object = NodeMenu.data.operChildMenu[p];
			// var ppdiv = Toolkit.createDiv();
			// ppdiv.innerHTML = _Object.Text;
			// ppdiv.style.width = "150px";
			// ppdiv.style.height = "30px";
			// ppdiv.style.backgroundColor = "#4b4b4b";
			// utils.addEventHandler(ppdiv, "click", childOperFunc.setHidden);
			// div.appendChild(ppdiv);
		}
		// document.body.appendChild(div);
	},

	removeOperdiv: function() {
		var operdiv = document.getElementById('operdiv');
		if (operdiv != undefined) document.body.removeChild(operdiv);
	},

	monitorManager: function() {
		infotip("monitorManager");
	},

	detailInfo: function() {
		var cuNode = Menu.element;
		if (cuNode.instanceId != undefined && cuNode.instanceId != null && cuNode.instanceId != "") {
			var rootPath = projectUtil.getProjectUrl();
			url = rootPath + "/resourceDetail/getResDetailById.do?instanceId=" + cuNode.instanceId;
			window.open(url, "_blank");
		} else {
			infotip("请先将该设备加入监控");
		}
		Menu.removeMenu();
	},

	backPlaneInfo: function() {
		var id = Menu.element.id;
		window.open(viewbackplanpath + id, "_blank");
		Menu.removeMenu();
	},

	interFaceWatch: function() {
		var url = viewinterfacepath + "?ip=" + Menu.element.ip + "&name=" + Menu.element.devname + "&type=" + Menu.element.devtype + "&id=" + Menu.element.id;
		window.open(url, "_blank");
		Menu.removeMenu();
	},

	realTimeAnalysis: function() {
		var cuNode = Menu.element;
		if (cuNode.instanceId != undefined && cuNode.instanceId != null && cuNode.instanceId != "") {
			var rootPath = projectUtil.getProjectUrl();
			var url = rootPath + "/realtimeAnalysis/initRealtimeAnalysis.do?instanceId=" + Menu.element.instanceId;
			window.open(url, "_blank");
		} else {
			infotip("请先将该设备加入监控");
		}
		Menu.removeMenu();
	},


	updateIP: function() {
		$('#updateIPView').show();
		var ipAddressList = Menu.element.ipAddressList;
		var ip = Menu.element.ip;

		$("#updateIpPage").html("");
		var html = "";
		html += '<div id="updateIpPage" class="wrapper-dropdown-3" tabindex="1" onclick="iSelect(event);"  style="width:200px;">' + '<span id="spanupdateid" class="cSpan">' + ip + '</span>' + '<ul class="dropdown">';
		for (var i in ipAddressList) {
			html += '<li><a href="#" value="' + ipAddressList[i] + '">' + ipAddressList[i] + '</a></li>';
		}
		html += '</ul>' + '</div>';
		$("#updateIpPage").append(html);

		Menu.removeMenu();
	},

	joinArea: function() {
		infotip("joinarea");
	}
}
/**
 *	选中元素后右键中 操作，常用工具，地址表 的二级菜单操作命令
 */
var childOperFunc = {
	//隐藏操作	
	setHidden: function() {
		Menu.element.setIsHidden("true");
		Menu.removeMenu();
		nodeOperFunc.removeOperdiv();

		topoinfo.draw();
		operator.save();
	},
	//地址表
	setAddresstable: function() {
		var url = addresstablepath + "?ip=" + Menu.element.ip + "&name=" + Menu.element.devname + "&type=" + Menu.element.devtype + "&id=" + Menu.element.id;
		window.open(url, "_blank");
		Menu.removeMenu();
	},
	//路由表
	setRoultertable: function() {
		var url = routertablepath + "?ip=" + Menu.element.ip + "&name=" + Menu.element.devname + "&type=" + Menu.element.devtype + "&id=" + Menu.element.id;
		window.open(url, "_blank");
		Menu.removeMenu();
	},
	//arp表
	setArptable: function() {
		var url = arptablepath + "?ip=" + Menu.element.ip + "&name=" + Menu.element.devname + "&type=" + Menu.element.devtype + "&id=" + Menu.element.id;
		window.open(url, "_blank");
		Menu.removeMenu();
	},
	//vlan表
	setVlantable: function() {
		var url = vlantablepath + "?ip=" + Menu.element.ip + "&name=" + Menu.element.devname + "&type=" + Menu.element.devtype + "&id=" + Menu.element.id;
		window.open(url, "_blank");
		Menu.removeMenu();
	},
	//web管理
	setWebmanagerUtil: function() {
		$('#webmanager').show();
		Menu.removeMenu();
	},
	//telnet连接
	telnetutil: function() {
		InitTelnetTool.telnetMethod();
		$('#telnet').show();
		Menu.removeMenu();
	},
	//ssh 连接
	setSshUtil: function() {
		InitSSH.iniMethod();
		$('#ssh').show();
		Menu.removeMenu();
	},
	//ping 连接
	setPingUtil: function() {
		InitPingTool.init();
		$('#ping').show();
		Menu.removeMenu();
	},
	//snmp 连接
	setSnmptestUtil: function() {
		InitSNMPTool.init();
		$('#snmptest').show();
		Menu.removeMenu();
	},
	//Traceroute 连接
	setTracerouteUtil: function() {
		InitTracepoute.init();
		$('#tracepoute').show();
		Menu.removeMenu();
	},
	//加入监控
	setJoinMonitor: function() {
		$('#joinMonitor').show();
		Menu.removeMenu();

	},

	// setCancelmonitor : function(){
	//		
	// },
	//删除
	setDelete: function() {
		Menu.deleteNode();
		Menu.removeMenu();
	},
	//双击操作设置
	setDbclick: function() {
		DbClick.init();$('#dbClickView').show();
		Menu.removeMenu();
	},
	//替换图标
	setReplacePic: function() {
		$('#replacePicWares').show(); //show topoRepPic.ftl
		Menu.removeMenu();
	},
	//设置显示名称
	setModifyShowName: function() {
		$('#modifyShowName').show();
		document.getElementById("showName").value = ""; /* add 修改拓扑，设备右键功能，操作-修改显示名称，弹出的对话框显示的是上一次修改的名称 　*/
		Menu.removeMenu();
	}
}

/**
 * 调用卢强加入监控接口
 */

function joinMonitor() {
	var joinMonId = Menu.element.id;
	loadingFn(true);
	$.ajax({
		type: "POST",
		url: ctx + "/nodeMenuClick/joinMonitor",
		data: {
			id: joinMonId
		},
		success: function(data) {
			data = JSON.parse(data);
			if (data["success"] == true) {
				infotip("加入监控成功");
				topoinfo.draw();
			} else {
				infotip("加入监控失败");
			}
			loadingFn(false);
		}
	});
}
/**
 * 取消监控
 */

function canelJoinMonitor() {
	Menu.removeMenu();
	var joinMonId = Menu.element.id;
	loadingFn(true);
	$.ajax({
		type: "POST",
		url: ctx + "/nodeMenuClick/canelJoinMonitor",
		data: {
			id: joinMonId
		},
		success: function(data) {
			data = JSON.parse(data);
			if (data["success"] == true) {
				infotip("取消监控成功");
				//				Menu.element.setInstanceId(undefined);
			} else {
				infotip("取消监控失败");
			}
			loadingFn(false);
		}
	});
}

var projectUtil = {
	getProjectUrl: function() {
		var curPath = window.document.location.href; // 获取主机地址之后的目录，如：//
		var pathName = window.document.location.pathname;
		var pos = curPath.indexOf(pathName); // 获取主机地址，如：
		// http://localhost:8083
		var localhostPaht = curPath.substring(0, pos); // 获取带"/"的项目名，如：/uimcardprj
		var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
		// var rootPath = localhostPaht + projectName;
		return localhostPaht + "/portal";

	}
}

/* 替换图标方法——wjm */

function replacePicFunc() {
	var Elements = topoinfo.getElements();
	if (Elements.length == 0) {
		infotip("没有节点可以保存");
		return;
	}
	var imgsrc = $('#mypics').val();
	Menu.element.img.src = imgsrc;
	topoinfo.draw();
	operator.save();
}


function modifyShowName() {

	var Elements = topoinfo.getElements();
	if (Elements.length == 0) {
		infotip("没有节点可以保存");
		return;
	}
	var name = document.getElementById('showName').value;
	//	Menu.element.showName=name;
	Menu.element.devname = name;
	//potarl 处资源名称也需要跟着变动。
	$.ajax({
		type: "POST",
		url: ctx + "/resource/name/modification.do",
		data: {
			instanceId: Menu.element.instanceId,
			name: name
		},
		success: function(data) {

		}
	});
	operator.save();
	topoinfo.draw();

}

function updateIpInfo() {
	var Elements = topoinfo.getElements();
	if (Elements.length == 0) {
		infotip("没有节点可以保存");
		return;
	}
	var ip = document.getElementById("spanupdateid").innerText;
	Menu.element.ip = ip;
	operator.save();
	topoinfo.draw();
}