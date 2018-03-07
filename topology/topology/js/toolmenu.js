/** ********tooltip********** */
$(function(){
	// 样例
   var memulistsetting = [{
	   "id": "mn1",
	   "txt": "金盾点击1",
	   "icon": "abc",
	   "enable": true,
	   "display": false,
	   "callback":function(){
		   alert("金盾点击1");
		   gradparemove();
	   }
   },{
	   "id": "mn2",
	   "txt": "金盾点击2",
	   "icon": "abc",
	   "enable": false,
	   "display": true,
	   "callback":function(){
		   alert("金盾点击2");
		   gradparemove();
	   }
   },{
	   "id": "mn3",
	   "txt": "金盾点击3",
	   "icon": "abc",
	   "enable": true,
	   "display": true,
	   "callback":function(){
		   alert("金盾点击3");
		   gradparemove();
	   }
   }];
});

function addtooltip (btn,menusetting,dirct){
	gradparemove();
	var windowOpenTimes = new Date().getTime();
	// 获取屏幕尺寸
	var wwidth = $(window).width();
	var wheight = $(window).height();
	// 获取按钮位置
	var xx = btn.offset().left;
    var yy = btn.offset().top;
	var btnw = btn.width();
	var btnh = btn.height();
	var arrow_yy = 0 ;
	var menu_yy = 0 ;
	var menu_xx = 0 ;
	var str = "";
	var timer;
	var showlinenum = 0;
	var mlish = 35 ; // 项目行高
	var strul = "<ul class=\"tipmenulist\" id=\"tipmenulist"+windowOpenTimes+"\">";
	for (var i in menusetting){
       // 判断是否显示
	   if(menusetting[i].display){
		   strul += "<li class=\"tipmenuli\" id=\""+menusetting[i].id+"\">";
		   strul += "<div class=\"tipmenuicon "+menusetting[i].icon+"\"></div>";
		   strul += "<div class=\"tipmenutxt\">"+menusetting[i].txt+"</div>";
		   if(menusetting[i].childmenusetting){
			   	strul += "<div class=\"rltv\">";
			   	var menu_xx2 = -163;
			   	var menu_yy2 = 0; 
			   	var displayChildCount = 0;
			   	for (var j in menusetting[i].childmenusetting){
			   		if(menusetting[i].childmenusetting[j].display){
			   			displayChildCount++;
			   		}
			   	}
			   	if(displayChildCount!=0){
					menu_yy2 = (-35*displayChildCount)+95;
			   		strul += "<div class=\"tipmenu\"  style=\"left:"+menu_xx2+"px;top:"+menu_yy2+"px;display:none\">";
			   		strul += "<ul class=\"tipmenulist\">";
			     	for (var j in menusetting[i].childmenusetting){
						if(menusetting[i].childmenusetting[j].display){
							strul += "<li class=\"tipmenuli\" id=\""+menusetting[i].childmenusetting[j].id+"\">";
                        	strul += "<div class=\"tipmenuicon "+menusetting[i].childmenusetting[j].icon+"\"></div>";
                        	strul += "<div class=\"tipmenutxt\">"+menusetting[i].childmenusetting[j].txt+"</div>";
			            	strul += "</li>";	  
						}
					}
			     	strul += "</ul>";
			     	strul += "</div>";
			 	}
		     	strul += "</div>";
	      	} 
		  	strul += "</li>";
		  	// 统计正真显示的行数
		  	showlinenum++;
	   	}
	}
	strul += "</ul>";
	// 向下展开的菜单
	if(dirct == "downlist"){
		// 箭头位置
		arrow_xx = xx + btnw - 18; // 图标的一半8px 箭头的一半10,向前退18px
	  	// 菜单x位置
	  	menu_xx = xx - 100 + btnw;

      	if(( wheight - yy - showlinenum*mlish - 23) > 0 ){ // 如果下面地方够用，向下展开
		   	// 菜单y位置
		   	menu_yy = yy + 10 + btnh;
		   	arrow_yy = yy  + btnh;
		   	str += "<div class=\"tipuparrow\" style=\"left:"+arrow_xx+"px;top:"+arrow_yy+"px;\"></div>";
	  	}else{                                            // 如果下面地方不够用，向上展开
	  		// 菜单y位置
	  		menu_xx = xx - 50 + btnw;
	  		menu_yy = yy - showlinenum*mlish - 16;  // 菜单上下填充 各是3 箭头高6 所以减去16
	  		arrow_yy = yy - 10; // 向下的箭头高度是10
	  		str += "<div class=\"tipdownarrow\" style=\"left:"+arrow_xx+"px;top:"+arrow_yy+"px;\"></div>";
	  	}
	  	// 靠右边的时候
	  	if( menu_xx + 170 > wwidth){
	  		menu_xx = wwidth - 170;
	  	}
	  	// 靠左边的时候
	  	if( menu_xx + 170 > wwidth){
	  		menu_xx = wwidth - 170;
	  	}
	  	str += "<div class=\"tipmenu\" id=\"tipmenu"+windowOpenTimes+"\" style=\"left:"+menu_xx+"px;top:"+menu_yy+"px;\" >";
	}
    // 塞入菜单
    str += strul;  
	str += "</div>";
	// 添加进去
    $("body").append(str);
    
	var tipmenubody = $("#tipmenu" + windowOpenTimes);
	var tipmenulist = $("#tipmenulist" + windowOpenTimes);
	//timer = setTimeout("gradparemove()", 5000);
	
	tipmenubody.hover(function() {
		//clearTimeout(timer);
		//console.log("clearTimer");
	}, function() {
		//gradparemove();
	});
	
	 //e.stopPropagation(); 
	
	
    $(document).click(function(){  
        gradparemove();
    });  
	
	
	

	$(".tipmenuli").hover(function() {
		$(this).find(".tipmenu").show();
	}, function() {
		$(this).find(".tipmenu").hide();
	});
	// 绑定事件
	for ( var i in menusetting) {
		if (menusetting[i].enable) {
			$("#" + menusetting[i].id).bind("click", menusetting[i].callback);
		} else {
			$("#" + menusetting[i].id).addClass("dispablegray");
		}
		for ( var j in menusetting[i].childmenusetting) {
			if (menusetting[i].childmenusetting[j].enable) {
				$("#" + menusetting[i].childmenusetting[j].id).bind("click", menusetting[i].childmenusetting[j].callback);
			} else {
				$("#" + menusetting[i].childmenusetting[j].id).addClass("dispablegray");
			}

		}
	}
}
// 清空页面菜单元素
function gradparemove() {
	$(".tipuparrow").remove();
	$(".tipdownarrow").remove();
	$(".tipmenu").remove();
}


