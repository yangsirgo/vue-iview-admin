<!-- nacpadd.jsp -->
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>
<%@ include file="/WEB-INF/jsp/common/meta.jsp"%>
<table class="ipmac-table" cellspacing="0" cellpadding="0" border="0" width="100%">
   <thead>
       <tr>
           <th style="text-indent: 30px;">IP地址</th>
           <th>MAC地址</th>
           <th style="text-align: center;">品牌</th>
           <th>所属部门</th>
           <th>事件</th>
       </tr>
   </thead>
</table>

<script type="text/javascript">
$(function(){
	getIpmacTable('${ip}','${indexid}');
})
</script>