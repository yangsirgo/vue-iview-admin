var projectPath = $.project.path;
var queryParams ;

function init() {
	queryParams= topoData.queryParams;
	initUI();
	initModel();
}

// 初始化UI

function initUI() {
	shieldContextMenu();
// 加载页面结构
	$.lab.ui.layoutControl(queryParams);
// 加载转换器配置
	initConverterConfig();
}
// 初始化模型
function initModel() {
	var $topo = $.topology;
	queryParams.type = !queryParams.type ? 1 : queryParams.type;
// 初始化配置参数
	$topo.status = "SHOW";
	$topo.loadPluginConfig(queryParams.type);
	$topo.config.global["screen_adapter"] = (queryParams.fill && queryParams.fill == 1) ? "fill" : "auto";

	if (window.self != window.top) {
		$.topology.config.global["popup_window"] = "1"
	}

	$topo.loadViews({
		success: function() {
			if (!$.svg._support) {
				if ($.browser.msie) {
					layer.msg("您目前使用的ie浏览器无法正常浏览图形！" + '请您<a href="tools/SVGView.exe">下载</a>并安装插件。',{icon:0});
				} else {
					layer.msg("您目前使用的浏览器并不是标准内核，不支持图形显示！" + "建议您使用ie、chrome或firefox等主流浏览器。",{icon:0});
				}
			} else {
				var _views = getViewsByTypeAndHidden(queryParams.type, false);
				if (_views.length > 0) {
// 初始化图形引擎
					$topo.loadGraphConfig();
					$topo.graphEngine = new hy.topology.engine.SVGEngine();
					$topo.layout = hy.topology.layout;
					$topo.graphEngine.init("svgContainer", function() {
						loadTopology(queryParams.id, true)
						initHotKeys()
					})
				} 
			}
		}
	});

	$($topo).on("selectElement", function() {
		$.topology.ui.tooltip4hang.selectElementEvents()
	})
}

function refreshStates(){
	var $topo = $.topology;
	$.ajax({
		type : "get",
		url : ctx + "/network/loadTopologyDatas.do?topoId="+$topo.view.id+"&tmp="+new Date().getTime(),
		timeout : 10000, //超时时间设置，单位毫秒
		dataType : "json",
		success : function(msg) {
			console.log("============================loadTopologyDatas============================")
			topoData.event = msg.events;		
			console.log(topoData.event)	
			topoData.kpi = msg.kpis;	
			console.log(topoData.kpi)
			loadEvents();
			loadKpis();
		}
	});
	//setTimeout(function() {refreshStates()}, 60000);// 状态刷新事件
}
// 加载拓扑
function loadTopology(vid, panelFlag) {
// 加载并绘制拓扑图
	var id = arguments.length === 0 ? queryParams.id : vid;
	$.topology.loadTopo( id, {
		success: function() {
			var viewType = $.topology.view.type;
			// 加载上下文配置
			$.topology.loadContextConfig($.topology.getAllObjectClass());
			// 加载指标配置
			$.topology.loadKpiConfig(viewType);
			// 加载Tooltip配置
			$.topology.ui.tooltip4hang.init();
			$.topology.ui.tooltip.init();
			//refreshStates();
		}
	})
}

var move=false;// 移动标记
var $_tempDragIcon ,_tempX, _tempY, imgIconPath, imgIconWidth, imgIconHeight;

function loadEvents() {
	var winName = "eventLoadErrorWindow";
	$.topology.loadEvent(null, {
		success: function() {
			$.topology.ui.tooltip.data({
				event: true
			});
			$.topology.ui.tooltip4hang.data({
				event: true
			})
		},
		complete: function() {}
	})
}

function loadKpis() {
	var winName = "kpiLoadErrorWindow";
	$.topology.loadKpi({
		success: function() {
			if ($.topology.view.type == 1) {
				$.lab.itsm.linkWeight()
			}
			$.topology.ui.tooltip.data({
				kpi: true
			});
			$.topology.ui.tooltip4hang.data({
				kpi: true
			});
		}
	})
}

