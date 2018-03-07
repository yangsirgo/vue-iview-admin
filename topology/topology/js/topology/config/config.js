/**
 * 配置项
 */
topoData.config = {
	global : {
		"event_animate" : "3,4,5",//支持动画的告警级别
		"kpi_cache_time" : "300",
		"reload_time" : "300",
		"auto_view_status" : "1",
		"popup_window" : "0",
		"resource_alter_valid" : "5",
		"server_run_test" : "1"
	},
	event4symbol : [],
	event4line : [],
	objectClass : {},
	contextmenu4show : {},
	convertor : {},
	plugin : {},
	context : {},
	kpi : {},
	graph : {},
	icon : [],
	help : {}
}
/**
 * 预定义页面
 */
var testPanelHtml = {
	"layout_force.html": '<table class="pfwindowform" id="forceLayout-setting" style="width:auto;"><tbody><tr><td ><span class="pflabel">连线长度</span></td><td class="value-field"><input type="text" id="forceLayout-linkDistance"></td></tr><tr><td><span class="pflabel">间距斥力</td><td class="value-field"><input type="text" id="forceLayout-charge"></td></tr><tr class="submit_block"><td align="center" class="operate" style="padding-top: 20px;" colspan="3"><input id="forceLayout-friction" type="hidden"><input id="forceLayout-linkStrength" type="hidden"><input id="forceLayout-gravity" type="hidden"><input id="forceLayout-theta" type="hidden"></td></tr></tbody></table><div class="openwindowbtns"><div class="cancelbtn" id="forceLayout-cancel" style="float: right; margin-top: 12px; margin-right: 30px;">取消</div><div class="cancelbtn" id="forceLayout-reset" style="float: right; margin-top: 12px; margin-right: 10px;">重置</div><div class="enturebtn" id="forceLayout-submit" style="float: right; margin-top: 12px; margin-right: 10px;">确认</div></div>',
	"layout_tree.html": '<table class="pfwindowform" id="treeLayout-setting" style="width:auto;"><tbody><tr><td><span class="pflabel">层间距</span></td><td class="value-field"><input type="text" id="treeLayout-levelDistance"></td></tr><tr><td><span class="pflabel">节点间距</span></td><td class="value-field"><input type="text" id="treeLayout-siblingDistance"></td></tr><tr><td><span class="pflabel">子树间距</span></td><td class="value-field"><input type="text" id="treeLayout-subtreeDistance"></td></tr></tbody></table><input id="treeLayout-orientation" type="hidden" value="0"/><div class="openwindowbtns"><div class="cancelbtn" id="treeLayout-cancel" style="float: right; margin-top: 12px; margin-right: 12px;">取消</div><div class="cancelbtn" id="treeLayout-reset" style="float: right; margin-top: 12px; margin-right: 10px;">重置</div><div class="enturebtn" id="treeLayout-submit" style="float: right; margin-top: 12px; margin-right: 10px;">确认</div></div>'
};