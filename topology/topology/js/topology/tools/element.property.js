var selectNodeObj = $.topology.contextObj;
var clickedChoose = {};

$('#property').validate({
	rules : {},
	messages : {}
});

$("input[name='name']").val(selectNodeObj.name)

if (selectNodeObj.dbclickType == "url") {
	$("input[name='url']").val(selectNodeObj.dbclickRes)
} else {
	$("input[radioRelaHidden='" + selectNodeObj.dbclickType + "']").val(selectNodeObj.dbclickRes)
}
if(selectNodeObj.relaType){
	$("[name='relaType']").val(selectNodeObj.relaType)
}

if (selectNodeObj.style.icon && selectNodeObj.style.icon != "undefined") {
	var $nodeImg = $("<div/>").append($("<img/>").attr({
		src : ctxImg + "/topology/icon_svg/" + selectNodeObj.style.icon,
		width : 48,
		height : 48
	}));
	$(".iconSpan").attr("iconPath", selectNodeObj.style.icon).html($nodeImg)
	initIconPicker($(".iconSpan"));
}

initEditRale('status', 'statusRela', "isRelaRes")
initEditRale('dbclickType', 'dbclickType', "isDbclick")

function initEditRale(relaName, selectNodeProp, relaInput) {// dbclickType
	$("input[name='" + relaName + "']").change(function() {
		enableRelaInput($(this).val(), relaInput)
	})
	if (selectNodeObj[selectNodeProp] && "" != selectNodeObj[selectNodeProp] && "undefined" != selectNodeObj[selectNodeProp]) {
		$("input[name='" + relaName + "']").each(function() {
			if ($(this).val() == selectNodeObj[selectNodeProp]) {
				$(this).prop("checked", "checked");
			} else {
				$(this).removeAttr("checked")
			}
		})
	}

}

function enableRelaInput(radioRela, relaFlag) {
	if ($("input[name='" + relaFlag + "']").prop("checked")) {
		$("[relaFlag='" + relaFlag + "'][radioRela]").each(function() {
			if ($(this).attr("radioRela") == radioRela) {
				$(this).removeAttr("disabled")
				if($(this).attr("radioRela")=="resource"&&$(this).val()==""&&selectNodeObj.objectType=="auto"){
					$(this).val(selectNodeObj.name);
					$("input[name='" + $(this).attr("forHidden") + "']").val(selectNodeObj.instanceId);
				}
			} else {
				$(this).prop("disabled", "disabled");
			}
		})
	} else {
		$("[relaFlag='" + relaFlag + "'][radioRela]").each(function() {
			$(this).prop("disabled", "disabled");
		})
	}
}

function enableRelaTable(name) {
	if ($("input[name='" + name + "']").prop("checked")) {
		$("[relaFlag='" + name + "']").each(function() {
			$(this).removeAttr("disabled")
			$(this).rules('add', { required: true});
		})
	} else {
		$("[relaFlag='" + name + "']").each(function() {
			$(this).prop("disabled", "disabled");
			$(this).rules('remove', "required");
		})
	}
}

$("input[name='isRelaRes']").change(function() {
	enableRelaTable('isRelaRes')
	enableRelaInput($("input[name='status']:checked").val(), "isRelaRes")
})


if (selectNodeObj.isRelaRes == "true") {
	$("input[name='isRelaRes']").prop("checked", "checked")
	enableRelaTable('isRelaRes')
	enableRelaInput(selectNodeObj.statusRela, "isRelaRes")
}

$("input[name='isDbclick']").change(function() {
	enableRelaTable('isDbclick')
	enableRelaInput($("input[name='dbclickType']:checked").val(), "isDbclick")
})

if (selectNodeObj.isDbclick == "true") {
	$("input[name='isDbclick']").prop("checked", "checked")
	enableRelaTable('isDbclick')
	enableRelaInput(selectNodeObj.dbclickType, "isDbclick")
}

$("[relaFlag='isRelaRes'][name='relaType']").change(function() {
	$("input[name='instanceId']").val("")
	$("input[name='instanceName']").val("")
	$("input[name='status']:first").prop("checked", "checked");
	$("input[name='metricName']").val("")
	$("input[name='metricId']").val("")
})

