var randBar;

var Menu = {
//	param : null,
	isRightChoise : 0,
	element : undefined,
	currentElementIndex : undefined,
	choiseElements : [],
	newElements : [],
	topoEditAuthCode: 1,	// 当前用户在当前拓扑中的编辑权限代码, 默认 1, 1-可编辑; 0-不可编辑
	topoReadAuthCode: 1     // 当前用户在当前拓扑中的读权限代码, 默认 1, 1-可读; 0-不可读
}


Menu.show = function(e){
	Menu.initMenu(e);
}

Menu.initMenu = function(e){
	Menu.removeMenu();
	
	var left = e.clientX;
    var top = e.clientY;
    
    var div = document.createElement("div");
    div.id = "divMenu";
    div.style.zIndex = 999;
    div.style.position = "absolute";
    div.style.left = left + "px";
    div.style.top = top + "px";

    div.setAttribute("class", "rightMouse"); 
    var ul = undefined;
    
    if(this.choiseElements.length==0){
    	
    	var canvas = document.getElementById("backplanCanvas");
	    var Point = utils.getPointOnCanvas(canvas, left, top); //菜单定位。。
	    
    	var ele = backboard.getElements();
    	var devEle = backboard.getDevElements();
    	
		for(var i=ele.length-1;i>=0;i--){
			if(ele[i].IsIncludePoint(Point)){
	    		 Menu.isRightChoise = 1;
	    		 Menu.element = ele[i]; 
	    		 Menu.currentElementIndex = i;
	    		 break;
	    	}
		}
		if(Menu.isRightChoise == 0){
			for(var i=devEle.length-1;i>=0;i--){
				if(devEle[i].IsIncludePoint(Point)){
		    		 Menu.isRightChoise = 1;
		    		 Menu.element = devEle[i]; 
		    		 Menu.currentElementIndex = i;
		    		 break;
		    	}
			}
		}
		if(Menu.isRightChoise == 1){
			if(Menu.element.type){
				NodeMenu.data.nodeToolBar=[
		   			{Text:"删除",value:1,name:"backDel",edit:"1"}
	   			];
				NodeMenu.initToolBar();
				ul = NodeMenu.getUl();
			}else{
				NodeMenu.data.nodeToolBar=[
		   			{Text:"删除",value:1,name:"backDel",edit:"1"},
		   			{Text:"修改",value:2,name:"backEdit",edit:"1"}
				];
				NodeMenu.initToolBar();
				ul = NodeMenu.getUl();
			}
		}
	}else{
		MultiSelectMenu.initToolBar();
		ul =MultiSelectMenu.getUl();
    }
  
    div.appendChild(ul);
    document.body.appendChild(div);
    this.isRightChoise = false;
}

Menu.removeMenu = function(){
	var divMenu = document.getElementById("divMenu");
	if (divMenu != undefined)
	    document.body.removeChild(divMenu);
}

Menu.removeWindow = function(){
	var subTopoWin = document.getElementById("subTopoWin");
    if (subTopoWin != undefined)
        document.body.removeChild(subTopoWin);
}

Menu.deleteNode = function(){
	if(!Menu.element){
		infotip("没有选中任何节点");
		return;
	}
	openconfirmwindow("提示", "你确定要删除吗?", Menu.doDeleteNode);
}

