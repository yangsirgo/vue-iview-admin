var noc = {
	width: "100%",
	height: "100%"
}
$(function(){
	
	noc.width = $(window).width();
	noc.height = $(window).height();
	
	$(window).resize(function(){
		
		noc.width = $(window).width();
	    noc.height = $(window).height();
    
	});
	

});