function getViewsByTypeAndHidden(type, hidden) {
	var _views = [], datas = $.topology.views;
	for (var id in datas) {
		if (type == datas[id].type && hidden == datas[id].isHidden) {
			_views.push(datas[id])
		}
	}
	return _views.sort(function(a, b) {
		return a.name.localeCompare(b.name)
	}).sort(function(a, b) {
		return (parseInt(a.orderCode) - parseInt(b.orderCode))
	})
}

function shieldContextMenu() {
	$(document).bind("contextmenu", function(e) {
		return false
	})
}

function screenMaximum() {
	if (window.screen) {
		window.moveTo(0, 0);
		window.resizeTo(screen.availWidth, screen.availHeight)
	}
}

function _modelGroup(arr) {
	var _callee = arguments.callee,
		groupNames = _callee.groupNames,
		resources = {},
		unknowNameTypes = [],
		modelTypes = [],
		containerGroup = null,
		otherGroup = null,
		nodes = [];
	if (!groupNames) {
		groupNames = _callee.groupNames = {
			"4999": "其他",
			"9999": "容器"
		}
	}
	$.each(arr, function(idx, o) {
		var id = o.id, group = resources[o.objectClass], name = String.prototype.replace.call(o.name || "", /<br>/ig, " ");
		if (o.objectId && o.objectId > 0 && o.objectClass && o.objectClass > 0 && o.objectClass != 4999) {
			if (!group) {
				resources[o.objectClass] = group = {
					id: "oc_" + o.objectClass,
					objectClass: o.objectClass,
					drag: false,
					nocheck: true,
					nodeType: "group",
					children: []
				};
				modelTypes.push(o.objectClass);
				if (!groupNames[o.objectClass]) {
					unknowNameTypes.push(o.objectClass)
				}
			}
		} else {
			if (o.type == 1) {
				if (!containerGroup) {
					containerGroup = resources["9999"] = {
						id: "oc_9999",
						objectClass: 9999,
						drag: false,
						nocheck: true,
						nodeType: "group",
						children: []
					}
				}
				group = containerGroup
			} else {
				if (!otherGroup) {
					otherGroup = resources["4999"] = {
						id: "oc_4999",
						objectClass: 4999,
						drag: false,
						nocheck: true,
						nodeType: "group",
						children: []
					}
				}
				group = otherGroup
			}
		}
		var nodeType = o.objectClass >= 100000 ? "bsmnode" : "node";
		group.children.push({
			id: id,
			name: name,
			title: name,
			drag: false,
			nodeType: nodeType,
			iconSkin: nodeType + " n" + group.objectClass
		})
	});
	if (containerGroup) {
		modelTypes.push(containerGroup.objectClass)
	}
	if (otherGroup) {
		modelTypes.push(otherGroup.objectClass)
	}
	var unknowNameType, ocInfo, i;
	for (i = 0; i < unknowNameTypes.length; i++) {
		unknowNameType = unknowNameTypes[i];
		ocInfo = $.topology.getObjectClassInfo(unknowNameType);
		if (ocInfo && ocInfo.name) {
			groupNames[unknowNameType] = ocInfo.name
		} else {
			layer.msg("检查到未注册的资源类型[" + unknowNameType + "]！",{icon:0});
			continue
		}
	}
	if (modelTypes.length > 0) {
		var i, group;
		for (i = 0; i < modelTypes.length; i++) {
			group = resources[modelTypes[i]];
			group.name = group.title = groupNames[group.objectClass];
			nodes.push(group)
		}
	}
	return nodes
}

function initConverterConfig() {
	$.topology.ui.converterConfig = topoData.config.convertor
}
// 初始化热键
function initHotKeys() {}
// 获得当前Id
function getViewId() {
	var vid = null, view = $.topology.view;
	if (view) {
		vid = view.id
	}
	return vid
}