Menu.editNode = function(){
	if(!Menu.element){
		infotip("没有选中任何节点");
		return;
	}
	$.ajax({
		url: getDevPortById,
		type: 'post', 
		data:{
			nodeId:initPage.data.tempVariable.currEleId
		},
		success: function(data){
			//data = '{ "19": { "ifIndex": "19", "name": "GigabitEthernet0/0/14", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "17": { "ifIndex": "17", "name": "GigabitEthernet0/0/12", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "18": { "ifIndex": "18", "name": "GigabitEthernet0/0/13", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "15": { "ifIndex": "15", "name": "GigabitEthernet0/0/10", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "16": { "ifIndex": "16", "name": "GigabitEthernet0/0/11", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "13": { "ifIndex": "13", "name": "GigabitEthernet0/0/8", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "14": { "ifIndex": "14", "name": "GigabitEthernet0/0/9", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "11": { "ifIndex": "11", "name": "GigabitEthernet0/0/6", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "12": { "ifIndex": "12", "name": "GigabitEthernet0/0/7", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "21": { "ifIndex": "21", "name": "GigabitEthernet0/0/16", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "20": { "ifIndex": "20", "name": "GigabitEthernet0/0/15", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "22": { "ifIndex": "22", "name": "GigabitEthernet0/0/17", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "23": { "ifIndex": "23", "name": "GigabitEthernet0/0/18", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "24": { "ifIndex": "24", "name": "GigabitEthernet0/0/19", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "25": { "ifIndex": "25", "name": "GigabitEthernet0/0/20", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "26": { "ifIndex": "26", "name": "GigabitEthernet0/0/21", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "27": { "ifIndex": "27", "name": "GigabitEthernet0/0/22", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "28": { "ifIndex": "28", "name": "GigabitEthernet0/0/23", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "29": { "ifIndex": "29", "name": "GigabitEthernet0/0/24", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "3": { "ifIndex": "3", "name": "Console9/0/0", "type": "other", "bandWidth": "0", "macaddr": "00:00:00:00:00:00" }, "10": { "ifIndex": "10", "name": "GigabitEthernet0/0/5", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "7": { "ifIndex": "7", "name": "GigabitEthernet0/0/2", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "6": { "ifIndex": "6", "name": "GigabitEthernet0/0/1", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "32": { "ifIndex": "32", "name": "Vlanif254", "type": "propVirtual", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:5F" }, "5": { "ifIndex": "5", "name": "Vlanif1", "type": "propVirtual", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:52" }, "31": { "ifIndex": "31", "name": "Vlanif11", "type": "propVirtual", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:5C" }, "4": { "ifIndex": "4", "name": "MEth0/0/1", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "9": { "ifIndex": "9", "name": "GigabitEthernet0/0/4", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" }, "8": { "ifIndex": "8", "name": "GigabitEthernet0/0/3", "type": "ethernetCsmacd", "bandWidth": "0", "macaddr": "68:A8:28:60:E3:50" } }';
			if(data){
				data = JSON.parse(data);
				var tempIndex = Menu.element.ifIndex;
				var ulList = $("#ifindex").find("ul");
				ulList.html("");
				if(data[tempIndex]){
					$("#ifindex").find("span").html(data[tempIndex].name);
				}
				for(var i in data){
					ulList.append('<li><a onclick="Menu.aAction(this)" name="'+data[i].ifIndex+'_'+data[i].type+'" href="#">'+data[i].name+'</a></li>');
				}
			}
		},
		error : function(data){
			console.log(data);
		}
	});
	var iconTempF = $("#ifindexType").find("ul:first").find("a").bind("click",function(obj){
		Menu.warpIconType(obj.currentTarget.attributes.name.value);
	});
	
	$("#pwidth").val(Menu.element.img.width);
	$("#pheight").val(Menu.element.img.height);
	$("#pindex").val(Menu.element.ifIndex);
	var temp = Menu.formatParZN(Menu.element.up_down);
	$("#pUpdown").html(temp);
	$("#icontype").html(Menu.element.icontype);
	$("#netType").html(Menu.warpZNType(Menu.element.icontype));
	$(".interfaceEdit").show();
}

Menu.warpZNType = function(str){
	if($.inArray(str, discoverbackplan.data.ethernet) >= 0){
		Menu.warpIconType("ethernet");
		return "以太口";
	}else if($.inArray(str, discoverbackplan.data.optical) >= 0){
		Menu.warpIconType("optical");
		return "光纤口";
	}else if($.inArray(str, discoverbackplan.data.console) >= 0){
		Menu.warpIconType("console");
		return "控制口";
	}else{
		Menu.warpIconType("other");
		return "其他";
	}
}

Menu.warpIconType = function(str){
	var data;
	if(str == "ethernet"){
		var iconTempL = $("#ifindexType").find("ul:last");
		iconTempL.html("");
		data = discoverbackplan.data.ethernet;
		for(var i in data){
			iconTempL.append('<li><a  href="#">'+data[i]+'</a></li>');
		}
	}else if(str == "optical"){
		var iconTempL = $("#ifindexType").find("ul:last");
		iconTempL.html("");
		data = discoverbackplan.data.optical;
		for(var i in data){
			iconTempL.append('<li><a  href="#">'+data[i]+'</a></li>');
		}
	}else if(str == "console"){
		var iconTempL = $("#ifindexType").find("ul:last");
		iconTempL.html("");
		data = discoverbackplan.data.console;
		for(var i in data){
			iconTempL.append('<li><a  href="#">'+data[i]+'</a></li>');
		}
	}else{//other
		var iconTempL = $("#ifindexType").find("ul:last");
		iconTempL.html("");
		data = discoverbackplan.data.other;
		for(var i in data){
			iconTempL.append('<li><a  href="#">'+data[i]+'</a></li>');
		}
	} 
}


Menu.aAction = function(obj){
	$("#pindex").val(obj.name.split("_")[0]);
	Menu.element.ifType = obj.name.split("_")[1];
}

Menu.formatParZN = function(str){
	if( str == "up"){
		return "向上";
	}else if( str == "down"){
		return "向下";
	}else if( str == "left"){
		return "向左";
	}else if( str == "right"){
		return "向右";
	}else{
		return "向上";
	}
}

Menu.doDeleteNode = function(){
	Menu.newElements = [];
	initPage.data.tempVariable.type = 1;
	if(!Menu.element.type){
		backboard.getElements().splice(Menu.currentElementIndex, 1);
		backboard.setElements(backboard.getElements());
		backboard.saveDo();
	}else{
		backboard.getDevElements().splice(Menu.currentElementIndex, 1);
		backboard.setDevElements(backboard.getDevElements());
		backboard.saveDo();
	}
}