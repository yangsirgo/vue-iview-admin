$(document).ready(function(){ 
	//字符验证
	jQuery.validator.addMethod("specialChar", function(value, element) {
	var regular = /^([^\`\+\~\!\#\$\%\^\&\*\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\|\}\{\=\"\'\`\！\?\:\<\>\•\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\。\，\、\,]+.*)$/;
	if(regular.test(value)){ return false;};
		return true;}, "不允许包含特殊符号");//特殊字符包括空格

	//字符验证
	jQuery.validator.addMethod("specialCharNew", function(value, element) {
	var regular = /^([^\`\+\~\!\#\$\%\^\&\*\|}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\|}\{\=\"\'\`\！\?\:\<\>\•\“\”\；\‘\‘\〈\〉\￥\……\（\）\——\｛\｝\【\】\\\;\：\？\《\》\。\，\、\,]+.*)$/;
	if(regular.test(value)){ return false;};
		return true;}, "不允许包含特殊符号");//输入字符允许包括空格

	//字符验证 当允许输入空格时，名称不能全部是空格输入
	jQuery.validator.addMethod("notAllSpace", function(value, element) {
	value = $.trim(value);
	if(value==''){ return false;};
		return true;}, "不允许为空");//输入字符允许包括空格
	/**
	 * 字符长度限制 200字符限制
	 */
	jQuery.validator.addMethod("twoHundredChar", function(value, element) {
		var length = calRealLength(value);
		if(length>200){
			return false;
		}else{
			return true;
		}
	}, "最多输入200个字符");
	
	function calRealLength(value){
		var length = 0;
		for(i=0;i<value.length;i++)
		{
			code = value.charCodeAt(i);
			code >= 0 && code <= 128
			if(code >= 0 && code <= 128){
				length++;
			}else{
				length = length+2
			}
		}
		return length;
	}
	/**
	 * 字符长度限制 100字符限制
	 */
	jQuery.validator.addMethod("oneHunredChar", function(value, element) {
		var length = calRealLength(value);
		if(length>100){
			return false;
		}else{
			return true;
		}
	}, "最多输入100个字符");
	/**
	 * 字符长度限制 50字符限制
	 */
	jQuery.validator.addMethod("fiftyChar", function(value, element) {
		var length = calRealLength(value);
		if(length>50){
			return false;
		}else{
			return true;
		}
	}, "最多输入50个字符");
	/**
	 * 字符长度限制 30字符限制
	 */
	jQuery.validator.addMethod("thirtyChar", function(value, element) {
		var length = calRealLength(value);
		if(length>30){
			return false;
		}else{
			return true;
		}
	}, "最多输入30个字符");
	/**
	 * 字符长度限制 20字符限制
	 */
	jQuery.validator.addMethod("twentyChar", function(value, element) {
		var length = calRealLength(value);
		if(length>20){
			return false;
		}else{
			return true;
		}
	}, "最多输入20个字符");
	/**
	 * 字符长度限制 10字符限制
	 */
	jQuery.validator.addMethod("tenChar", function(value, element) {
		var length = calRealLength(value);
		if(length>10){
			return false;
		}else{
			return true;
		}
	}, "最多输入10个字符");
	/**
	 * 只允许输入中文字母数字下划线
	 */
	jQuery.validator.addMethod("stringCheck", function(value, element) {
		return this.optional(element) || /^[u0391-uFFE5w]+$/.test(value);
		}, "只能包括中文字、英文字母、数字和下划线");
	/**
	 * 字母数字或下划线
	 */
	jQuery.validator.addMethod("isNeedString",function(value, element) {
		return this.optional(element) || /^[a-zA-Z0-9_]*$/.test(value);
		},"请输入字母数字或下划线");
	/**
	 * 数字
	 */
	jQuery.validator.addMethod("isNum",function(value, element) {
		return this.optional(element) || /^[0-9]*$/.test(value);
		},"请输入数字");
	/**
	 * 正整数
	 */
	jQuery.validator.addMethod("isPositiveNum",function(value, element) {
		return this.optional(element) || /^[0-9]*[1-9][0-9]*$/.test(value);
		},"请输入正整数");


	//手机号码验证    
	jQuery.validator.addMethod("isPhone", function(value, element) {    
	    var tel = /^[0-9]{11}$/;
	    return this.optional(element) || (tel.test(value));
	}, "请输入0~9之间的11位整数");

	//请输入 只支持输入0~65535之间的正整数
	jQuery.validator.addMethod("needNum", function(value, element) {    
		var reg=/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([1-9][0-9]{3})|([1-9][0-9]{2})|([1-9][0-9]{1})|([0-9]))$/;
	    return this.optional(element) || (reg.test(value));
	}, "只支持输入0~65535之间的正整数");


	//IP地址验证    
	jQuery.validator.addMethod("isIp", function(value, element) {    
	    var ip = /^((?:(?:25[0-4]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/;
	    return this.optional(element) || (ip.test(value));
	}, "IP地址格式不正确");
	
	//端口
	jQuery.validator.addMethod("isPort", function(value, element) {
		var parten = /^(\d)+$/g;
		if (parten.test(value) && parseInt(value) <= 65535 && parseInt(value) >= 0) {
			return true;
		} else {
			return false;
		}
	}, "请输入正确的端口");
	//
	jQuery.validator.addMethod("compareCurrent", function(value,element){   
		var endTime = moment(value,'YYYY-MM-DD HH:mm:ss').valueOf();
		//var endTime=$("#fixStrId").val();
		var now=moment();
		var beginTime=now.format('YYYY-MM-DD hh:mm:ss').valueOf();
		
	    console.log("addMethod endTime="+endTime+",begintime="+beginTime)
	    var displayTime=endTime-beginTime;
		 if(displayTime<0){		 return false;	 };
		return true;} ,  "设置时间应晚于当前时间"); 

})
