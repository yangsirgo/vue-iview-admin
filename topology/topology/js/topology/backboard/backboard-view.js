var Elements = []; // 放接口的数组
var DevElements = []; // 放logo和板卡的数组
var IsMouseDown = false;
var IsSpaceMouseDown = false;
var operType = -1; // 操作类型
var pharsMove = false; // 是否可以进行相位移动。
var ColumnPoint = undefined;
var IsCanvasOper = false;
var allMove = false;
var MAX_ELE_HEIGHT = 0; // 最大元素的高
var MAX_ELE_WIDTH = 0; // 最大元素的宽
var portInfoList = {}

var ipmacTable = null; //ipmac列表
var lastImg = null;
var flagdata = false;
var settime;
var backboard = {
    getBackInfoById: function(devId, systemOid, ip, data) {
        closeLodingWindow();
        $("#hidip").val(ip);
        $("#hiddevip").val(devId);
        loadingwindow(ctx, 300, 50, '正在加载中，点击左侧图片关闭');
        $(".loadingimg").bind("click", function() {
            closeLodingWindow();
            $(".openwindowtitleclose").click();
        })
        if (devId) {
            initPage.data.tempVariable.currEleId = devId;
            initPage.data.tempVariable.type = 0;
            var context = backboard.getBackCanvasContext();
            Elements = [];
            DevElements = [];

            $.ajax({
                url: getBackInfoByDevId,
                type: 'post',
                timeout: 300000,
                // 超时时间设置，单位毫秒
                dataType: "json",
                data: {
                    instanceId: devId,
                    systemOid: systemOid,
                    ip: ip,
                    _csrf: csrfValue
                },
                success: function(data) {
                    if (data && data.json) {
                        var backboardData = JSON.parse(data.json);
                        backboard.makeTopTtile(backboardData);
                        backboard.makeBootomStatus(backboardData);
                        backboard.parseBaboInfo(context, backboardData);
                        backboard.getInterfaceList($("#hiddevip").val(), $("#hidip").val());
                        var version=data.version;
                        $("#snmptype").val(version);
                        $("#instanceId").val(data.instanceId);
                        closeLodingWindow();
                        settime = window.setInterval(function(){
                            backboard.getInterfaceList($("#hiddevip").val(), $("#hidip").val());
                        }, 60000);
                    } else {
                        layer.msg("暂时无法获取背板数据",{icon:1});
                        closeLodingWindow();
                    }
                },
                error: function(data) {
                    layer.msg("暂时无法获取背板数据",{icon:1});
                    closeLodingWindow()
                }
            });
        }
    },

    getInterfaceList: function(devId, ip) {
        $.ajax({
            url: devport,
            type: 'post',
            timeout: 60000,
            // 超时时间设置，单位毫秒
            dataType: "json",
            data: {
                instanceId: devId,
                ip: ip,
                _csrf: csrfValue
            },
            success: function(data) {
                if (data) {
                    //悬浮使用
                    portInfoList = data.interfaceList;
                    //数量统计
                    var onlineNum = 0;
                    var offlineNum = 0;
                    var downNum = 0;
                    for (var i = 0; i < Elements.length; i++) {
                        if(JSON.stringify(portInfoList) != "{}"){
                            var devicestatus = portInfoList[Elements[i].ifIndex]["status"]["状态"];
                            if (devicestatus == 0) {
                                offlineNum = offlineNum + 1;
                                Elements[i].setImgsrc(Elements[i].imgsrc.replace("green","normal").replace("red","normal"));
                            }else if(devicestatus == 1){
                                onlineNum = onlineNum+1;
                                Elements[i].setImgsrc(Elements[i].imgsrc.replace("normal","green").replace("red","green"));
                            }else{
                                downNum =downNum+1;
                                Elements[i].setImgsrc(Elements[i].imgsrc.replace("green","red").replace("normal","red"));
                            }
                            $("#online").find("span").html('在线(' + onlineNum + ')');
                            $("#offline").find("span").html('离线(' + offlineNum + ')');
                            $("#unkown").find("span").html('关闭(' + downNum + ')');
                        }else{}
                    }
                    backboard.drawTopo();
                }
            },
            error: function(data) {
                layer.msg("背板接口信息获取失败",{icon:2});
            }
        });
    },

    parseBaboInfo: function(context, data) {
        if (JSON.stringify(data) != "{}") {
            $(".backboard_status").show();
            $(".backboard_canvas").removeClass('port_noreportdata');
            var devData = data.deviceimageList;
            var portList = data.portList;
            if (devData.length > 0) {
                backboard.pushDevElement(context, devData);
            }

            if (portList.length > 0) {
                backboard.pushPortElement(context, portList);
            }
            backboard.drawTopo();
        } else {
            layer.msg("没有获取到背板信息",{icon:1});
            $(".backboard_status").hide();
            $(".backboard_canvas").addClass('port_noreportdata');
            Elements = [];
            DevElements = [];
            backboard.drawTopo();
        }
    },
    makeBootomStatus: function(data) {
        if (data) {
            if (data.onlineNum) {
                $("#online").find("span").html('在线(' + data.onlineNum + ')');
            }
            if (data.offlineNum) {
                $("#offline").find("span").html('离线(' + data.offlineNum + ')');
            }
            if (data.downNum) {
                $("#unkown").find("span").html('关闭(' + data.downNum + ')');
            }
        }
    },
    makeTopTtile: function(data) {
        if (data) {
            var topStr = $(".backboard_info").html("");
            topStr.append("<ul style=\"float: left\">")
            if (data.ip) {
                topStr.append("<li id='tIp' class=\"port\">IP地址：" + data.ip + "</li>");
            }
            if (data.deviceName) {
                topStr.append("<li  id='tDevName' class=\"port\">设备名称：" + data.deviceName + "</li>");
            }
            if (data.changs) {
                topStr.append("<li  id='tDeviceVendor' class=\"port\">厂商：" + data.deviceVendor + "</li></ul>");
            }
            if (data.deviceType) {
                topStr.append("<li  id='tDevType' name=" + data.deviceType + " class=\"port\">设备类型：" + backboard.formatDevType(data.deviceType) + "</li>");
            }
            if (data.systemOid) {
                topStr.append("<li  id='tSystemOid' name="+data.systemOid+" class=\"port\">OID：" + data.systemOid + "</li>");
            }
            topStr.append("</ul>")
        }
    },

    makeAEImg: function(obj) {
        var temp = obj.split("si_topology");
        return ".." + temp[1];
    },

    makeCustomImg: function(obj) {
        var temp = obj.split("upload");
        return "upload" + temp[1];
    },

    makeIcontype: function(obj) {
        var temp = obj.split("interface/")[1].split(".")[0];
        return temp;
    },

    pushPortElement: function(context, data) {
        for (var i = 0; i < data.length; i++) {
            var imgSrc = backboard.setImgSrc(data[i].image);
            if(""+data[i].withIf=="true"){
                var backPort = new BackPort(context, imgSrc, data[i].x, data[i].y, data[i].withIf, data[i].icontype, data[i].up_down, data[i].title, data[i].otherType, data[i].otherStatus, data[i].it.ifIndex, data[i].it.ifType, data[i].it.ifAdminStatus, data[i].it.ifOperStatus, data[i].it.ifDescr)
                Elements.push(backPort);
            }
        }
    },

    pushDevElement: function(context, data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                var imgSr = backboard.setImgSrc(data[i].image);
                if (data[i].type == "upload") {
                    imgSr = data[i].image;
                }
                var devImg = new DevImg(context, imgSr, data[i].x, data[i].y, data[i].type);
                if (data[i].type == "chassis") {
                    DevElements.unshift(devImg);
                } else if (data[i].type == "logo") {
                    DevElements.push(devImg);
                } else if (data[i].type == "upload") {
                    DevElements.push(devImg);
                }
            }
            for (var i in DevElements) {
                if (DevElements[i].img.width > MAX_ELE_WIDTH) {
                    MAX_ELE_WIDTH = DevElements[i].img.width;
                }
                if (DevElements[i].img.height > MAX_ELE_HEIGHT) {
                    MAX_ELE_HEIGHT = DevElements[i].img.height;
                }
            }
            initPage.initCanvasSize(MAX_ELE_WIDTH, MAX_ELE_HEIGHT);
        }
    },

    setImgSrc: function(imgSr) {
        if (imgSr) {
            imgSr = ctx + '/skin/blue/images/topology/backboard/' + imgSr;
            return imgSr;
        }
    },

    drawTopo: function() {
        var context = backboard.getBackCanvasContext();
        context.clearRect(0, 0, MAX_ELE_WIDTH * 3, MAX_ELE_HEIGHT * 6);
        if (DevElements.length > 0) {
            for (var i = 0; i < DevElements.length; i++) {
                DevElements[i].draw();
            }
        }
        var t=setTimeout("if (Elements.length > 0) {for (var i = 0; i < Elements.length; i++) {Elements[i].draw();}}",100)
    },

    getPortInfoList: function() {
        return portInfoList;
    },

    setElements: function(subElements) {
        Elements = [];
        Elements = subElements;
    },

    getElements: function() {
        return Elements;
    },

    setDevElements: function(subElements) {
        DevElements = [];
        DevElements = subElements;
    },

    getDevElements: function() {
        return DevElements;
    },

    getIsCanvasOper: function() {
        return IsCanvasOper
    },

    getBackCanvas: function() {
        var canvas = document.getElementById("veiw_backboard_canvas");
        return canvas
    },

    getBackCanvasContext: function() {
        return backboard.getBackCanvas().getContext("2d");
    },

    formatDevType: function(devType) {
        var reType = "其它";
        switch (devType) {
        case "router":
            reType = "路由器";
            break;
        case "routerswitch":
            reType = "三层交换机";
            break;
        case "firewall":
            reType = "防火墙";
            break;
        case "wirelessap":
            reType = "无线AP";
            break;
        case "other":
            reType = "其它";
            break;
        case "switch":
            reType = "交换机";
            break;
        case "server":
            reType = "服务器";
            break;
        case "host":
            reType = "主机";
            break;
        case "storage":
            reType = "存储设备";
            break;
        case "node":
            reType = "非网管";
            break;
        case "ids":
            reType = "IDS";
            break;
        case "NetsSluice":
            reType = "网闸";
            break;
        case "loadbalance":
            reType = "负载均衡";
            break;
        case "camera":
            reType = "摄像设备";
            break;
        default:
            reType = "其它";
            break;
        }
        return reType;
    }
}

