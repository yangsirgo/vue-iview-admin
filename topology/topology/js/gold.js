$(function(){

	
	//弹出info窗口
	var winfobtns = $(".winfobtn");
    var winfoclose = $(".winfoclose");
	winfobtns.click(function(){
         $(this).children(".winfo").show(500); 
	});
	winfoclose.click(function(e){
     
		 $(this).parent().parent().hide(500);
		 
		 e.stopPropagation();//取消冒泡
	});

	

	//弹出对话框
	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
    }
	function MM_showHideLayers() { //v6.0
	  var i,p,v,obj,args=MM_showHideLayers.arguments;
	  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
		if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
		obj.visibility=v; }
	}


	
	//other functions 
	
	//显示隐藏按钮方法
	function showhidemenu(){
	  
	  if( menushow == 0 ){
		  
		 //展开
		 menus.width(240);
		 
		 mul1.parent().addClass("havelist");
		 menushow = 1;
		 leftMargin=240;
		 $(".namehide").removeClass("namehide").addClass("nameshow");
	  
	  }else{
		
		//隐藏
		 menus.width(52);
		 
		 mul1.parent().removeClass("havelist");
	     menushow = 0;
		 leftMargin=52;
		 $(".nameshow").removeClass("nameshow").addClass("namehide");
		
	  }  	
	
	};
	
	
	
	
	

	$(".lineopen").click(function(){

		 $(this).parent().parent().next(".linedown").fadeToggle(100);
				
		if ( $(this).hasClass("lineclose") ){
		
		    $(this).removeClass("lineclose");
		
		} else{
		
		    $(this).addClass("lineclose");
		}
   
   });
   
   $(".interfacelist ul li").hover(function(){
	
	    $(this).addClass("grayon").siblings().removeClass("grayon");	
	
	},function(){
	
	
	});
   
   $("ul.btnselectorlist li").hover(function(){
	
	    $(this).addClass("grayon").siblings().removeClass("grayon");	
	
	},function(){
	

	});
   
   $(".interfacelist1 ul li").hover(function(){
	
	    $(this).addClass("grayon1").siblings().removeClass("grayon1");	
	
	},function(){

	
	});
   
   $("ul.btnselectorlist1 li.hashover").hover(function(){
	
	    $(this).addClass("grayon1").siblings().removeClass("grayon1");	
	
	},function(){


	});
   	
 
})

