<!-- topology/telent.jsp -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>

<html>
<head>
<script src="${ctxJs}/layout/inpage.js" type="text/javascript"></script>
<link href="${ctxCss}/layout/inpage.css" rel="stylesheet" type="text/css"/>
</head>

<body>
	<form id="snmp">
		<table class="pfwindowform">
			<tbody>
				<tr>
					<td style="width: 100px;"><span class="pflabel">IP地址</span><span class="pfred">*</span></td>
					<td><input type="text" name="ip" value="${ip}" class="pfinput required isIp" style="width: 150px"/></td>
					<td><span class="pflabel">端口</span><span class="pfred">*</span></td>
					<td><input type="text" name="port" value="161"  class="pfinput required needNum isPort" style="width: 100px"/></td>
				</tr>
			</tbody>
		</table>
		<div class="inboxtitle" style="margin-top: 2px">
			SNMP设置 
		</div>
		<div class="inboxcontent">
			<table class="pfwindowform">
				<tbody>
					<tr>
						<td><span class="pflabel">SNMP</span></td>
						<td><input type="radio" name="version" value="0" checked="checked"/>v1 
							<input type="radio" name="version" value="1"/>v2c 
							<input type="radio" name="version" value="2"/>v3
						</td>
					</tr>
					<tr version="2c">
						<td><span class="pflabel">共同体名</span><span class="pfred">*</span></td>
						<td><input type="text" name="community" class="pfinput required canotChinese" style="width: 220px" value="public" version="2c" maxlength="50"/></td>
					</tr>
					<tr>
						<td><span class="pflabel">等待时间</span><span class="pfred">*</span></td>
						<td><input type="text" name="timeout" class="pfinput required isPositiveNum" style="width: 160px" value="300"/>ms</td>
						<td><span class="pflabel">重试次数</span><span class="pfred">*</span></td>
						<td><input type="text" name="retry" class="pfinput required isPositiveNum" style="width: 90px" value="3"/></td>
					</tr>
					<tr version="3" style='display:none'>
						<td><span class="pflabel">安全级别</span><span class="pfred">*</span></td>
						<td>
							<select ipselect="false" id="SecurityLevel" name="SecurityLevel" class="pfselect" style="width: 130px" aria-invalid="false" version="3" disabled="disabled">
								<option value="s1" >NOAUTH_NOPRIV</option>
								<option value="s2" >AUTH_NOPRIV</option>
								<option value="s3" selected="">AUTH_PRIV</option>
							</select>
						</td>
						<td><span class="pflabel">协议认证</span><span class="pfred">*</span></td>
						<td>
						<select id="AuthProtocol" name="AuthProtocol" class="pfselect" style="width: 130px" aria-invalid="false" version="3" disabled="disabled">
							<option value="md5" selected="">AuthMD5</option>
							<option value="sha">AuthSHA</option>
						</select>
						</td>
					</tr>
					<tr version="3" style='display:none'>
						<td><span class="pflabel">用户名</span></td>
						<td><input type="text" id="SecurityName" name="SecurityName" class="pfinput canotChinese" style="width:220px" version="3" disabled="disabled" maxlength="50"/></td>
						<td><span class="pflabel">认证密码</span></td>
						<td><input type="password" name="SecurityPwd" class="pfinput" style="width:220px" version="3" disabled="disabled"
							onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/></td>
					</tr>
					<tr version="3" style='display:none'>
						<td><span class="pflabel">加密协议</span></td>
						<td>
							<select name="PrivProtocol" class="pfselect valid" style="width: 130px" aria-invalid="false" version="3" disabled="disabled">
								<option value="des" selected="">PrivDES</option>
								<option value="3des">Priv3DES</option>
								<option value="aes128">PrivAES128</option>
								<option value="aes192">PrivAES192</option>
								<option value="aes256">PrivAES256</option>
							</select>
						</td>
						<td><span class="pflabel">加密密码</span></td>
						<td><input type="password" name="PrivPwd" class="pfinput" style="width:220px" version="3" disabled="disabled"
							onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/></td>
					</tr>
					<tr>
						<td></td><td></td><td><span id="connect" class="wbtn wblue">测试</span></td><td></td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<div class="inboxtitle" style="margin-top: 2px">
			测试结果 
		</div>
		<div class="inboxcontent">
		<div id="result" style="margin:5px;height:80px; font-size: 12px; padding: 5px"></div>
		</div>
	</form>
	<script type='text/javascript'>
	$('#snmp').validate( {
	   	rules : {},
		messages: {}
	});
	$("input[name='version']").change(function(){
		if($("input[name='version']:checked").val()==2){
			$("tr[version='3']").show()
			$("select[version='3']").removeAttr("disabled")
			$("input[version='3']").removeAttr("disabled")
			$("tr[version='2c']").hide()
			$("input[version='2c']").attr("disabled", "disabled")
		}else{
			$("tr[version='3']").hide()
			$("select[version='3']").attr("disabled", "disabled")
			$("input[version='3']").attr("disabled", "disabled")
			$("tr[version='2c']").show()
			$("input[version='2c']").removeAttr("disabled")
		}
	})
	$("#connect").bind("click", function(){
		if(($(".error")).length > 0){
			return;
		}
		if(!$('#snmp').valid()){
			return;
		}
		$("#result").html("<div style='color: #38cdd3'>正在测试，请稍候...</div>")
		$.ajax({
			type : "get",
			url : "${ctx}/network/topology/snmpResult.do",
			data: $("#snmp").serialize(),
			dataType : "json",
			success : function(msg) {
	           if(msg.result==0){
	        	   $("#result").html("<div style='color: #38cdd3'>测试成功</div>")
	           }else if(msg.result==1){
	        	   $("#result").html("<div style='color: #FF0000'>SNMP响应超时</div>")
	           }else if(msg.result==4){
	        	   $("#result").html("<div style='color: #FF0000'>SNMP验证信息错误</div>")
	           }else{
	        	   $("#result").html("<div style='color: #FF0000'>测试失败</div>")
	           }
			}
		});
	})
	</script>
</body>
</html>