$(".chooseRes").bind("click", function() {
	loadingwindow(ctx, 200, 50, '加载中...')
	var relaType = $("[relaFlag='"+$(this).attr("relaFlag")+"'][name='relaType']").val();
	clickedChoose.forSelect = $(this).attr("forSelect");
	clickedChoose.forHidden = $(this).attr("forHidden");
	clickedChoose.instanceId = $("input[name='" + clickedChoose.forHidden + "']").val();
	clickedChoose.name = $(this).attr("name");
	var urlStr = ctx + "/network/topology/resourceList.do";
	var title = "选择资源";
	$.ajax({
		type : "get",
		url : urlStr,
		timeout : 60000, //超时时间设置，单位毫秒
		dataType : "html",
		success : function(content) {
			closeLodingWindow();
			openwindow(title, 680, 637, content, function() {
				if(relaType=="child"){
					loadingwindow(ctx, 200, 50, '加载中...')
					var urlStr = ctx + "/network/topology/loadChildrenType.do?instanceId="+tempId;
					var title = "选择组件";
					$.ajax({
						type : "get",
						url : urlStr,
						timeout : 60000, //超时时间设置，单位毫秒
						dataType : "html",
						success : function(content) {
							closeLodingWindow();
							openwindow(title, 400, 537, content, function() {
								var $child=$("input[name='resourceChildSelected']:checked");
								if ($child.length==0) {
									layer.msg("请选择组件",{icon:0});
									return;
								}
								var childId = $child.val();
								var childName = $child.attr("resName");
								$("input[name='" + clickedChoose.name + "']").val(tempName+"-"+childName);
								$("input[name='" + clickedChoose.forHidden + "']").val(childId);
								closeWindow();
								closeWindow();
							}, function() {
								closeWindow();
							})
						},
						error : function() {
							closeLodingWindow();
							layer.msg("系统异常，请联系管理员",{icon:0});
						}
					})
				}else{
					if (tempId == "") {
						layer.msg("请选择资源",{icon:0});
						return;
					}
					$("input[name='" + clickedChoose.name + "']").val(tempName);
					$("input[name='" + clickedChoose.forHidden + "']").val(tempId);

					tempId = "";
					tempName = "";

					clickedChoose = {}
					closeWindow();
				}

				$("input[name='status']:first").prop("checked", "checked");
				$("input[name='metricName']").val("")
				$("input[name='metricId']").val("")
			}, function() {
				closeWindow();
			})
		},
		error : function() {
			closeLodingWindow();
			layer.msg("系统异常，请联系管理员",{icon:0});
		}
	})
});


$(".chooseTopo").bind("click", function() {
	loadingwindow(ctx, 200, 50, '加载中...')
	var urlStr = ctx + "/network/topology/loadTopoTree.do";
	var title = "选择拓扑";
	$.ajax({
		type : "get",
		url : urlStr,
		timeout : 60000, //超时时间设置，单位毫秒
		dataType : "html",
		success : function(content) {
			closeLodingWindow();
			openwindow(title, 400, 537, content, function() {
				if ($("input[name='selectedTopoId']").val()=="") {
					layer.msg("请选择拓扑",{icon:0});
					return;
				}
				$("input[name='dbtopoId']").val($("input[name='selectedTopoId']").val())
				$("input[name='dbtopo']").val($("input[name='selectedTopoName']").val())
				closeWindow();
			}, function() {
				closeWindow();
			})
		},
		error : function() {
			closeLodingWindow();
			layer.msg("系统异常，请联系管理员",{icon:0});
		}
	})
})

$(".chooseResMetric").bind("click", function() {
	if($("input[name='instanceId']").val()==""){
		layer.msg("请先选择资源",{icon:0});
		return;
	}
	loadingwindow(ctx, 200, 50, '加载中...')
	var urlStr = ctx + "/network/topology/loadMetrics.do?instanceId="+$("input[name='instanceId']").val();
	var title = "选择指标";
	$.ajax({
		type : "get",
		url : urlStr,
		timeout : 60000, //超时时间设置，单位毫秒
		dataType : "html",
		success : function(content) {
			closeLodingWindow();
			openwindow(title, 400, 537, content, function() {
				var $metric=$("input[name='metricIdSelected']:checked");
				if ($metric.length==0) {
					layer.msg("请选择指标",{icon:0});
					return;
				}
				$("input[name='metricId']").val($metric.val())
				$("input[name='metricName']").val($metric.attr("metricName"))
				closeWindow();
			}, function() {
				closeWindow();
			})
		},
		error : function() {
			closeLodingWindow();
			layer.msg("系统异常，请联系管理员",{icon:0});
		}
	})
})