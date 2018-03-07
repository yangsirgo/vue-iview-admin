$(function() {
	makewtabs("wtabs");
	makeinwtabs("inwtabs");
	makebtnlisttabs("listtabs");
	
	function makewtabs(tabid){
		$("."+tabid+" .wtabbtns .wtabbtn").click(function(){
			$(this).addClass("wtabbtnon").siblings().removeClass("wtabbtnon");
			$(this).parent().parent().find(".wtabcons .wtabcon").eq($(this).index()).show().siblings().hide();
 
			try{
				var func=eval("tabCalback");
				new func();
			}catch(err){
				console.log(err)
			}
		});	
	}
	
	function makebtnlisttabs(tabid){
		$(".wtabbtnon").find(".wtabbtnlist").addClass("bgwhite");
		$("."+tabid+" .wtabbtns .wtabbtn").click(function(){
		  	$(this).addClass("wtabwhitebtnon").siblings().removeClass("wtabwhitebtnon");
		  	if($(".wtabbtnlist")){
		  		$(this).siblings().find(".wtabbtnlist").removeClass("bgwhite");
			  	$(this).find(".wtabbtnlist").addClass("bgwhite");
		  	}
		  	$(this).parent().parent().find(".wtabcons .wtabcon").eq($(this).index()).show().siblings().hide();
			try{
				var func=eval("tabCalback");
				new func();
			}catch(err){
				console.log(err)
			}
		});	
		
		$("."+tabid+" .wtabbtns .wtabbtn").hover(function(){
			 if( $(".wtabbtnlist")){
				$(this).siblings().find(".wtabbtnlist").hide();
				$(this).find(".wtabbtnlist").show();
			 }
		},function(){
		     $(".wtabbtnlist").hide();
		});	
	}

	function makeinwtabs(tabid){
		$("." + tabid + " .inwtabbtns .inwtabbtn").click(function(){
		     $(this).addClass("inwtabbtnon").siblings().removeClass("inwtabbtnon");		
		     $(this).parent().parent().find(".inwtabcons .inwtabcon").eq($(this).index()).show().siblings().hide();
		});	
	}
	$(".wtabbtnlist").parent().parent().addClass("wtabhavelist");
	wtabbtnhover();
});

function wtabbtnhover(){
	$(".wtabbtn").hover(function() {
		$(this).find(".icon_delete").show();
	}, function() {
		$(this).find(".icon_delete").hide();
	});
}