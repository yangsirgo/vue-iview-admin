var ethernetOper = {
		
	initPosition : {
		position : undefined
	},	
		
	showCreateWin : function (obj,e) {
		var _div = Toolkit.createDiv();
		_div.zIndex = 1000;
		_div.style.position = "absolute";
		
		var _img = new Image();
		_img.src = obj.src;
		
		_div.style.left = e.clientX;
		_div.style.top = e.clientY;
		
		_div.appendChild(_img);
		document.body.appendChild(_div);
		
		document.body.onmousemove = function(e){
			_div.style.left = e.clientX + "px";
			_div.style.top = e.clientY + "px";
		}
		
		document.body.onmouseup = function(e){
			document.body.onmousemove = null;
			document.body.onmouseup = null;
			document.body.removeChild(_div);
			ethernetOper.initPosition.position = { X : e.clientX,Y : e.clientY };
			$("#showDei").show();
		}
	},
	
	sureOper : function () {
		var currentplan = backplanoper.getCurrentBackplan();
		layout.setLayout(currentplan);		
	},
	
	cancelOper : function () {
		$(':input','#myform') 
		.not(':button, :submit, :reset, :hidden') 
		.val('') 
		.removeAttr('checked') 
		.removeAttr('selected');
		$("#showDei").hide();
	},
	
	getPosition : function () {
		return ethernetOper.initPosition.position; 
	}
}