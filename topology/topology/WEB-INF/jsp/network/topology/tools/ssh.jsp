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

<body style="text-align:center">
<form id="ssh">
	<input type="hidden" id="unicode" value=gbk />
	<table class="pfwindowform">
		<tr>
			<td style="width:80px;"><span class="pflabel">目标地址</span><span class="pfred">*</span></td>
			<td><input type="text" id="hostname" class="pfinput required isIp" value="${ip}" style="width:90px"/></td>
			<td style="width:80px;"><span class="pflabel">端口</span><span class="pfred">*</span></td>
			<td><input type="text" id="portnumber" class="pfinput required needNum isPort" value="22" style="width:40px"/></td>
			<td></td>
		</tr>
		<tr>
			<td><span class="pflabel">用户名</span><span class="pfred">*</span></td>
			<td><input type="text" id="username" class="pfinput required canotChinese" value="" style="width:90px" maxlength="50"/></td>
			<td><span class="pflabel">密码</span><span class="pfred">*</span></td>
			<td><input type="password" id="password" class="pfinput required" value="" style="width:90px"
				onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/></td>
			<td><span id="connect" class="wbtn wblue">连接</span><span id="disconnect" class="wbtn wgray" style="display:none">断开</span></td>
		</tr>
		<tr>
			<td><span class="pflabel">命令</span><span class="pfred">*</span></td>
			<td colspan="4"><input type="text" id="command" class="pfinput"  disabled="disabled"/></td>
		</tr>
	</table>
</form>
<div id="term" style="margin-left:5px;margin-right:5px"></div>
<script type='text/javascript'>
	$('#ssh').validate( {
	   	rules : {},
		messages: {}
	});
	var term;
   	function openTerminal(options) {
   		$('#term').html("");
		term= new Terminal(80, 24, function(key) {});
        term.open();
        $('.terminal').detach().appendTo('#term');
        $('.terminal').resize(80, 24)
    }

   	function NetToolsDisconnect(){
		$.ajax({
			type : "get",
			timeout : 60000, //超时时间设置，单位毫秒
			url : "${ctx}/network/topology/sshDisconnect.do",
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
    			timeout : 60000, //超时时间设置，单位毫秒
    			url : "${ctx}/network/topology/sshDisconnect.do",
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
    		if(!$('#ssh').valid()){
    			return;
    		}
            var username = $('input:text#username');
            var hostname = $('input:text#hostname');
            var portnumber = $('input:text#portnumber');
            var port = parseInt(portnumber.val())
            var password = $('input:password#password');
            openTerminal();
            term.write('Connecting...'+"\n");
    		$.ajax({
    			type : "get",
    			timeout : 60000, //超时时间设置，单位毫秒
    			url : "${ctx}/network/topology/sshConnect.do?ip="+hostname.val()+"&port="+port+"&username="+username.val()+"&password="+password.val(),
    			dataType : "json",
    			success : function(msg) {
    				var result = msg.result;
    	            term.write(result);

		    		$("#connect").hide();
		    		$("#disconnect").show();
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
    			url : "${ctx}/network/topology/sshSendCommand.do?command="+$("#command").val(),
    			dataType : "json",
    			success : function(msg) {
                    if( !(msg.result) ){
                        $("#command").prop('disabled',false).focus();
        	            layer.msg('连接失败，请重新连接！',{icon:2});
                    }else{
                        $("#command").prop('disabled',false).val("").focus();
                        term.write(msg.result);
                    }
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