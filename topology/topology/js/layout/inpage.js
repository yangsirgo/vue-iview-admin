$(function() {
    
	/*获取dom元素*/
	var inlefttree = $("#inlefttree");
	var inlefttreename = $("#inlefttreename");
	var inlefttreecontent = $("#inlefttreecontent");
	var inright = $("#inright");
	var addIcon = $("#addIcon");
	var editdepart = $("#editdepart");
	
	
	
	/*获取dom元素 END*/
		
	/*按钮悬停变色*/
	$(".addgraybtn").hover(function() {
		$(this).addClass("addbluebtn");
	}, function() {
		$(this).removeClass("addbluebtn");
	});

	
	$(".treehide").hover(function() {
		$(this).addClass("treehideblue");
	}, function() {
		$(this).removeClass("treehideblue");
	});

	
	$(".treeshow").hover(function() {
		$(this).addClass("treeshowblue");
	}, function() {
		$(this).removeClass("treeshowblue");
	});
	
	$(".treedotsbtn").hover(function() {
		$(this).addClass("treedotsbtnblue");
	}, function() {
		$(this).removeClass("treedotsbtnblue");
	});
	
	
	
	/*按钮悬停变色END*/
	
	
	

	$(".treehide").click(function() {
		$(this).hide();
		inlefttreename.hide();
		inlefttreecontent.hide();
		addIcon.hide();
		editdepart.hide();
		
		$(".treeshow").show();
		inlefttree.animate({
			width : "50px",
		}, 200);

		inright.animate({
			left : "52px",
		}, 200);
	});

	$(".treeshow").click(function() {
		$(this).hide();
		inlefttreename.show();
		inlefttreecontent.show();
		addIcon.show();
		editdepart.show();
		
		$(".treehide").show();
		inlefttree.animate({
			width : "298px",
		}, 200);

		inright.animate({
			left : "300px",
		}, 200);
	});
	
	
	$(".pfsearch_radius").focus(function(){
        
		$(this).addClass("pfsearchon");

		
    });
	
	$(".pfsearch_radius").blur(function(){
        
		$(this).removeClass("pfsearchon");
		
    });
	
	$(".pfsearch").focus(function(){
        
		$(this).addClass("pfsearchon");
		
    });
	
	$(".pfsearch").blur(function(){
        
		$(this).removeClass("pfsearchon");
		
    });

	
	
	
	
});