var layout = {
	
	style : {
		styleLayout : "transverse", //默认为横向布局
		batch : 0,
		layoutWidth : 0,
		batchTransverseInterval : 50 //批次之间固定横向间隔
	},	
		
	setLayout : function(obj){
		 var interfacesort = $("input[name='jkxhsx']:checked").val();
		 if(interfacesort == 1){
			 layout.style.styleLayout = "wertical";
			 layout.verticalLayout(obj);
		 }else{
			 layout.transverseLayout(obj);
		 }
		 
	},

	transverseLayout : function(obj){
		var numrow = $("#numrow").val();
		var numcol = $("#numcol").val();
		var sxjg = $("#jksxjg").val();
		var zyjg = $("#jkzyjg").val();
		var jkfx = $("#jkfx").val();
		
		var interfacetype = $("#jktype").val();
		
		
		var index = $("#jkStartIndex").val();
		var jg = $("#indexjg").val();
		
		var position = ethernetOper.getPosition();
		
		if(sxjg == undefined){
			sxjg = 0;
		}
		
		if(zyjg == undefined){
			zyjg = 0;
		}
		
		if(numrow != undefined && numcol != undefined){
			var x = 0;y=position.Y;
			
			var width = 0;height = 0;
			if(interfacetype == 1){
				width = new SerialObject().getSelfWidth();
				height = new SerialObject().getSelfHeight();
			}else if(interfacetype == 2){
				width = new LightObject().getSelfWidth();
				height = new LightObject().getSelfHeight(); 	
			}else{
				width = new EthernetObject().getSelfWidth();
				height = new EthernetObject().getSelfHeight();
			}
			
			for(var i = 1 ; i<=numrow ; i++){
				
				x = position.X;
//				if(layout.style.batch == 0){
//					x = position.X;
//				}else if(layout.style.batch != 0 && i == 1){
//					x = layout.style.layoutWidth;
//				}else if(layout.style.batch != 0 && i > 1){
//					x = layout.style.layoutWidth - ((width+Number(zyjg)) * numcol); 
//				}
				
				if($("#ghfz").attr("checked")){
					if(i%2 == 0){
						if(jkfx == 0){
							jkfx = 1;
						}else{
							jkfx = 0;
						}
					}else{
						if(i != 1){
							if(jkfx == 0){
								jkfx = 1;
							}else{
								jkfx = 0;
							}
						}
					}
				}
				
				for(var j = 0 ; j<numcol ; j++){
					if(i ==1 && j == 0){
						if(interfacetype == 1){
							var ether = new SerialObject(index,jkfx);
							UIContiner.addElement(ether);
						}else if(interfacetype == 2){
							var ether = new LightObject(index,jkfx);
							UIContiner.addElement(ether);
						}else{
							var ether = new EthernetObject(index,jkfx);
							UIContiner.addElement(ether);
						}
					}else{
						index = Number(index) + Number(jg);
						if(interfacetype == 1){
							var ether = new SerialObject(index,jkfx);
							UIContiner.addElement(ether);
						}else if(interfacetype == 2){
							var ether = new LightObject(index,jkfx);
							UIContiner.addElement(ether);
						}else{
							var ether = new EthernetObject(index,jkfx);
							UIContiner.addElement(ether);
						}
					}
					document.body.appendChild(ether.getObject());
					ether.setLeft(x);
					ether.setTop(y);
					
					x = x + width + Number(zyjg);
					
					if( i==1 )
						layout.style.layoutWidth = x;
					
				}
				y = y + height + Number(sxjg);
			}
			layout.style.batch ++;
		}
	},
	
	verticalLayout : function(obj){
		var numrow = $("#numrow").val();
		var numcol = $("#numcol").val();
		var sxjg = $("#jksxjg").val();
		var zyjg = $("#jkzyjg").val();
		
		var interfacetype = $("#jktype").val();
		
		var index = $("#jkStartIndex").val();
		var jg = $("#indexjg").val();
		
		if(sxjg == undefined){
			sxjg = 0;
		}
		
		if(zyjg == undefined){
			zyyjg = 0;
		}
		
		if(numrow != undefined && numcol != undefined){
			var x = 0;y=50;
			
			var width = 0;height = 0;
			if(interfacetype == 1){
				width = new SerialObject().getSelfWidth();
				height = new SerialObject().getSelfHeight();
			}else if(interfacetype == 2){
				width = new LightObject().getSelfWidth();
				height = new LightObject().getSelfHeight(); 	
			}else{
				width = new EthernetObject().getSelfWidth();
				height = new EthernetObject().getSelfHeight();
			}
			
			for(var i = 1 ; i<= numcol ; i++){
				
				if(layout.style.batch == 0 && i == 1){
					x = 200;
				}else if(layout.style.batch == 0 && i > 1){
					x = layout.style.layoutWidth;
				}else if(layout.style.batch != 0){
					x = layout.style.layoutWidth; 
				}
				
				y = 50;
				
				for(var j = 0 ; j<numrow ; j++){
					if(i == 1 && j == 0){
						if(interfacetype == 1){
							var ether = new SerialObject(index);
						}else if(interfacetype == 2){
							var ether = new LightObject(index);
						}else{
							var ether = new EthernetObject(index);
						}
					}else{
						index = Number(index) + Number(jg);
						if(interfacetype == 1){
							var ether = new SerialObject(index);
						}else if(interfacetype == 2){
							var ether = new LightObject(index);
						}else{
							var ether = new EthernetObject(index);
						}
					}
					
					obj.appendChild(ether.getObject());
					ether.setLeft(x + Number(zyjg));
					ether.setTop(y + Number(sxjg));
					
					y = y + height;
				}
				layout.style.layoutWidth = x + width;
			}
			
			layout.style.batch ++;
		}
	}
}