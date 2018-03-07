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
<link href="${ctxCss}/layout/inpage.css" rel="stylesheet" type="text/css">
</head>

<body style="text-align:center">
<form id="telnet">
	<input type="hidden" id="unicode" value=gbk />
	<table class="pfwindowforms">
		<tr>
			<td><span class="pflabel">目标地址</span><span class="pfred">*</span></td>
			<td><input type="text" id="hostname" class="pfinput required isIp" value="${ip}" style="width:160px"/></td>
			<td><span class="pflabel">端口</span><span class="pfred">*</span></td>
			<td><input type="text" id="portnumber" class="pfinput required needNum isPort" value="23" style="width:50px"/></td>
			<td><span id="connect" class="wbtn wblue">连接</span><span id="disconnect" class="wbtn wgray" style="display:none">断开</span></td>
		</tr>
		<tr>
			<td><span class="pflabel">命令</span><span class="pfred">*</span></td>
			<td colspan="4"><input type="text" id="command" class="pfinput"  disabled="disabled"/></td>
		</tr>
	</table>
</form>

<div id="term" style="width:100%;"></div>
<script type='text/javascript'>

	$('#telnet').validate( {
	   	rules : {},
		messages: {}
	});
	var term;
   	function openTerminal(options) {
   		$('#term').html("");
		term= new Terminal(80, 24, function(key) {});
        term.open();
        $('.terminal').detach().appendTo('#term');
        term.resize(80, 24);
    }

   	function NetToolsDisconnect(){
		$.ajax({
			type : "get",
			timeout : 60000, //超时时间设置，单位毫秒
			url : "${ctx}/network/topology/telnetDisconnect.do",
			dataType : "json",
			success : function(msg) {
	            term.write("\n"+"exit"+"\n");
	    		closeWindow();
			},
			error : function(msg){
	    		closeWindow();
			}
		});
   	}

    $(document).ready(function() {
    	$("#disconnect").bind("click", function(){
    		$("#connect").show();
    		$("#disconnect").hide();
    		$.ajax({
    			type : "get",
    			url : "${ctx}/network/topology/telnetDisconnect.do",
    			dataType : "json",
    			success : function(msg) {
    	            $("#command").attr("disabled","disabled");
    	            term.write("\n"+"exit"+"\n");
    			}
    		});
    	})

    	$("#command").keyup(function(){
	        if(event.keyCode == 13){
                $("#command").prop('disabled',true);
	        	sendCommand();
	        }
	    });

    	$("#connect").bind("click", function(){
    		if(($(".error")).length > 0){
    			return;
    		}
    		if(!$('#telnet').valid()){
    			return;
    		}
            var hostname = $('input:text#hostname');
            var portnumber = $('input:text#portnumber');
            var port = parseInt(portnumber.val())
            openTerminal();
            term.write($("#command").val()+"\n");
            term.write('Connecting...'+"\n");
    		$.ajax({
    			type : "get",
    			timeout : 60000, //超时时间设置，单位毫秒
    			url : "${ctx}/network/topology/telnetConnect.do?ip="+hostname.val()+"&port="+port,
    			dataType : "json",
    			success : function(msg) {
    				var result = msg.result;
    	            term.write(result);
   		    		$("#disconnect").show();
   		    		$("#connect").hide();
       	            $("#command").removeAttr("disabled")
       	            $("#command").val("")
       	            $("#command").focus();
    			}
    		});
    	})

    	function sendCommand(){
    		$.ajax({
    			type : "get",
    			timeout : 60000, //超时时间设置，单位毫秒
    			url : "${ctx}/network/topology/telnetSendCommand.do?command="+$("#command").val(),
    			dataType : "json",
    			success : function(msg) {
    	            $("#command").prop('disabled',false).val("").focus();
    	            term.write(msg.result);
    			},
                error:function(){
                    $("#command").prop('disabled',false).focus();
                }
    		});
    	}
    });

</script>
</body>
</html>