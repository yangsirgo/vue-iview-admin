<!-- topology/telent.jsp -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>

<html>
<head>
<script src="${ctxJs}/topology/tools/term.js"></script>
<link href="${ctxCss}/topology/tools/terminal.css" rel="stylesheet" />
<script src="${ctxJs}/layout/inpage.js" type="text/javascript"></script>
<link href="${ctxCss}/layout/inpage.css" rel="stylesheet" type="text/css"/>
</head>

<body>
<form id="ping">
	<input type="hidden" id="unicode" value=gbk />
	<table class="pfwindowform">
		<tr>
			<td class="titlename"><span class="pflabel">目标地址</span><span class="pfred">*</span></td>
			<td class="titlecont">
				<input type="text" id="hostname" class="pfinput required isIp" value="${ip}" style="width:130px"/>
			</td>
			<td class="titlename"><span class="pflabel">发包数</span><span class="pfred">*</span></td>
			<td class="titlecont">
				<input type="text" id="packageNum" class="pfinput required isPositiveNum" value="4" style="width:120px"/>
			</td>
		</tr>
		<tr>
			<td class="titlename"><span class="pflabel">超时</span><span class="pfred">*</span></td>
			<td class="titlecont posirela"><input type="text" id="timeout" class="pfinput required isPositiveNum" value="1000" style="width:85px" />ms</td>
			<td class="titlename"><span class="pflabel">包长度</span><span class="pfred">*</span></td>
			<td class="titlecont posirela"><input type="text" id="packageSize" class="pfinput required isPositiveNum" value="64" style="width:70px" />bytes</td>
			<td><button type="button" id="connect" class="wbtn wblue">Ping</button></td>
		</tr>
	</table>
</form>

<div id="term" style="margin-left:5px;margin-right:5px"></div>

<script type='text/javascript'>

	$('#ping').validate( {
	   	rules : {},
		messages: {}
	});
	var term;
   	function openTerminal(options) {
   		$('#term').html("");
		term= new Terminal(80, 24, function(key) { });
        term.open();
        $('.terminal').detach().appendTo('#term');
    }

    $(document).ready(function() {
    	$("#connect").bind("click", function(){
    		if(!$('#ping').valid()){
    			return;
    		}
            var packageNum = $('input:text#packageNum');
            var hostname = $('input:text#hostname');
            var timeout = $('input:text#timeout');
            var packageSize = $('input:text#packageSize');
            var unicode = $('input:hidden#unicode');
    		console.log($("#command").val())
            openTerminal();
            term.write("Ping "+hostname.val()+"...");
    		$.ajax({
    			type : "get",
    			url : "${ctx}/network/topology/pingResult.do?ip="+hostname.val()+"&timeout="
    					+timeout.val()+"&packageNum="+packageNum.val()+"&packageSize="+packageSize.val()
    					+"&unicode="+unicode.val(),
    			dataType : "json",
    			success : function(msg) {
    				var result = msg.result;
    	            term.write(result);
    			}
    		});
    	})
    });

</script>
</body>
</html>