var operator = {
    doMouseOut:function(e){
        $("#backboard_port_info").remove();
    },
    /**
     * 初始化画布鼠标划过事件
     */
    doMouseDown: function(e) {
        if($("#backboard_port_info").text() == "暂无数据"){
            $("#backboard_port_info").remove();
            $("#backboard_port_info").html($("#backboard_port_copy").text());
        }else{
            $("#backboard_port_info").remove();
        }
        $(".showrightmess").hide();
        IsMouseDown = false;
        var x = e.clientX;
        var y = e.clientY;

        var canvas = backboard.getBackCanvas();
        var context = backboard.getBackCanvasContext();
        ColumnPoint = utils.getPointOnCanvas(canvas, x, y);

        var keyID = e.keyCode ? e.keyCode : e.which;
        if (keyID === 3) { // 鼠标右键
            return;
        }

        if (pharsMove) {
            operType = -1;
        }

        for (var i = Elements.length - 1; i >= 0; i--) {
            if (Elements[i].IsIncludePoint(ColumnPoint)) {
                IsMouseDown = true;
                initPage.data.tempVariable.element = Elements[i];
                initPage.data.tempVariable.elementindex = i;

                var devId = initPage.data.tempVariable.currEleId;
                var indexid = Elements[i].ifIndex;
                var context = backboard.getBackCanvasContext();
                var data = backboard.getPortInfoList();
                if (!data && data[indexid]) {
                    layer.msg("没有此接口的数据",{icon:1});
                    return;
                }
                var ulstr = "<table>";
                if(data[indexid]){
                    var infoData = data[indexid]["info"];
                    for (var item in infoData) {
                        ulstr += "<tr><td class=\"bblabel\">" + item + "：</td><td class=\"bbtext\">" + infoData[item] + "</td></tr>";
                    }
                    var statusData = data[indexid]["status"];
                    ulstr += "<tr><td class=\"bblabel\" ></td><td class=\"bbtext\"></td></tr>";
                    for (var item in statusData) {
                        var status = "-";
                        if(statusData[item]=='on'){
                            status = "开启"
                        }
                        if(statusData[item]=='down'){
                            status = "关闭"
                        }
                        if(statusData[item]=='1'){
                            status = "在线"
                        }
                        if(statusData[item]=='0'){
                            status = "离线"
                        }
                        if(statusData[item]=='2'){
                            status = "关闭"
                        }
                        ulstr += "<tr><td class=\"bblabel\">" + item + "：</td><td class=\"bbtext\">" + status + "</td></tr>";
                    }
                    var perfData = data[indexid]["perf"];
                    ulstr += "<tr><td class=\"bblabel\></td><td class=\"bbtext\"></td></tr>";
                    for (var item in perfData) {
                        ulstr += "<tr><td class=\"bblabel\">" + item + "：</td><td class=\"bbtext\">" + perfData[item] + "</td></tr>";
                    }
                    flagdata = false;
                }else{
                    ulstr += "<tr><td class=\"bblabel\"></td><td class=\"bbtext\">暂无数据</td></tr>";
                    flagdata = true;
                }
                ulstr += "</table>";

                $("body").append("<div id=\"backboard_port_info\"></div>");
                $("body").append("<div id=\"backboard_port_copy\"></div>");
                $("#backboard_port_info").css({
                    "left": x + 10,
                    "top": y + 10
                });
                $("#backboard_port_info").append(ulstr);
                $("#backboard_port_copy").html("");
                $("#backboard_port_copy").html(ulstr);
                break;
            }
        }
    },
    /**
     * 初始化画布鼠标点击事件
     */
    doOnClick: function(e) {
        $("#backboard_port_info").remove();
        IsOnClick = false;
        var x = e.clientX;
        var y = e.clientY;
        var canvas = backboard.getBackCanvas();
        var context = backboard.getBackCanvasContext();
        ColumnPoint = utils.getPointOnCanvas(canvas, x, y);

        var keyID = e.keyCode ? e.keyCode : e.which;
        if (keyID === 3) { // 鼠标右键
            if (pharsMove) {
                operType = -1;
            }
            for (var i = Elements.length - 1; i >= 0; i--) {
                if (Elements[i].IsIncludePoint(ColumnPoint)) {
                    if($("#hidcanvasxx").val() == ""){
                        drawCanvas(e,Elements[i].centerX,Elements[i].centerY);
                    }else{
                        var xx = $("#hidcanvasxx").val();
                        var yy = $("#hidcanvasyy").val();
                        clearCanvas(e,xx,yy);
                        drawCanvas(e,Elements[i].centerX,Elements[i].centerY);
                    }
                    $("#hidcanvasxx").val(Elements[i].centerX);
                    $("#hidcanvasyy").val(Elements[i].centerY);
                    IsOnClick = true;
                    initPage.data.tempVariable.element = Elements[i];
                    initPage.data.tempVariable.elementindex = i;
                    var devId = initPage.data.tempVariable.currEleId;
                    var indexid = Elements[i].ifIndex;
                    var indexname = Elements[i].ifDescr;
                    if(indexid){
                            $(".showrightmess").show();
                            $(".showrightmess").css({top:Elements[i].centerY + 70+"px",left:Elements[i].centerX + 20+"px"});
                            //端口开关
                            $(".switchport").off().click(function(event) {
                                if(flagdata){
                                    layer.msg("暂无数据，无法更改开关状态",{icon:2});
                                }else{
                                    loadingwindow(ctx, 200, 50, '加载中...');
                                    showportstatus(devId,indexid);
                                }
                            });
                            $(".showrightmess").mouseleave(function(event) {
                                $(this).hide();
                            });
                            // 端口详情
                            $(".detailport").off().click(function(event) {
                                loadingwindow(ctx, 200, 50, '加载中...');
                                showportsipmac(devId,indexname);
                            });
                    }
                    break;
                }
            }
        } else {
            $(".showrightmess").hide();
            for (var i = Elements.length - 1; i >= 0; i--) {
                if (Elements[i].IsIncludePoint(ColumnPoint)) {
                    if($("#hidcanvasxx").val() == ""){
                        drawCanvas(e,Elements[i].centerX,Elements[i].centerY);
                    }else{
                        var xx = $("#hidcanvasxx").val();
                        var yy = $("#hidcanvasyy").val();
                        clearCanvas(e,xx,yy);
                        drawCanvas(e,Elements[i].centerX,Elements[i].centerY);
                    }
                    $("#hidcanvasxx").val(Elements[i].centerX);
                    $("#hidcanvasyy").val(Elements[i].centerY);
                }
            }
        }
    },

    wrapPortStatusZN: function(str) {
        if (str == "1") {
            return "在线";
        } else if (str == "2") {
            return "离线";
        } else {
            return "未知";
        }
    }
}

