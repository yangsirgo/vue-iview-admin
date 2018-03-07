var Elements = [];//放接口的数组
var DevElements = [];//放logo和板卡的数组
var MoveElements = [];//放选中的设备
var IsMouseDown = false;
var IsSpaceMouseDown = false;
var operType = -1;  //操作类型
var pharsMove = false; //是否可以进行相位移动。
var ColumnPoint = undefined;
var IsCanvasOper = false;
var allMove = false;
var isStart = false;
var isSpaceClick = true;
var MAX_ELE_HEIGHT = 0;//最大元素的高
var MAX_ELE_WIDTH = 0;//最大元素的宽

var initPage = {
    data : {
        tempVariable : {
            element : undefined,
            elementindex : -1,
            currEleId : -1,
            type : 0
        },
        ctrlChoise : false
    },
    init : function(){
        var canvas = BackInfo.getBackCanvas();
        initPage.initCanvasSize(null,null);
        utils.addEventHandler(canvas, "mousedown", operator.doMouseDown);
        utils.addEventHandler(canvas, "mousemove", operator.doMouseMove);
        utils.addEventHandler(canvas, "mouseup", operator.doMouseUp);
        utils.addEventHandler(canvas, "contextmenu", operator.doContextmenu);
        utils.addEventHandler(canvas, "dblclick", operator.doDblclick);
    },

    initCanvasSize : function(x,y){
        if(!x){
            x = 970;
        }
        if(!y){
            y = 761;
        }
         var canvas =  document.getElementById("backplanCanvas");
         canvas.setAttribute('width', x);
         canvas.setAttribute('height', y);
    }
}

$().ready(function(){
    $(document).bind("contextmenu",function(e){
        return false;
    });
    initPage.init();
    jQuery(document).bind('keydown', function(event) {
    if (event.keyCode == "17") {
        initPage.data.ctrlChoise = true;
    }
    });
    jQuery(document).bind('keyup', function(event) {
        if (event.keyCode == "17") {
            initPage.data.ctrlChoise = false;
        }
    });

});

var projectUtil={
        getProjectUrl:function(){
            var curPath = window.document.location.href;// 获取主机地址之后的目录，如：//
            var pathName = window.document.location.pathname;
            var pos = curPath.indexOf(pathName); // 获取主机地址，如： http://localhost:8083
            var localhostPaht = curPath.substring(0, pos); // 获取带"/"的项目名，如：/uimcardprj
            return localhostPaht+"/portal";

        }
    }

