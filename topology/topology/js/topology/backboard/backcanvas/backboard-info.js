var BackInfo = {
	privateSdata : {
		Elements : [],
		element : undefined,
		elementindex : undefined,
		imgagepath : '../images/backboard/',
		parentElement : undefined,
		WarningElements: []
	},
	
	getBackCanvas: function () {
		var canvas = document.getElementById("backplanCanvas");
		return canvas
	},
	  
	getBackCanvasContext: function () {
		return BackInfo.getBackCanvas().getContext("2d");
	},

	instances : new Array(),

	uninstances : new Array(),
	
	setElements : function(elements){
		BackInfo.privateSdata.Elements = elements;
	},
	
	getElements : function(){
		return BackInfo.privateSdata.Elements;
	},
	
	drawBack : function(){
		
		var context = document.getElementById("backplanCanvas");
		context.clearRect(0, 0, 2000, 1000);
		
		for(var p = BackInfo.privateSdata.Elements.length -1 ;p>=0;p--){
			BackInfo.privateSdata.Elements[p].draw();
		}
		
	},
	
	getElementById: function(id) {
		if (isNotEmpty(id)) {
			for (var i in BackInfo.privateSdata.Elements) {
				var el = BackInfo.privateSdata.Elements[i];
				if (el.getId() == id) {
					return el;
				}
			}
		}
		return null;
	},
	
	getElementIndex: function(id) {
		if (isNotEmpty(id)) {
			for (var i in BackInfo.privateSdata.Elements) {
				var el = BackInfo.privateSdata.Elements[i];
				if (el.getId() == id) {
					return i;
				}
			}
		}
		return -1;
	},
	
	getElement : function(){
		return this.privateSdata.element;
	},
	
	setElement : function(obj){
		this.privateSdata.element = obj;
	}
	
}