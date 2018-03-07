<!-- taglibs.jsp -->
<%@page import="sun.misc.*" %>
<%@page import="java.util.*" %>
<%@page import="org.springframework.security.core.context.*"%>
<%@page import="org.springframework.context.*"%>
<%@page import="org.springframework.web.context.support.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!-- //ctx -->
<%@ page isELIgnored="false"%> 
<% 
	String skin="blue";
	pageContext.setAttribute("skin", skin);
%>

<c:set var="ctxface" value="${skin}"/>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<c:set var="ctxJs" value="${pageContext.request.contextPath}/js"/>

<c:set var="ctxCss" value="${pageContext.request.contextPath}/skin/blue/css"/>

<c:set var="ctxImg" value="${pageContext.request.contextPath}/skin/blue/images"/>
<!-- taglibs.jsp END-->