var initPage = {
    data: {
        tempVariable: {
            element: undefined,
            elementindex: -1,
            currEleId: -1,
            type: 0
        }
    },
    init: function() {
        var canvas = backboard.getBackCanvas();
        initPage.initCanvasSize(null, null);
        utils.addEventHandler(canvas, "mousemove", operator.doMouseDown);
        utils.addEventHandler(canvas, "mouseout", operator.doMouseOut);
        utils.addEventHandler(canvas, "mousedown", operator.doOnClick);
    },
    initCanvasSize: function(x, y) {
        var canvas = document.getElementById("veiw_backboard_canvas");
        if (!x) {
            x = 970;
        }
        canvas.setAttribute('width', x);
        if (!y) {
            y = 760;
        }
        canvas.setAttribute('height', y);
    }
}

$().ready(function() {
    $(document).bind("contextmenu", function(e) {
        return false;
    });
    initPage.init();
    $(".openwindowtitleclose").click(function(){
        window.clearInterval(settime);
    })
});

var projectUtil = {
    getProjectUrl: function() {
        var curPath = window.document.location.href; // 获取主机地址之后的目录，如：//
        var pathName = window.document.location.pathname;
        var pos = curPath.indexOf(pathName); // 获取主机地址，如：
        var localhostPaht = curPath.substring(0, pos); // 获取带"/"的项目名，如：/uimcardprj
        return localhostPaht + "/nocportal";
    }
}

