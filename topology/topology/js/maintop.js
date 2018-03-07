function curUserInfo(){
	var curUserName = $("#user_name").html();
	var title = "编辑用户";
	var width = 720;
	var height = 620;
	$.get(ctx+"/system/usermgr/updateUserByName.do?userName="+curUserName, function(data){
	    openwindow(title,width,height,data, "doSaveUser");
	});
}
var winWidth = $(window).width();
var winheight = $(window).height();
function singleDiscovery(){
	var openUrl = ctx+"/discovery/single.do";//弹出窗口的url
	var iWidth=winWidth; //弹出窗口的宽度;
	var iHeight=winheight; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	window.open(openUrl,"资源发现","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft +", toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"); 
}

//全网发现
function globalDiscovery(){
	var iWidth=1250; //弹出窗口的宽度;
	var iHeight=650; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	$.ajax({  
        type : "get",  
        url : ctx+"/discovery/isDiscovering.do",  
        data : {},  
        async : false,  
        success : function(data){  
		 if("1" == data){
			 var openUrl = ctx+"/discovery/global.do?isDiscovery=0";//弹出窗口的url
			 window.open(openUrl,"全网发现","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft +", toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		 }else{
			 var openUrl = ctx+"/discovery/global.do";//弹出窗口的url
			 window.open(openUrl,"全网发现","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft +", toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"); 
		 }
        }  
    });
}

//Excel导入
function excelImport(){
	var openUrl = ctx+"/discovery/excelImport.do";//弹出窗口的url
	var iWidth=1250; //弹出窗口的宽度;
	var iHeight=650; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	window.open(openUrl,"Excel导入","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft +", toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"); 
}

//发现配置
function discoverySetting(){
	$.get(ctx+"/discovery/discoverySetting.do", function(data){
		openwindow("发现配置<span style='font-size:12px; color:#999;margin-left:10px;'>用于全网发现、网段发现</span>", 1000, 700, data, "saveDisSetting(1)");
		
		$(".openwindowbtns").append("<div class='enturebtn' style='float:right;margin-top:13px;margin-right:10px;' onclick='saveDisSetting(2)'>保存</div>");
	});
}

//网段发现
function netSegDiscovery(){
	var iWidth=1250; //弹出窗口的宽度;
	var iHeight=650; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	$.ajax({  
        type : "get",  
        url : ctx+"/discovery/isDiscovering.do",  
        data : {},  
        async : false,  
        success : function(data){  
		 if("1" == data){
			 var openUrl = ctx+"/discovery/global.do?isDiscovery=0";//弹出窗口的url
			 window.open(openUrl,"网段发现","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft +", toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		 }else{
			 var openUrl = ctx+"/discovery/networkSegment.do";//弹出窗口的url
			 window.open(openUrl,"网段发现","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft +", toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"); 
		 }
        }  
    });
	}
//换肤
function tabFace(){
	 var str ="<div id=\"facewindow\">";
		 str +="<div class=\"openwindowtitle\" style=\"background-color:inherit\">";
		 str +="<div class=\"openwindowtitlename\">换肤</div>";
		 str +="<div class=\"openwindowtitleclose\" id=\"openwindowfaceclose\"></div>";
		 str +="</div>";
		 str +="<div class=\"openwindowcontent\" style=\"bottom:auto\">";
		 str +="<div class=\"facetabbtns\">";
		 str +="<div class=\"facell\" style=\"background-color:#fff\" onclick=\"changeFace(1)\">";
		 str +="<div class=\"facellline\" style=\"background-color:#5FAEE3\"></div>";
		 str +="</div>";
	     /*
		 str +="<div class=\"facell\" style=\"background-color:#181816\" onclick=\"changeFace(2)\">";
		 str +="<div class=\"facellline\" style=\"background-color:#50B950\"></div>";
		 str +="</div>";
	
		 str +="<div class=\"facell\" style=\"background-color:#020202\" onclick=\"changeFace(3)\">";
		 str +="<div class=\"facellline\" style=\"background-color:#F74E52\"></div>";
		 str +="</div>";
	
		 str +="<div class=\"facell\" style=\"background-color:#24344A\" onclick=\"changeFace(4)\">";
		 str +="<div class=\"facellline\" style=\"background-color:#14C5BB\"></div>";
		 str +="</div>";
	
		 str +="<div class=\"facell\" style=\"background-color:#04876E\" onclick=\"changeFace(5)\">";
		 str +="<div class=\"facellline\" style=\"background-color:#4EC3B1\"></div>";
		 str +="</div>";
	     */
		 str +="<div class=\"facell\" style=\"background-color:#272D3E\" onclick=\"changeFace(7)\">";
		 str +="<div class=\"facellline\" style=\"background-color:#5FAEE3\"></div>";
		 str +="</div>";
	
		 str +="</div>";
		 str +="</div>";
	
	$("body").append(str);
	
	
	$("#openwindowfaceclose").click(function(){
        $("#facewindow").remove();
    });
	
}
/**
 * 设置用户肤色
 * @param face
 */
function changeFace(face){
	var param={
		"skinId":face,
	}
	$.ajax({
		type : "get",
		url:ctx+"/system/setUserSkin.do?"+csrfName+"="+csrfValue,
		data:param,
		dataType : "json",
		success : function(msg) {
	    	if(msg.runflag>0){
				layer.msg("保存成功",{icon:1});
	    		location.reload();//重新刷新页面
	    	}
		},
		error:function(e){
			layer.msg("保存失败",{icon:2});
		}
	})
}

function logout(){
	$('#logoutForm').submit();
}
$(function(){

setTimeout("logout()",3600000); 
});



