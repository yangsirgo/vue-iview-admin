<!-- topology/view.jsp -->
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>

<script src="${ctxJs}/jquery-1.11.0.min.js"></script>
<script src="${ctxJs}/plugins/zTree/js/jquery.ztree.core-3.5.js" type="text/javascript"></script>
<script src="${ctxJs}/plugins/zTree/js/jquery.ztree.excheck-3.5.js" type="text/javascript"></script>
<script src="${ctxJs}/plugins/zTree/js/jquery.ztree.exedit-3.5.js" type="text/javascript"></script>

<script src="${ctxJs}/topology/tools/window.ext.js"></script>
<script src="${ctxJs}/window.js"></script>

<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/layout/complex.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/jqueryui/gray.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/topology.css" />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/main.css"/>

<link rel="stylesheet" type="text/css" href="${ctxCss}/face/blue.css"/>

<div id="topoMain"></div>

<script type="text/javascript">
var userid='${userid}';
var displayrule='${displayrule}';
//loadingwindow(ctx, 200, 50, '加载中...')
var curUserId = "${userId}";
var curTopoLevel = 0;
var partConfig = JSON.parse('${partConfig}');//子拓朴配置
var pConfig = JSON.parse('${pConfig}');
partConfig.sort(function(a,b){
	return a.id-b.id
})
// 启动初始化
$(function(){
	var prepConfigTopo;

	function prepMenuList(addflag, delflag){
		var memulist = [{
			"id" : "add",
			"txt" : "新建子拓扑",
			"icon" : "icon_add",
			"enable": true,
			"display": addflag,
			"callback" : function() {
				openAddWindow(prepConfigTopo.id, "新建子拓扑", 480, 240)
				gradparemove();
			}
		}, {
			"id" : "edit",
			"txt" : "重命名",
			"icon" : "icon_pencil",
			"enable": true,
			"display": true,
			"callback" : function() {
				openEditWindow(prepConfigTopo.id, "拓扑重命名", 480, 240);
				gradparemove();
			}
		}, {
			"id" : "delete",
			"txt" : "删除",
			"icon" : "icon_delete",
			"enable": true,
			"display": delflag,
			"callback" : function() {
				deleteTopo(prepConfigTopo.id);
				gradparemove();
			}
		}, {
			"id" : "setHome",
			"txt" : "设为首页",
			"icon" : "icon_home",
			"enable": true,
			"display": true,
			"callback" : function() {
				setHomeTopo(prepConfigTopo.id)
				gradparemove();
			}
		}];
		return memulist;
	}

	function openAddWindow(parentId, name, width, height){
		var urlStr = ctx+"/network/topology/addTopologyInfo.do?parentId="+parentId;
		var title = name;
		$.ajax({
			type : "get",
			url : urlStr,
			timeout : 60000, //超时时间设置，单位毫秒
			dataType : "html",
			success : function(content) {
				openwindow(title, width, height, content, function(){
					if(!$('#topoInfo').valid()){
						return;
					}
					addTopo();
					closeWindow();
				})
			},
			error: function (){
				layer.msg("系统异常，请联系管理员",{icon:0});
			}
		})
	}

	function openEditWindow(id, name, width, height){
		var urlStr = ctx+"/network/topology/editTopologyInfo.do?id="+id;
		var title = name;
		$.ajax({
			type : "get",
			timeout : 60000, //超时时间设置，单位毫秒
			url : urlStr,
			dataType : "html",
			success : function(content) {
				openwindow(title, width, height, content, function(){
					if(!$('#topoInfo').valid()){
						return;
					}
					addTopo();
					closeWindow();
				})
			},
			error: function (){
				layer.msg("系统异常，请联系管理员",{icon:0});
			}
		})
	}

	function deleteTopo(id){
		openquestionwindow("确认删除", "确认删除当前拓扑及其子拓扑", function(){
			$.ajax({
				type : "POST",
				timeout : 60000, //超时时间设置，单位毫秒
				url : ctx + "/network/topology/deleteTopo.do?topoId="+id+"&${_csrf.parameterName}=${_csrf.token}",
				dataType : "json",
				success : function(msg) {
					layer.msg("拓扑删除成功！",{icon:1});
					window.location.href="${ctx}/network/topology.do";
				},
				error: function (){
					layer.msg("系统异常，请联系管理员",{icon:0});
				}
			});
			closeWindow();
		});
	}

	function setHomeTopo(id){
		openquestionwindow("设为首页", "访问网络拓扑优先显示当前拓扑", function(){
			$.ajax({
				type : "POST",
				timeout : 60000, //超时时间设置，单位毫秒
				url : ctx + "/network/topology/setHomeTopo.do?topoId="+id+"&${_csrf.parameterName}=${_csrf.token}",
				dataType : "json",
				success : function(msg) {
					layer.msg("设为首页成功！",{icon:1});
				},
				error: function (){
					layer.msg("系统异常，请联系管理员",{icon:0});
				}
			});
			closeWindow();
		});
	}

	function addTopo(){
		var parentId = $("input[name='parentId']").val();
		var topoType = $("input[name='topoType']").val();
		var id = $("input[name='id']").val();
		var name = $("input[name='name']").val();
		var description = $("input[name='description']").val();
		$.ajax({
			type : "POST",
			timeout : 60000, //超时时间设置，单位毫秒
			url : ctx + "/network/saveTopoInfo.do?&${_csrf.parameterName}=${_csrf.token}&parentId="+parentId
					+"&name="+name+"&description="+description+"&topoType="+topoType+"&id="+id,
			dataType : "json",
			success : function(msg) {
				window.location.href="${ctx}/network/topology.do?topoId="+msg.topo.id;
			},
			error: function (){
				layer.msg("系统异常，请联系管理员",{icon:0});
			}
		});
	}

	var curTopoId="${topoId}";

	function addDiyDom(treeId, treeNode){
		if(curTopoId==treeNode.id){
			curTopoLevel = treeNode.level;
		}
		if (treeNode.parentNode && treeNode.parentNode.id!=1) return;
		var aObj = $("#" + treeNode.tId + "_a");
		if(treeNode.hasPermission){
			var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'><span class='add'></span></span>";
			aObj.append(editStr);
			var btn = $("#diyBtn_"+treeNode.id+" .add");
			if (btn) btn.bind("click", function(){
				if(treeNode.level<4){
					if(treeNode.id==1){
						addtooltip($(this), prepMenuList(true, false), "downlist");
					}else{
						addtooltip($(this), prepMenuList(true, true), "downlist");
					}
				}else{
					addtooltip($(this), prepMenuList(false, true), "downlist");
				}
				prepConfigTopo = treeNode;
				event.stopPropagation();
			});
		}
	}

	$("#addTopo").bind("click", function(){
		openAddWindow(-1, "新建拓扑", 480, 240)
	})

	var topoTreeSetting = {
			view : {
				dblClickExpand : false,
				showIcon : false,
				addDiyDom: addDiyDom
			},
			data : {
				simpleData : {
					enable : true
				}
			},
			callback : {
				onClick : function(e, treeId, treeNode){
					console.log(treeNode);
					if(treeNode.hasPermission){
						window.location.href="${ctx}/network/topology.do?topoId="+treeNode.id;
					}else{
						layer.msg("没有拓扑【"+treeNode.title+"】访问权限",{icon:0});
					}
				}
			}
		};
	var topoTreeNodes = ${topolist};
	var topoMainTree = $.fn.zTree.init($("#topologyTree"), topoTreeSetting, topoTreeNodes);
	topoMainTree.expandAll(true);

	$("#topoMain").load("${ctx}/network/loadTopo.do?topoId=${topoId}",function(responseTxt,statusTxt,xhr){});

	$("#curTopoName").html("${topoName}");
	$(".btnselectorlist1titlename").html("拓扑列表");
	$(".two_layers").show();

	var selectbluebtn1 = $(".selectbluebtn1");
/*
    selectbluebtn1.mouseenter(function(e){
	    $(this).addClass("bluebtnon");
		$(this).find(".btnselector1").show();
	});
	*/
	$("#curTopoName").mouseover(function(e){
		$("#btnselector1").show();
	});


	selectbluebtn1.mouseleave(function(){
	    $(document).mousemove(function(e){
		    var pointX = e.pageX;
	        var pointY = e.pageY;

		    if( pointX > 388 || pointX < 61 || pointY > 474  ){
				//selectbluebtn1.removeClass("bluebtnon");
		    	$("#btnselector1").hide();
			}
	 	});
	});

	/*
	selectbluebtn1.hover(function() {
		$(this).addClass("bluebtnon");
		$(this).find(".btnselector2").show();
	}, function() {
		$(this).removeClass("bluebtnon");
		$(this).find(".btnselector2").hide();
	});
	*/
})
</script>