var ParamConfig = {
    setOperType: function(type) {
        operType = type;
    },

    getOperType: function(type) {
        return operType;
    },

    setPharsMove: function(bol) {
        pharsMove = bol;
    },

    setAllMove: function(bol) {
        allMove = bol;
    }
}

//弹出修改状态窗口或者提示该端口未监控
function showportstatus(devId,indexid){
    var title = "端口开关";
       var width = 500;
    var height = 266;
    var version=$("#snmptype").val();
    $.ajax({
        url: ctx+"/network/backboard/portSet.do",
        type: 'get',
        timeout: 60000,
        // 超时时间设置，单位毫秒
        data: {
            instanceId: devId,
            indexid: indexid,
            version: version,
            ip: deviceip
        },
        success: function(msg) {
            closeLodingWindow();
            openwindow(title ,width ,height ,msg ,"portsetted");
        },
        error: function(data) {
            closeLodingWindow();
        }
    });
}

//弹出修改状态窗口或者提示该端口未监控
function showportsipmac(devId,indexid){
    var title = "端口详情 "+indexid;
    var width = 1000;
    var height = 500;
    $.ajax({
        url: ctx+"/network/backboard/ipmacview.do",
        type: 'get',
        timeout: 60000,
        // 超时时间设置，单位毫秒
        data: {
            instanceId: devId,
            indexid: indexid,
            ip: deviceip
        },
        success: function(msg) {
            closeLodingWindow();
            openwindow(title ,width ,height ,msg ,"closeWindow");
        },
        error: function(data) {
            closeLodingWindow();
        }
    });
}

