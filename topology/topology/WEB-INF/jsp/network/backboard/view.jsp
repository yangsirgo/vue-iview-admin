<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<script src="${ctxJs}/plugins/dataTables/js/jquery.dataTables.js"></script>
<script src="${ctxJs}/plugins/dataTables/js/ColReorderWithResize.js"></script>
<script type="text/javascript" src="${ctxJs}/topology/backboard/utils.js"></script>
<script type="text/javascript" src="${ctxJs}/topology/backboard/backboard-view.js"></script>
<script type="text/javascript" src="${ctxJs}/topology/backboard/backcanvas/element/backboard-dev-img.js"></script>
<script type="text/javascript" src="${ctxJs}/topology/backboard/backcanvas/element/backboard-port.js"></script>

<link rel="stylesheet" type="text/css" href="${ctxCss}/icons/ports.css"  />
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/backboard/backboard.css"/>
<link rel="stylesheet" type="text/css" href="${ctxCss}/dataTables/dataTablesgray.css"/>
<div id="backboard_main" class="fntclr">
    <div class="backboard_info"></div>
    <!-- v3隐藏写共同体名 -->
    <input type="hidden" name="snmptype" id="snmptype" value=""/>
    <div class="backboard_status" style="display: none">
        <div style="float: right">
            <li class="port port_online" id="online"><span>在线：(0)</span></li>
            <li class="port port_underline" id="offline"><span>离线：(0)</span></li>
            <li class="port port_close" id="unkown"><span>关闭：(0)</span></li>
        </div>
    </div>
    <div class="backboard_canvas" style="width: 1000px; min-height: 50px; overflow-y: auto; margin: 0 auto;">
        <!-- 这里有动态设置高度 请参考pageTopoSize函数  -->
        <canvas id="veiw_backboard_canvas"></canvas>
    </div>
</div>

<div class="showrightmess" style="display: none;">
    <ul>
        <li class="switchport">端口开关</li>
        <li class="detailport">端口详情</li>
    </ul>
</div>
<input type="hidden" id="hidcanvasxx" value="">
<input type="hidden" id="hidcanvasyy" value="">
<input type="hidden" id="hidip" value="">
<input type="hidden" id="hiddevip" value="">
<script type="text/javascript">
var ctx = "${ctx}";
var ctximg = "${ctxImg}";
var csrfValue="${_csrf.token}";
var changeWrFlag=0;
var getBackInfoByDevId = ctx+"/network/backboard/json.do";
var devport = ctx+"/network/backboard/portInfo.do";
var deviceip = "<%=request.getParameter("ip") %>";
$(function(){
    var instanceId = "<%=request.getParameter("instanceId") %>";
    var systemOid = "<%=request.getParameter("systemOid") %>";
    /* $("#rescommonwrname").hide() */
    backboard.getBackInfoById(instanceId, systemOid, deviceip);
    /* $('#rescommonwrname').validate( {//弹出后绑定校验
        rules : {
            wrname:{
                notAllSpace:true,
                fiftyChar:true,
            },
        },
        messages: {
            wrname : {
                required:"写共同体名不能为空",
            },
        }
    }); */
    /* $("#wrsave").bind("click",function(){
        saveInsWrCommon();
    }); */
    document.onkeydown = function(e){//回车处理
        if(!e) {
            e = window.event;
        }
        if((e.keyCode || e.which) == 13){
            return false;
        }
    }
});
</script>