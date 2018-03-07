$(function(){
	var selectbluebtn = $(".selectbluebtn");
	selectbluebtn.hover(function(){ 
		$(this).find(".btnselector").show();	
	},function(){
		$(this).find(".btnselector").hide();
	});
});