function getIpmacTable(ip, indexid) {
    ipmacTable = $('.ipmac-table').DataTable({ //表格初始化
        "ordering": true,
        "paging": false, //关闭分页
        "searching": true, //关闭Datatables的搜索功能:
        "destroy": true, //摧毁一个已经存在的Datatables，然后创建一个新的
        "retrieve": true, //检索已存在的Datatables实例,如果已经初始化了，则继续使用之前的Datatables实例
        "autoWidth": true, //自动计算列宽
        "processing": false, //是否显示正在处理的状态
        "stateSave": true, //开启或者禁用状态储存。当你开启了状态储存，Datatables会存储一个状态到浏览器上， 包含分页位置，每页显示的长度，过滤后的结果和排序。当用户重新刷新页面，表格的状态将会被设置为之前的设置。
        "serverSide": true, //服务器端处理模式——此模式下如：过滤、分页、排序的处理都放在服务器端进行。
        "scrollY": "auto", //控制表格的垂直滚动。
        /*l - Length changing 改变每页显示多少条数据的控件
        f - Filtering input 即时搜索框控件
        t - The Table 表格本身
        i - Information 表格相关信息控件
        p - Pagination 分页控件
        r - pRocessing 加载等待显示信息*/
        "dom": 'rt',
        "stateLoadParams": function(settings, data) { //状态加载完成之后，对数据处理的回调函数
            data.search.search = "";
        },
        "ajax": {
            "beforeSend": function() {},
            "url": ctx + "/network/backboard/portipmac.do",
            //改变从服务器返回的数据给Datatable
            "dataSrc": function(json) {
                if(json.ipmac != null){
                    var data = [];
                    $.each(json.ipmac, function(index, obj) {
                        var ip = dealDatashow(obj.dt)+","+dealDatashow(obj.status)+","+dealDatashow(obj.ismr)+","+dealDatashow(obj.ip)+","+obj.dtn+","+obj.icon;
                        var brands = dealDatashow(obj.dv) +","+ dealDatashow(obj.dvn);
                        var temp = [ip, dealDatashow(obj.mac), brands, dealDatashow(obj.department), dealDatashow(obj.eventCode)];
                        data.push(temp);
                    });
                    return data;
                }
            },
            //将额外的参数添加到请求或修改需要被提交的数据对象
            "data": {
                "ip": ip,
                "indexid": indexid,
                "userid": userid,
                "topoid": curTopoId
            },
        },
        "columnDefs": [{
            "targets": [0],
            "orderable": false,
            "class": "text-ellipsis imgstyle",
            "render": function (data) {
                console.log(data)
                var ip = data.split(",")
                return ipiconmaker(ip)+ip[3];
            }
        },
        {
            "targets": [1],
            "orderable": false,
            "class": "text-ellipsis"
        },
        {
            "targets": [2],
            "orderable": false,
            "class": "text-ellipsis text-center",
            "render": function (data) {
                var data = data.split(",");
                return brandType(data[1],data[0]);
            }
        },
        {
            "targets": [3],
            "orderable": false,
            "class": "text-ellipsis"
        },
        {
            "targets": [4],
            "orderable": false,
            "class": "text-ellipsis",
            "render": function (data) {
                if(data == "正常"){
                    return "<div style='height:22px;width:30px;color:#686869;background:#D9DADB;line-height:22px;text-align:center' title='正常'>"+0+"</div>"
                }else{
                    return "<div style='height:22px;width:30px;color:#fff;background:#F35F6B;line-height:22px;text-align:center' title='"+data+"'>"+data.split(",").length+"</div>"
                }
            }
        }],
        //当每次表格重绘的时候触发一个操作，比如更新数据后或者创建新的元素
        "drawCallback": function(oTable) {
            var table = $('.ipmac-table');
            //设置每一列的title
            $(table).find("tr td:not(:last-child)").each(function(index, obj) {
                $(obj).attr("title", $(obj).text());
            })
        }
    });
}
/**
 * 设备类型在线
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
 function ipiconmaker(obj) {
    if (obj[0] == undefined || obj[0] == "null" || obj[0] == "--") {
        obj[0] = "unknown";
    }
    if (obj[0] == "unknown") {
        if (obj[1] == "0") {
            return "<img src= '" + ctximg + "/device/homeunkonowon_out.png' alt='' title='未知设备(不在监控范围内)' onerror=javascript:this.src='" + ctximg + "/device/unaware_out.png'>";
        } else if (obj[1] == "在线") {
            return "<img src= '" + ctximg + "/device/homeunkonowon.png' alt='' title='未知设备在线' onerror=javascript:this.src='" + ctximg + "/device/unawareonline.png'>";
        } else {
            return "<img src= '" + ctximg + "/device/homeunknownout.png' alt='' title='未知设备离线' onerror=javascript:this.src='" + ctximg + "/device/unawareoutline.png'>";
        }
    } else {
        if(obj[5] == null || obj[5] == "null" || obj[5] == undefined || obj[5] == "undefined"){
            if (obj[1] == "0") {
                return "<img src= '" + ctximg + "/device/online" + obj[0] + "_out.png' alt='' title='" + obj[4] + "(不在监控范围内)' onerror=javascript:this.src='" + ctximg + "/device/unaware_out.png'>";
            } else if (obj[1] == "在线") {
                if(obj[4] == null || obj[4] == "null" || obj[4] == undefined || obj[4] == "undefined"){
                    return "<img src= '" + ctximg + "/device/homeunkonowon.png' alt='' title='未知设备在线' onerror=javascript:this.src='" + ctximg + "/device/unawareonline.png'>";
                }else{
                    return "<img src= '" + ctximg + "/device/online" + obj[0] + ".png' alt='' title='" + obj[4] + obj[1] + "' onerror=javascript:this.src='" + ctximg + "/device/unawareonline.png'>";
                }
            } else {
                if(obj[4] == null || obj[4] == "null" || obj[4] == undefined || obj[4] == "undefined"){
                    return "<img src= '" + ctximg + "/device/homeunknownout.png' alt='' title='未知设备离线' onerror=javascript:this.src='" + ctximg + "/device/unawareoutline.png'>";
                }else{
                    return "<img src= '" + ctximg + "/device/outline" + obj[0] + ".png' alt='' title='" + obj[4] + obj[1] + "' onerror=javascript:this.src='" + ctximg + "/device/unawareoutline.png'>";
                }
            }
        }else{
            if (obj[1] == "0") {
                return "<img src= '" + ctximg + "/device/online" + obj[5] + "_out.png' alt='' title='" + obj[4] + "(不在监控范围内)' onerror=javascript:this.src='" + ctximg + "/device/unaware_out.png'>";
            } else if (obj[1] == "在线") {
                if(obj[4] == null || obj[4] == "null" || obj[4] == undefined || obj[4] == "undefined"){
                    return "<img src= '" + ctximg + "/device/homeunkonowon.png' alt='' title='未知设备在线' onerror=javascript:this.src='" + ctximg + "/device/unawareonline.png'>";
                }else{
                    return "<img src= '" + ctximg + "/device/online" + obj[5] + ".png' alt='' title='" + obj[4] + obj[1] + "' onerror=javascript:this.src='" + ctximg + "/device/unawareonline.png'>";
                }
            } else {
                if(obj[4] == null || obj[4] == "null" || obj[4] == undefined || obj[4] == "undefined"){
                    return "<img src= '" + ctximg + "/device/homeunknownout.png' alt='' title='未知设备离线' onerror=javascript:this.src='" + ctximg + "/device/unawareoutline.png'>";
                }else{
                    return "<img src= '" + ctximg + "/device/outline" + obj[5] + ".png' alt='' title='" + obj[4] + obj[1] + "' onerror=javascript:this.src='" + ctximg + "/device/unawareoutline.png'>";
                }
            }
        }

    }
}
    /**
     * 判断图片是否存在
     * @param {[type]} imgurl [description]
     * 存在返回true，不存在false
     */
    function CheckImgExists(imgurl) {
        var xmlHttp ;
        if (window.ActiveXObject)
         {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
         }
         else if (window.XMLHttpRequest)
         {
          xmlHttp = new XMLHttpRequest();
         }
        xmlHttp.open("Get",imgurl,false);
        xmlHttp.send();
        if(xmlHttp.status==404){
            return false;
        }else{
            return true;
        }
    }
    /**
     * 判断品牌
     * @param  {[type]} titleobj [description]
     * @param  {[type]} obj      [description]
     * @return {[type]}          [description]
     */
    function brandType(titleobj,obj) {
        var url = ctximg+'/device/camera' + obj + '.png';
        if (obj == "--" || obj == undefined || obj == null || obj == "null" || obj == "") {
            return "--";
        } else {
            if(CheckImgExists(url)){
                return "<img src= '" + ctximg + "/device/camera" + obj + ".png' alt='' title='" + titleobj + "'>";
            }else{
                return "<span style='display: inline-block;border-radius: 202px;background-color: #42AFFF;color: #fff;padding-top: 0;height: 20px;line-height: 20px;padding: 0 8px;' title='" + titleobj + "'>"+titleobj+"</span>";
            }
        }
    }
