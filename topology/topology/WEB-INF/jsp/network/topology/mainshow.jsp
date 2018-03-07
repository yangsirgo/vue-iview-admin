<!-- topology/topology.jsp -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<script src="${ctxJs}/jquery-1.11.0.min.js"></script>

<link href="${ctxCss}/dataTables/dataTablesgray.css" rel="stylesheet" type="text/css"/>

<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/layout/complex.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/jqueryui/gray.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/msgwindow/msgwindow.min.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/tooltip/jquery.tooltip.min.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/contextmenu/jquery.contextmenu.min.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/percentbar/jquery.percentbar.min.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/show.css"/>
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/topology.css"/>
<script src="${ctxJs}/topology/tools/window.ext.js"></script>
<script src="${ctxJs}/window.js" type="text/javascript"></script>

<div class="topologyCanvas">
    <div id="svgCanvas" class="content">
		<div id="svgContainer"></div>
	</div>
</div>

<script type="text/javascript">
var ctx = "${ctx}";
var ctxImg = "${ctxImg}";
var curTopoId = "${topoId}";
var _csrf = "${_csrf.parameterName}" ;
var _csrftoken="${_csrf.token}";
var ctxface = "${ctxface}";


var topoData = {
	config: {},
	views: [],
	view: {},
	kpi: {},
	event: {},
	resourceNodes: []
};
</script>

<!-- logic -->
<script src="${ctxJs}/topology/jquery.hydra.min.js"></script>
<script src="${ctxJs}/topology/jquery.lab.min.js"></script>
<script src="${ctxJs}/topology/jquery.svg.min.js"></script>
<!-- ui -->
<script src="${ctxJs}/topology/ui/jquery.easing.1.3.min.js"></script>
<script src="${ctxJs}/topology/ui/jquery.hoverintent.min.js"></script>
<script src="${ctxJs}/topology/ui/jqueryui/jquery-ui-1.10.3.custom.min.js"></script>
<script src="${ctxJs}/topology/ui/hotkeys/jquery.hotkeys.min.js"></script>
<script src="${ctxJs}/topology/ui/layout/jquery.layout-latest.min.js"></script>
<script src="${ctxJs}/topology/ui/navmenu/jquery.navmenu.min.js"></script>
<script src="${ctxJs}/topology/ui/contextmenu/jquery.contextmenu.min.js"></script>
<script src="${ctxJs}/topology/ui/contextmenu/jquery.ctxadapter.min.js"></script>
<script src="${ctxJs}/topology/ui/mousewheel/jquery.mousewheel.min.js"></script>
<script src="${ctxJs}/topology/ui/resize/jquery.ba-resize.min.js"></script>

<script src="${ctxJs}/plugins/dataTables/js/jquery.dataTables.js"></script>
<script src="${ctxJs}/plugins/dataTables/js/ColReorderWithResize.js"></script>

<script src="${ctxJs}/topology/ui/d3layout/d3forlayout.min.js"></script>
<script src="${ctxJs}/topology/ui/d3layout/layouttree.min.js"></script>
<script src="${ctxJs}/topology/ui/jscounter/jscounter.min.js"></script>
<script src="${ctxJs}/topology/ui/percentbar/jquery.percentbar.min.js"></script>
<!-- config -->
<script src="${ctxJs}/topology/config/config.js"></script>
<script src="${ctxJs}/topology/config/config.event.js"></script>
<script src="${ctxJs}/topology/config/config.objectClass.js"></script>
<script src="${ctxJs}/topology/config/config.graph.js"></script>
<script src="${ctxJs}/topology/config/config.kpi.js"></script>
<script src="${ctxJs}/topology/config/config.context.js"></script>
<script src="${ctxJs}/topology/config/config.convertor.js"></script>
<script src="${ctxJs}/topology/config/config.plugin.js"></script>
<!-- main -->
<script src="${ctxJs}/topology/topology.min.js"></script>
<script src="${ctxJs}/topology/show.js"></script>
<!-- tooltip -->
<script src="${ctxJs}/topology/ui/tooltip/jquery.tooltip.min.js"></script>
<script src="${ctxJs}/topology/ui/tooltip/jquery.adapter4perf.js"></script>
<script src="${ctxJs}/topology/ui/tooltip/jquery.adapter4hang.js"></script>
<script type="text/javascript">
topoData.resourceNodes = [];

// 启动初始化
$(document).ready(function() {
	getjson(curTopoId, init)
	function getjson(id, _callback) {
		$.ajax({
			type : "get",
			timeout : 60000, //超时时间设置，单位毫秒
			url : ctx + "/network/loadTopology.do?topoId="+id+"&tmp="+new Date().getTime(),
			dataType : "json",
			success : function(msg) {
				var _veiwContent = msg.topo.viewContent;
				var _id = msg.topo.id;
				topoData.view = eval("[{" + _id + ":" + _veiwContent + "}]")[0];
				var veiwContent = eval("[" + _veiwContent + "]")[0]
				console.log(topoData.view )
				topoData.views = [ veiwContent.view ];
				topoData.queryParams = eval({ type : "1", id : _id, topoType:msg.topo.topoType });
				_callback()
			}
		});
	}
})
</script>