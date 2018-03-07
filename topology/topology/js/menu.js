$(function() {

	// 菜单////////////////////////////
	var menubtn = $("#menubtn");// 菜单显示隐藏按钮
	var menus = $("#menus");// 菜单

	var mli0s = $(".mli0");// 一级菜单列表
	var mli1s = $(".mli1");// 二级菜单列表
	var mli2s = $(".mli2");// 三级级菜单列表

	var mul1 = $(".mul1");// 二级菜单容器
	var mul2 = $(".mul2");// 三级菜单容器

	var wcontent = $("#wcontent");// 右侧内容区域
	var leftMargin;
	// 加载状态
	var menushow = 1;// 菜单收起折叠 0 展开 1 收起
	showhidemenu();
	mul2.parent().addClass("havelist");// 加载所有二级菜单有子菜单的标志

	// 菜单切换按钮事件
	menubtn.click(function() {

		showhidemenu();
		
		adjust();

	});

	// 一级菜单单击
	mli0s.click(function() {

		//$(this).find(".ma0").addClass("listclick");
		//$(this).siblings().find(".ma0").removeClass("listclick");

	});
	
	
	// 没级菜单根据地址栏判断 当前栏目 并增加当前栏目在菜单上的标志
	$(".mli0 a.ma0").each(function(){
        if($(this)[0].href==String(window.location)){  
            $(this).addClass("listclick");
			$(document).attr("title",$(this).text());
        }
    }); 
	
	$(".mli1 a.ma1").each(function(){
        if($(this)[0].href==String(window.location)){  
            $(this).parent().parent().prev(".ma0").addClass("listclick"); 
			$(this).addClass("listclick_noicon");
			$(document).attr("title",$(this).html());
        }
    });
	$(".mli2 a.ma2").each(function(){  
        if($(this)[0].href==String(window.location)){  
            $(this).parent().parent().parent().parent().prev(".ma0").addClass("listclick");  
			$(this).parent().parent().prev(".ma1").addClass("listclick_noicon");  
			$(this).addClass("listclick_noicon");
		    $(document).attr("title",$(this).html());
        }
    });


	// 一级菜单悬停
	mli0s.hover(function() {

		$(this).find(".mul1").show();
		$(this).addClass("li_on");

	}, function() {

		$(this).find(".mul1").hide();
		$(this).removeClass("li_on");

	});

	// 二级菜单悬停
	mli1s.hover(function() {

		$(this).find(".mul2").show();
		$(this).addClass("li_on1");

	}, function() {

		$(this).find(".mul2").hide();
		$(this).removeClass("li_on1");

	});

	// 三级菜单悬停
	mli2s.hover(function() {

		$(this).addClass("li_on1");

	}, function() {

		$(this).removeClass("li_on1");

	});
	// 菜单 END

	// other functions

	// 显示隐藏按钮方法
	function showhidemenu() {
        
		if (menushow == 0) {
			leftMargin = 240;
			// 展开
			menus.width(leftMargin);
			wcontent.css("left", leftMargin + "px");
			mul1.parent().addClass("havelist");
			menushow = 1;

			$(".namehide").removeClass("namehide").addClass("nameshow");

		} else {
			leftMargin = 52;
			// 隐藏
			menus.width(leftMargin);
			wcontent.css("left", leftMargin + "px");
			mul1.parent().removeClass("havelist");
			menushow = 0;

			$(".nameshow").removeClass("nameshow").addClass("namehide");

		}
		
		

	}
	// /////////////////////////////////////////////////////////////////////////////
	$("#allscreen").click(function() {
		
		$("#wtop").hide();
		
		$("#wcontent").css("left", "0px");
		$("#allscreen").hide();
		$("#exit_allscreen").show();
		
		$(".nav-top").hide();
		$("#menus").hide();
		
		$(".swiper-slide").css("width", "100%");
		//$(".swiper-wrapper").css("transform", "");
		//$(".swiper-pagination-bullet").removeClass("swiper-pagination-bullet-active");
		$(".swiper-pagination-bullet").eq(0).click();
		
		$(".main_right").css("top","0px");
		$("#topoMain").css("top","0px");
        $("#topologyCanvasToolBar").hide();
		$("#huitudiv").hide();
		$("#svgCanvas").css("top","0px");
		adjust();
	});

	$("#exit_allscreen").click(function() {
		
		$("#wtop").show();
		$("#wcontent").css("left", leftMargin + "px");
		$("#allscreen").show();
		$("#exit_allscreen").hide();
		$(".nav-top").show();
		$("#menus").show();
		$("#topoMain").css("top","50px");
		$(".main_right").css("top","50px");
        $("#topologyCanvasToolBar").show();
		$("#huitudiv").toggle();
		$("#svgCanvas").css("top","35px");
		adjust();
	});
});