/**
 * 事件
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function typeconmarker_type(obj) {
        var errormess = "";
        var num = 0;
        if (typeof obj == "object") {
            obj = JSON.stringify(obj);
        }
        if (Number(obj.substring(0, obj.length)) > 0) {
            if (obj.substring(0, 1) == "1") {
                errormess += '入侵 ';
                num++;
            } else {}
            if (obj.substring(1, 2) == "1") {
                errormess += 'MAC变化 ';
                num++;
            } else {}
            if (obj.substring(2, 3) == "1") {
                errormess += '类型变化 ';
                num++;
            } else {}
            if (obj.substring(3, 4) == "1") {
                errormess += '指纹变化 ';
                num++;
            } else {}
            if (obj.substring(4, 5) == "1") {
                errormess += '类型失联 ';
                num++;
            }
            if (obj.substring(5, 6) == "1") {
                errormess += '初始口令 ';
                num++;
            }
            if (obj.substring(6, 7) == "1") {
                errormess += '图像质量差';
                num++;
            }
            if (obj.substring(7, 8) == "1") {
                errormess += '离线 ';
                num++;
            }
            if (obj.substring(8, 9) == "1") {
                errormess += '共享网络 ';
                num++;
            }
            if (obj.substring(10, 11) == "1") {
                errormess += '违规外联 ';
                num++;
            }
            var str = "<a href='javaScript:void(0);' data-toggle='tooltip' data-placement='right' title='" + errormess + "'><i style='display:inline-block; height:22px;width:30px;background:#F35F6B;color:#fff;font-weight:bold;text-align:center;font-style:normal;line-height:22px;cursor:default;' class='equitorangex fontsize-14 j-event-view'>" + num + "</i></a>";
            return str;
        } else {
            return "<a href='javaScript:void(0);' data-toggle='tooltip' data-placement='right' title='正常'><i style='display:inline-block; height:22px;width:30px;background:#D9DADB;color:#686869;font-weight:bold;text-align:center;font-style:normal;line-height:22px;cursor:default;' class='equitorangex fontsize-14 j-event-view'>0</i></a>";
        }
    }
function portsetted(){
    openquestionwindow("提示", "是否确定将当前端口关闭/开启?", "saveportstatus");
}
function saveportstatus(){
    loadingwindow(ctx, 200, 50, '正在修改...');
    var instanceId = $('#instanceId').val();
    var value = $('#value').val();
    var indexid = $('#indexid').val();
    var thisValue = "";
    if($('#switch').is(':checked')){
        thisValue = 1;
    }else{
        thisValue = 2;
    }
    if (thisValue == value) {
        layer.msg("接口状态未修改,请重新设置",{icon:2});
        closeLodingWindow();
        closeWindow();
        return;
    }
    var wrcommunity=$.trim($("#wrname").val());
    var version=$("#snmptype").val();
    if("v3"!=version && wrcommunity.length==0 ){
        layer.msg("写共同体名不能为空",{icon:2});
        closeLodingWindow();
        closeWindow();
        return;

    }

    $.get(ctx+"/network/backboard/portSetted.do?instanceId=" + instanceId + "&ip=" + deviceip + "&value=" + value+ "&thisValue=" + thisValue + "&indexid="+indexid+"&wrcommunity="+wrcommunity, function(data){
        closeLodingWindow();
        closeWindow();
        if(data.nochg == "true"){
            layer.msg("接口状态未修改,请重新设置",{icon:2});
        }else if(data.error == "true"){
            layer.msg("接口状态变更失败，请检查写共同体名",{icon:2});
        }else if(data.success == "true"){
            layer.msg("接口状态变更成功",{icon:1});
            // console.log("the oidValue is:"+$("#tSystemOid").attr("name"))
            // console.log("portsetted instanceId",instanceId);
            //刷新背板
            //backboard.getBackInfoById(instanceId,$("#tSystemOid").attr("name"));
            backboard.getInterfaceList(instanceId, deviceip);
        }
    });
    closeWindow();
}

//添加点击效果
function drawCanvas(e,xright,yright){
    //获取canvas元素
    var canvas = document.getElementById("veiw_backboard_canvas");
    if(canvas == null)
       return false;
    //获取上下文
    //
    var context = canvas.getContext('2d');
    lastImg = context.getImageData(0,  0,  canvas.width,  canvas.height);
    //设定填充图形的样式
    context.fillStyle = "rgba(239,247,175,0.8)";
    //绘制图形
    context.fillRect(xright,yright,26,21);
    //设定图形边框的样式
    context.strokeStyle = "rgba(255,248,50,1)";
    //指定线宽
    context.lineWidth = 2;
    // context.fillRect(50,50,500,500);
    // strokeRect(x,y,w,h);
    context.strokeRect(xright,yright,25,20);
}

// 保存最初的背板信息
function clearCanvas(e,xright,yright){
    //获取canvas元素
    var canvas = document.getElementById("veiw_backboard_canvas");
    if(canvas == null)
       return false;
    //获取上下文
    var context = canvas.getContext('2d');
    context.putImageData(lastImg,  0,  0)
}

function dealDatashow(obj){
    if(obj == undefined || obj == ""){
        var data = "--";
    }else{
        var data = obj;
    }
    return data;
}

