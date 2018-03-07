$().ready(function(){
	UIContiner.initUIContiner();
});

var gloable = {
	data : {
		currentBackplan : undefined
	}	
}

var backplan = {
	
	data : {
		isChange : false,
		layoutWidth : 0,
		batch : 0,
		initPosition : 0,
		ipAddress : undefined
	},	
	
	createBackplan : function(_Object,e){
		var backplan = new BackplanObject(_Object.src,e.clientX,e.clientY);
		UIContiner.addElement(backplan);
		
		var _object = backplan.getObject();
		
		utils.addEventHandler(_object,"mousedown",backplanoper.reDrag);
		utils.addEventHandler(_object,"dblclick",backplanoper.reset);
		
		document.body.appendChild(_object);

		document.onmousemove = function(event) {
			_object.style.left = event.clientX + "px";
			_object.style.top = event.clientY + "px";
		}
			 
		document.onmouseup = function(event){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}

var backplanoper = {
	reDrag : function(){
			
		var _div = this;
		document.onmousemove = function(event) {
			_div.style.left = event.clientX + "px";
			_div.style.top = event.clientY + "px";
		}
			
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
		
		gloable.data.currentBackplan = this;
	},
	
	reset : function(){
		utils.removeEventHandler(this,"mousedown",backplanoper.reDrag);
		this.style.border = "5px";
		this.style.solid = "red";
		utils.addEventHandler(this,"mousemove",backplanoper.setSize);
		gloable.data.currentBackplan = _object;
	},
	
	setSize : function(e){

		if(e.clientX <= (this.offsetLeft + this.offsetWidth) && e.clientX> (this.offsetLeft + this.offsetWidth - 5)
				&& e.clientY >(this.offsetTop + this.offsetHeight-5) && e.clientY <= (this.offsetTop + this.offsetHeight)){
			document.body.style.cursor = "se-resize";
			utils.addEventHandler(this,"mousedown",function (){
				backplan.data.isChange = true;
				utils.removeEventHandler(this,"mousemove",backplan.setSize);
				
				odrag = this;
				document.onmousemove = function(e){
				
					if(backplan.data.isChange){
						odrag.style.width = (odrag.offsetWidth + (e.clientX - (odrag.offsetLeft + odrag.offsetWidth)))+"px";
						odrag.style.height = (odrag.offsetHeight + (e.clientY - (odrag.offsetTop + odrag.offsetHeight)))+"px"
					}
				}
				
				document.onmouseup = function(){
//					odrag.removeEventListener(e.type,arguments.callee,false); 
					document.body.style.cursor = "default";
					utils.removeEventHandler(odrag,"mousemove",backplanoper.setSize);
					utils.addEventHandler(odrag,"mousedown",backplanoper.reDrag);
					backplan.data.isChange = false;
					document.onmousemove = null;
					document.onmouseup = null;
				}
			});
		}else{
//			this.removeEventListener(e.type,arguments.callee,false);
			document.onmousemove = null;
			document.onmouseup = null;
			document.body.style.cursor = "default";
			backplan.data.isChange = false;
		}
		
		gloable.data.currentBackplan = this;
	},
	
	getCurrentBackplan : function(){
		return gloable.data.currentBackplan;
	},
	
	getIpAddress : function (obj) {
		backplan.data.ipAddress = obj.innerHTML;
	},
	
	saveBackplan : function () {
		var Elements = UIContiner.getArr();
		var jsonObject = [];
		
		for(var p in Elements){
			jsonObject.push(Elements[p].getObjectData());
		}
		
		$.ajax({
			
			url: saveBackplanPath+'?jsonString='+JSON.stringify(jsonObject),
			
			type: 'post', 
			
			success: function(data){
				
				
			}
		});
	}
}