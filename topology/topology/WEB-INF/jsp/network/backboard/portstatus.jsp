<!-- nacpadd.jsp -->
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<link href="${ctxCss}/layout/inpage.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="${ctxCss}/topology/backboard/backboard.css"/>
<div>
    <input type="hidden" value="${value}" id="value">
    <input type="hidden" value="${indexid}" id="indexid">
    <input type="hidden" value="${instanceId}" id="instanceId">
    <div id="divtotal">
        <div id="divmsg"><span class="text-inright">网卡ID号:</span> ${indexid} </div>
        <c:if test="${version != 'v3'}">
           <div style="margin-top: 20;"><span class="text-inright">写共同体名:</span> <input type="password" name="wrname" id="wrname" value=""/></div>
        </c:if>
        <div id="divswitch">
            <span class="text-inright">开关状态:</span>
            <div id ="divcheckbox" class=" center" style ="margin-left: 80;">
                <input type="checkbox" id="switch" onclick="" style="display:none;"/>
                <label for="switch" class="switch-label">
                      <span class="offoron">
                           off
                    </span>
                </label>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function(){
        if(!$('#switch').is(':checked') && $('#value').val() == 1){
           $('#switch').click();
        }
        if($('#switch').is(':checked') && $('#value').val() != 1){
            $('#switch').click();
        }
    });
    // $('#divtotal').mousemove(function (e) {
    //     var xx = e.originalEvent.x || e.originalEvent.layerX || 0;
    //     var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
    //     $(this).text(xx + '---' + yy);
    //     //var d = document.getElementById("div");获取某div在当前窗口的位置
    //     //var dx = xx - p.getBoundingClientRect().left;
    //     //var dy = yy - p.getBoundingClientRect().top;
    //     //$(this).text(dx + '---' + dy);鼠标在该div内位置
    // });
</script>