var backboard = {

    uniqueArr : function(arr){
        var res = [];
        var json = {};
        for(var i = 0; i < arr.length; i++){
            if(!json[arr[i]]){
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    },

    addBatchDo : function(){
        if(!isStart){
            layer.msg("请先选择设备！",{icon:1});
            return;
        }
        var row = $("#bRow").val();
        var clo = $("#bClo").val();
        var direction = $("#direction").find("span").html() == "横向" ? true:false;
        var upDown = $("#upDown").val();
        var leRi = $("#leRi").val();
        var startIndex = $("#startIndex").val();
        var interval = $("#interval").val();
        var iconType = $("#bIndexType").find("span:last").html();
        var bUpdown = $("#bUpdown").html() == "向上" ? "up":"down";
        var reversal = $(".switchWrap").find("p").attr("class") == "on" ? true:false;
        if(!backboard.validateParm(row,clo,upDown,leRi,startIndex,interval)){
            return;
        }
        var temp1 = 0;
        var temp2 = 0;
        //横向生成
        if(direction){
            for(var j = 0 ;j < row; j++){
                var b = j % 2
                if(reversal){
                    if(b == 0){
                        for(var i=0; i < clo; i ++){
                            var imgSrc = "../images/backboard/interface/"+iconType+".gif";
                            console.log(icontype);
                            var backPortb = new BackPort(BackInfo.getBackCanvasContext(), imgSrc, temp1, temp2,
                                true,icontype.textContent,bUpdown,"自定义",bUpdown,null,startIndex,"0","1","1","");
                            Elements.push(backPortb);
                            var indexEle = Elements.length - 1;
                            operator.wrapArr(indexEle)

                            temp1 = temp1 + Number(upDown);
                            startIndex = Number(startIndex) + Number(interval);
                        }
                    }else{
                        for(var i=0; i < clo; i ++){
                            var imgSrc = "../images/backboard/interface/"+iconType+".gif";
                            var backPortb = new BackPort(BackInfo.getBackCanvasContext(), imgSrc, temp1, temp2,
                                true,icontype.textContent,bUpdown == "up"?"down":"up","自定义",bUpdown == "up"?"down":"up",null,startIndex,"0","1","1","");
                            Elements.push(backPortb);
                            var indexEle = Elements.length - 1;
                            operator.wrapArr(indexEle)
                            temp1 = temp1 + Number(upDown);
                            startIndex = Number(startIndex) + Number(interval);
                        }
                    }

                }else{
                    for(var i=0; i < clo; i ++){
                        var imgSrc = "../images/backboard/interface/"+iconType+".gif";
                        var backPortb = new BackPort(BackInfo.getBackCanvasContext(), imgSrc, temp1, temp2,
                            true,icontype.textContent,bUpdown,"自定义",bUpdown,null,startIndex,"0","1","1","");
                        Elements.push(backPortb);
                        var indexEle = Elements.length - 1;
                        operator.wrapArr(indexEle)
                        temp1 = temp1 + Number(upDown);
                        startIndex = Number(startIndex) + Number(interval);
                    }
                }

                temp2 = temp2 + Number(upDown);
                temp1 = 0;
            }
        }else{
            //纵向生成
            if(reversal){

                for(var j = 0 ;j < clo; j++){

                        for(var i=0; i < row; i ++){
                            var b = i % 2
                            if(b == 0){
                                var imgSrc = "../images/backboard/interface/"+iconType+".gif";
                                var backPortb = new BackPort(BackInfo.getBackCanvasContext(), imgSrc, temp2, temp1,
                                    true,icontype.textContent,bUpdown,"自定义",bUpdown,null,startIndex,"0","1","1","");
                                Elements.push(backPortb);
                                var indexEle = Elements.length - 1;
                                operator.wrapArr(indexEle)
                                startIndex = Number(startIndex) + Number(interval);
                                temp1 = temp1 + Number(upDown);
                            }else{
                                var imgSrc = "../images/backboard/interface/"+iconType+".gif";
                                var backPortb = new BackPort(BackInfo.getBackCanvasContext(), imgSrc, temp2, temp1,
                                    true,icontype.textContent,bUpdown == "up"?"down":"up","自定义",bUpdown,null,startIndex,"0","1","1","");
                                Elements.push(backPortb);
                                var indexEle = Elements.length - 1;
                                operator.wrapArr(indexEle)
                                startIndex = Number(startIndex) + Number(interval);
                                temp1 = temp1 + Number(upDown);
                            }
                        }
                        temp1 = 0;
                        temp2 = temp2 + Number(upDown);

                }

            }else{
                for(var j = 0 ;j < clo; j++){
                    for(var i=0; i < row; i ++){
                        var imgSrc = "../images/backboard/interface/"+iconType+".gif";
                        var backPortb = new BackPort(BackInfo.getBackCanvasContext(), imgSrc, temp2, temp1,
                            true,icontype.textContent,bUpdown,"自定义",bUpdown,null,startIndex,"0","1","1","");
                        Elements.push(backPortb);
                        var indexEle = Elements.length - 1;
                        operator.wrapArr(indexEle);

                        startIndex = Number(startIndex) + Number(interval);
                        temp1 = temp1 + Number(upDown);
                    }
                    temp1 = 0;
                    temp2 = temp2 + Number(upDown);
                }
            }

        }
        closeIdentifyPop(".interfaceLayout");
        backboard.drawTopo();
        backboard.drawHeightRect();
    },
    drawHeightRect : function(){
        for(var p in MoveElements){
            var indexEle = MoveElements[p];
            BackInfo.getBackCanvasContext().strokeStyle="#ffff00";
            BackInfo.getBackCanvasContext().strokeRect(Elements[indexEle].centerX,Elements[indexEle].centerY,Elements[indexEle].img.width,Elements[indexEle].img.height);
        }

    },


    validateParm :  function(row,clo,upDown,leRi,startIndex,interval){
        if(!backboard.isPInt(row)){
            layer.msg("行请输入整数",{icon:1});
            return false;
        }
        if(!backboard.isPInt(clo)){
            layer.msg("列请输入整数",{icon:1});
            return false;
        }
        if(!backboard.isPInt(upDown)){
            layer.msg("上下间隔请输入整数",{icon:1});
            return false;
        }
        if(!backboard.isPInt(leRi)){
            layer.msg("左右间隔请输入整数",{icon:1});
            return false;
        }
        if(!backboard.isPInt(startIndex)){
            layer.msg("起始索引请输入整数",{icon:1});
            return false;
        }
        if(!backboard.isPInt(interval)){
            layer.msg("索引差值请输入整数",{icon:1});
            return false;
        }
        return true;
    },

    warpZNType : function(str){
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
    },

    warpIconType : function(str){
        var data;
        if(str == "ethernet"){
            var iconTempL = $("#bIndexType").find("ul:last");
            iconTempL.html("");
            data = discoverbackplan.data.ethernet;
            for(var i in data){
                iconTempL.append('<li><a  href="#">'+data[i]+'</a></li>');
            }
        }else if(str == "optical"){
            var iconTempL = $("#bIndexType").find("ul:last");
            iconTempL.html("");
            data = discoverbackplan.data.optical;
            for(var i in data){
                iconTempL.append('<li><a  href="#">'+data[i]+'</a></li>');
            }
        }else if(str == "console"){
            var iconTempL = $("#bIndexType").find("ul:last");
            iconTempL.html("");
            data = discoverbackplan.data.console;
            for(var i in data){
                iconTempL.append('<li><a  href="#">'+data[i]+'</a></li>');
            }
        }else{//other
            var iconTempL = $("#bIndexType").find("ul:last");
            iconTempL.html("");
            data = discoverbackplan.data.other;
            for(var i in data){
                iconTempL.append('<li><a  href="#">'+data[i]+'</a></li>');
            }
        }
    },

    addBatchCancle : function(){
        closeIdentifyPop(".interfaceLayout");
    },

    addBatch : function(){
        $("#bRow").val("");
        $("#bClo").val("");
        $("#upDown").val("30");
        $("#leRi").val("30");
        $("#startIndex").val("1");
        $("#interval").val("1");
        $(".interfaceLayout").show();
        backboard.warpIconType("ethernet");
        $("#bIndexType").find("ul:first").find("a").bind("click",function(obj){
            backboard.warpIconType(obj.currentTarget.attributes.name.value);
        });
    },

    editPort : function(){
        var pindex = $("#pindex").val();
        var pUpdown = $("#pUpdown").html();
        var icontype = $("#icontype").html();
        if(!backboard.isPInt(pindex)){
            layer.msg("起始索引请输入整数",{icon:1});
            return;
        }
        var pUpdownEN = backboard.formatUpdownEN(pUpdown);
        Elements[Menu.currentElementIndex].ifIndex = pindex;
        Elements[Menu.currentElementIndex].otherType = Elements[Menu.currentElementIndex].up_down;
        Elements[Menu.currentElementIndex].icontype = icontype;
        Elements[Menu.currentElementIndex].up_down = pUpdownEN;
        closeIdentifyPop(".interfaceEdit");
        initPage.data.tempVariable.type = 3;
        backboard.saveDo();
    },

    formatUpdownEN : function(str){
        if(str == "向上"){
            return "up";
        }else if(str == "向下"){
            return "down";
        }else if(str == "向左"){
            return "left";
        }else if(str == "向右"){
            return "right";
        }else{
            return "up";
        }
    },
    isPInt : function(str) {
        var g=/^-?\d+$/;
        return g.test(str);
    },

    canclePort : function(){
        closeIdentifyPop(".interfaceEdit");
    },

    save : function(){
        if(!isStart){
            layer.msg("请先选择设备",{icon:1});
            return;
        }
        initPage.data.tempVariable.type = 2;
        openconfirmwindow("提示", "你确定要保存吗?", backboard.saveDo);
    },

    saveDo : function(){
        var tempTyep = "";
        if(initPage.data.tempVariable.type == 1){
            tempTyep = "删除";
        }else if(initPage.data.tempVariable.type == 2){
            tempTyep = "保存";
        }else if(initPage.data.tempVariable.type == 3){
            tempTyep = "修改";
        }
        var jsonString = backboard.wrapSaveRequestData();
        console.log(jsonString)
        $.ajax({
            url: saveBackboard,
            type: 'post',
            data:{
                _csrf: csrfValue,
                jsonString:jsonString
            },
            success: function(data){
                console.log(data)
                if(data && ""+data.success == "true"){
                    layer.msg(""+tempTyep+"成功!",{icon:1});
                    //刷新当前背板
                }else{
                    layer.msg(""+tempTyep+"失败!",{icon:2});
                }
                backboard.getBackInfoById(initPage.data.tempVariable.currEleId, $("#tSystemOid").html());
                closeWindow();
            },
            error : function(data){
                console.log(data)
                layer.msg(""+tempTyep+"失败!",{icon:2});
                closeWindow();
            }
        });
    },

    wrapSaveRequestData : function(){
        var tIp = $("#tIp").html();
        var tDevName = $("#tDevName").html();
        var tChangs = $("#tChangs").html();
        var tDevType = $("#tDevType").attr("name");
        var tSystemOid = $("#tSystemOid").html();
        if(tIp){
            tIp = tIp.split("：")[1];
        }else{
            tIp = "";
        }
        if(tDevName){
            tDevName = tDevName.split("：")[1];
        }else{
            tDevName = "";
        }
        if(tChangs){
            tChangs = tChangs.split("：")[1];
        }else{
            tChangs = "";
        }
        if(!tDevType){
            tDevType = "";
        }
        var deviceimageList = "";
        if(DevElements.length > 0){
            for(var i in DevElements){
                var img = backboard.saveImgFormat(DevElements[i].imgsrc);
                if(DevElements[i].type == "upload"){
                    img = DevElements[i].imgsrc;
                }
                if(i == DevElements.length -1){
                    deviceimageList += "{\"type\":\""+DevElements[i].type+"\",\"image\":\""+img+"\","+
                    "\"x\":\""+DevElements[i].centerX+"\",\"y\":\""+DevElements[i].centerY+"\"}";
                }else{
                    deviceimageList += "{\"type\":\""+DevElements[i].type+"\",\"image\":\""+img+"\","+
                    "\"x\":\""+DevElements[i].centerX+"\",\"y\":\""+DevElements[i].centerY+"\"},";
                }
            }
        }

        var portList = "";
        if(Elements.length > 0){
            for(var i in Elements){
                if(i == Elements.length -1){
                    portList += "{\"withIf\":"+Elements[i].withIf+",\"it\":"+backboard.savePortItFormat(Elements[i])+","+
                    "\"icontype\":\""+Elements[i].icontype+"\",\"up_down\":\""+Elements[i].up_down+"\","+
                    "\"x\":\""+Elements[i].centerX+"\",\"y\":\""+Elements[i].centerY+"\",\"image\":\""+backboard.saveImgFormat(Elements[i].imgsrc)+"\","+
                    "\"title\":\""+Elements[i].title+"\",\"otherType\":\""+Elements[i].otherType+"\",\"otherStatus\":"+Elements[i].otherStatus+"}";
                }else{
                    portList += "{\"withIf\":"+Elements[i].withIf+",\"it\":"+backboard.savePortItFormat(Elements[i])+","+
                    "\"icontype\":\""+Elements[i].icontype+"\",\"up_down\":\""+Elements[i].up_down+"\","+
                    "\"x\":\""+Elements[i].centerX+"\",\"y\":\""+Elements[i].centerY+"\",\"image\":\""+backboard.saveImgFormat(Elements[i].imgsrc)+"\","+
                    "\"title\":\""+Elements[i].title+"\",\"otherType\":\""+Elements[i].otherType+"\",\"otherStatus\":"+Elements[i].otherStatus+"},";
                }
            }
        }

        return "{\"deviceimageList\":["+deviceimageList+"],\"ledList\":[],\"portList\":["+portList+"]"+
                ",\"textList\":[],\"systemOid\":\""+tSystemOid+"\",\"ip\":\""+tIp+"\",\"deviceName\":\""+tDevName+"\""+
                ",\"deviceVendor\":\"\",\"deviceType\":\""+tDevType+"\"}";
    },

    savePortItFormat : function(obj){
        if(obj){
            var str = "{\"ifIndex\":\""+obj.ifIndex+"\",\"ifType\":\""+obj.ifType+"\",\"ifAdminStatus\":\""+obj.ifAdminStatus+"\","+
                      "\"ifOperStatus\":\""+obj.ifOperStatus+"\",\"ifDescr\":\""+obj.ifDescr+"\"}";
            return str;
        }
    },

    saveImgFormat : function(img){
        if(img){
            img = img.split("backboard/")[1];
            return img;
        }
    },

    addElement : function(obj){
        if(!isStart){
            layer.msg("请先选择设备",{icon:1});
            return;
        }
        if(obj){
            if(obj.indexOf("logo") != -1){
                var imgSrc = backboard.makeAEImg(obj);
                var devImg = new DevImg(BackInfo.getBackCanvasContext(),imgSrc,0,0,"logo");
                DevElements.push(devImg);
            }
            if(obj.indexOf("pkg_module") != -1){
                var imgSrc = backboard.makeAEImg(obj);
                var devImg = new DevImg(BackInfo.getBackCanvasContext(),imgSrc,0,150,"chassis");
                DevElements.unshift(devImg);
            }
            if(obj.indexOf("interface") != -1){
                var imgSrc = backboard.makeAEImg(obj);
                var icontype = backboard.makeIcontype(obj);
                var backPort = new BackPort(BackInfo.getBackCanvasContext(), imgSrc, 0, 0,
                true,icontype,"up","自定义","up",null,"0","0","1","1","")
                Elements.push(backPort);
            }
            if(obj.indexOf("upload") != -1){
                var imgSrc = backboard.makeCustomImg(obj);
                var devImg = new DevImg(BackInfo.getBackCanvasContext(),imgSrc,0,150,"upload");
                DevElements.push(devImg);
            }
            backboard.drawTopo();
        }
    },

    getBackInfoById:function(devId, systemOid){
        console.log(devId)
        console.log(systemOid)
        isStart = true;
        if(devId){
            initPage.data.tempVariable.currEleId = devId;
            initPage.data.tempVariable.type = 0;
            var context = BackInfo.getBackCanvasContext();
            Elements = [];
            DevElements = [];
            $.ajax({
                url: getBackInfoByDevId,
                type: 'post',
                data:{
                    instanceId: devId,
                    systemOid: systemOid,
                    _csrf: csrfValue
                },
                success: function(data){
                    if(data){
                        data = JSON.parse(data.json);
                        backboard.makeTopTtile(data);
                        //解析背板信息数据，并画出背板
                        backboard.parseBaboInfo(context,data);
                    }
                },
                error : function(data){
                    console.info("ERROR getBackInfoById : "+data);
                }
            });
        }
    },

    parseBaboInfo : function(context,data){
        if(data){
            var devData = data.deviceimageList;
            var portList = data.portList;
            if(devData.length > 0){
                backboard.pushDevElement(context,devData);
            }
            if(portList.length > 0){
                backboard.pushPortElement(context,portList);
            }
            backboard.drawTopo();
        }else{
            layer.msg("没有获取到背板信息",{icon:1});
            Elements = [];
            DevElements = [];
            backboard.drawTopo();
        }
    },

    makeTopTtile : function(data){
        if(data){
            var topStr = $(".backboard_info").html("");
            if(data.ip){
                topStr.append("<p id='tIp'>IP地址："+data.ip+"</p>");
            }
            if(data.deviceName){
                topStr.append("<p id='tDevName'>资源名称："+data.deviceName+"</p>");
            }
            if(data.changs){
                topStr.append("<p id='tChangs'>厂商："+data.changs+"</p>");
            }
            if(data.deviceType){
                topStr.append("<p id='tDevType' name="+data.deviceType+">设备类型："+discoverbackplan.formatDevType(data.deviceType)+"</p>");
            }
            if(data.deviceType){
                topStr.append("<p id='tSystemOid' style='display:none'>"+data.systemOid+"</p>");
            }
        }
    },

    makeAEImg : function(obj){
        console.log(obj)
        return obj;
    },

    makeCustomImg : function(obj){
        var temp = obj.split("upload");
        return "upload"+temp[1];
    },

    makeIcontype: function(obj){
        var temp = obj.split("interface/")[1].split(".")[0];
        return temp;
    },

    getBackboardinfo : function(){

        var context = BackInfo.getCanvasContext();
        if (Menu.topoEditAuthCode == 0) {
            return;
        }
        $.ajax({
            url: gettopodatapath,
            type: 'post',
            success: function(data){
                var topoJson=data.topoJson;
                var customJson=data.customJson;
                var globelSetting=data.globelSetting;

//                Elements = [];
                if(customJson)
                    backboard.pushToElement(context,customJson);

                if(topoJson)
                    backboard.pushToElements(context,topoJson);


                //获取拓扑设置的全局参数
                if(globelSetting){
                    TopoGlobelSetting.setElement(globelSetting,backboard.callBackFunc);
                }

            },
            error : function(data){
                console.info(data);
            }

        });
    },

    pushPortElement:function(context,data){
        for(var i =0;i<data.length;i++){
            var imgSrc = backboard.setImgSrc(data[i].image);
            var backPort = new BackPort(context, imgSrc, data[i].x, data[i].y,
                                    data[i].withIf,data[i].icontype,data[i].up_down,
                                    data[i].title,data[i].otherType,data[i].otherStatus,
                                    data[i].it.ifIndex,data[i].it.ifType,data[i].it.ifAdminStatus,
                                    data[i].it.ifOperStatus,data[i].it.ifDescr)
            Elements.push(backPort);
        }
    },

    pushDevElement:function(context,data){
        if(data!=null){
            for(var i =0;i<data.length;i++){
                var imgSr = backboard.setImgSrc(data[i].image);
                if(data[i].type == "upload"){
                    imgSr = data[i].image;
                }
                var devImg = new DevImg(context,imgSr,data[i].x,data[i].y,data[i].type);
                if(data[i].type == "chassis"){
                    DevElements.unshift(devImg);
                }else if(data[i].type == "logo"){
                    DevElements.push(devImg);
                }else if(data[i].type == "upload"){
                    DevElements.push(devImg);
                }
            }
            for(var i in DevElements){
                if(DevElements[i].img.width > MAX_ELE_WIDTH){
                    MAX_ELE_WIDTH = DevElements[i].img.width;
                }
                if(DevElements[i].img.height > MAX_ELE_HEIGHT){
                    MAX_ELE_HEIGHT = DevElements[i].img.height;
                }
            }
            initPage.initCanvasSize(MAX_ELE_WIDTH * 3,MAX_ELE_HEIGHT * 6);
        }
    },

    setImgSrc : function(imgSr){
        if(imgSr){
            imgSr = ctx + '/skin/blue/images/topology/backboard/' + imgSr;
            return imgSr;
        }
    },

    drawTopo : function(){
        var context = BackInfo.getBackCanvasContext();
        context.clearRect(0, 0, MAX_ELE_WIDTH * 3, MAX_ELE_HEIGHT * 6);
        if(DevElements.length>0){
            for(var i = 0;i<DevElements.length;i++){
                DevElements[i].draw();
            }
        }
        if(Elements.length>0){
            for(var i = 0;i<Elements.length;i++){
                Elements[i].draw();
            }
        }

    },

    setElements : function(subElements){
        Elements = [];
        Elements = subElements;
    },

    getElements : function(){
        return Elements;
    },

    setDevElements : function(subElements){
        DevElements = [];
        DevElements = subElements;
    },

    getDevElements : function(){
        return DevElements;
    },

    getIsCanvasOper : function(){
        return IsCanvasOper
    }
}

var ParamConfig = {
    setOperType : function(type){
        operType = type;
    },

    getOperType : function(type){
        return operType;
    },

    setPharsMove : function(bol){
        pharsMove = bol;
    },

    setAllMove : function(bol){
        allMove = bol;
    }
}

var operator = {


    /**
    * 初始化画布鼠标点击事件
    */
    doMouseDown : function(e) {


//        Menu.removeWindow();
        IsMouseDown = false;
         isSpaceClick = true;
        var x = e.clientX;
        var y = e.clientY;

        var canvas = BackInfo.getBackCanvas();
        var context = BackInfo.getBackCanvasContext();
        ColumnPoint = utils.getPointOnCanvas(canvas, x, y);

        var keyID = e.keyCode ? e.keyCode : e.which;
        if (keyID === 3) { // 鼠标右键
            return;
        }else{
            Menu.removeMenu();
            Menu.choiseElements = [];
        }

        if(pharsMove){
            operType = -1;
        }
        //按crtl健选择设备
        if(initPage.data.ctrlChoise){
            for(var i=Elements.length-1;i>=0;i--){
                if(Elements[i].IsIncludePoint(ColumnPoint)){
                    IsMouseDown = true;
                    if(operator.wrapArr(i)){
                        BackInfo.getBackCanvasContext().strokeStyle="#ffff00";
                        BackInfo.getBackCanvasContext().strokeRect(Elements[i].centerX,Elements[i].centerY,Elements[i].img.width,Elements[i].img.height);
                    }else{
                        BackInfo.getBackCanvasContext().strokeStyle="#000";
                        BackInfo.getBackCanvasContext().strokeRect(Elements[i].centerX,Elements[i].centerY,Elements[i].img.width,Elements[i].img.height);
                    }
                    break;
                }
            }
            return;
        }
        for(var i=Elements.length-1;i>=0;i--){
            if(Elements[i].IsIncludePoint(ColumnPoint)){
                IsMouseDown = true;
                initPage.data.tempVariable.element = Elements[i];
                initPage.data.tempVariable.elementindex = i;
                break;
            }
        }
        if(!IsMouseDown){
            for(var i=DevElements.length-1;i>=0;i--){
                if(DevElements[i].IsIncludePoint(ColumnPoint)){
                    IsMouseDown = true;
                    initPage.data.tempVariable.element = DevElements[i];
                    initPage.data.tempVariable.elementindex = i;
                    break;
                }
            }
        }


    },

    wrapArr : function(i){
        var temp = $.inArray(i, MoveElements)
        if(temp > -1){
            MoveElements.splice(temp,1);
            return false;
        }else{
            MoveElements.push(i);
            return true;
        }

    },

    /**
    * 初始化画布鼠标移动事件
    */
    doMouseMove : function(e){
        MoveElements = backboard.uniqueArr(MoveElements);
        var canvas = BackInfo.getBackCanvas();
        var newColumnPoint = utils.getPointOnCanvas(canvas, e.clientX, e.clientY);


        //多接口拖动
        if(IsMouseDown && MoveElements.length > 0){
            var pharsX = newColumnPoint.x - ColumnPoint.x;
            var pharsY = newColumnPoint.y - ColumnPoint.y;
            var canvas = BackInfo.getBackCanvas();
                var newColumnPoint = utils.getPointOnCanvas(canvas, e.clientX, e.clientY);
                var pharsX = newColumnPoint.x - ColumnPoint.x;
                var pharsY = newColumnPoint.y - ColumnPoint.y;
            for(var p in MoveElements){
                var currEle = Elements[MoveElements[p]];

                currEle.centerX = currEle.centerX + pharsX;
                currEle.centerY = currEle.centerY + pharsY;

            }
            ColumnPoint.x = ColumnPoint.x +    pharsX;
            ColumnPoint.y = ColumnPoint.y +    pharsY;
            backboard.drawTopo();
            isSpaceClick = false;
        }else if(IsMouseDown && initPage.data.tempVariable.elementindex != -1){
            //单设备拖动
            var pharsX = newColumnPoint.x - ColumnPoint.x;
            var pharsY = newColumnPoint.y - ColumnPoint.y;
            var currEle = initPage.data.tempVariable.element;
            var canvas = BackInfo.getBackCanvas();
            var newColumnPoint = utils.getPointOnCanvas(canvas, e.clientX, e.clientY);
            var pharsX = newColumnPoint.x - ColumnPoint.x;
            var pharsY = newColumnPoint.y - ColumnPoint.y;
            ColumnPoint.x = ColumnPoint.x +    pharsX;
            ColumnPoint.y = ColumnPoint.y +    pharsY;
            currEle.centerX = currEle.centerX + pharsX;
            currEle.centerY = currEle.centerY + pharsY;
            backboard.drawTopo();
        }
     },
    /**
    * 初始化画布鼠标松开事件
    */
    doMouseUp : function(e){

        var canvas = BackInfo.getBackCanvas();
        Point = utils.getPointOnCanvas(canvas, e.clientX, e.clientY);

        if(IsMouseDown){
            IsMouseDown = false;
            initPage.data.tempVariable.elementindex = -1;
            if(!isSpaceClick){
                MoveElements = [];
            }
        }

    },

    /**
    * 初始化画布双击事件
    */
    doDblclick : function(e){},

    /**
    * 初始化鼠标右键
    */
    doContextmenu : function (e) {
        Menu.show(e);
        return false;
    }
}