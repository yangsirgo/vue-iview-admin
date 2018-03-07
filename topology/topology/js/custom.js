var AssociatedIPs = []; //已关联的IP
var deviceTable = null; //设备列表
var deviceSet = []; //设备集合
var alarmTable = null; //报警列表
var alarmData = null; //报警数据
var natInfo = null; //nat设备信息

//var parentCtx = 'http://10.10.16.245/tsa/';
$(function() {
    layerConfig();
    getDeviceType();
    getAlarmLevel();
    getSubTopo();
    initEvents();
})

function initEvents() {
    $('body')
        //设备列表点击图标检索ip
        .on('click', '.openwindow .device-wind .j-search-icon-ip', function() {
            refreshDeviceTable();
        })
        //设备列表回车检索ip
        .on('keydown', '.openwindow .device-wind .j-search-input-ip', function(e) {
            if (e.keyCode == 13) {
                refreshDeviceTable();
                return false;
            }
        })
        //设备列表状态检索
        .on('change', '.openwindow .device-wind .device-status', function(e) {
            refreshDeviceTable();
            return false;
        })
        //设备列表状态检索
        .on('change', '.openwindow .j-check-device', function(e) {
            if ($(this).prop('checked')) {
                $('.openwindow .j-check-device').prop('checked', false);
                $(this).prop('checked', true)
            }
        })
        //拓朴图IP回车检索输入时做一些处理
        .on('input', '#search_ip', function(e) {
            var value = $(this).val();
            var reg = /[^0-9\.]/g;
            if (reg.test(value)) {
                value = value.replace(reg, '');
                $(this).val(value);
            }
            $('#search_mark').remove();
        })
        //拓朴图IP回车检索
        .on('keydown', '#search_ip', function(e) {
            if (e.keyCode == 13) {
                $('#search_ip_btn').click();
                return false;
            }
        })
        //拓朴图IP点击图标检索
        .on('click', '#search_ip_btn', function(e) {
            var ip = $('#search_ip').val().trim();
            $('#search_mark').remove();
            if (!ip) {
                return;
            }
            var flag = false;
            $.each(deviceSet, function(index, obj) {
                if (ip == obj.ipaddress) {
                    flag = true;
                    var el = document.getElementById(obj.id);
                    var info = el.getBBox();
                    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    rect.setAttribute("id", 'search_mark');
                    rect.setAttribute("width", info.width);
                    rect.setAttribute("height", info.height);
                    rect.setAttribute("x", info.x);
                    rect.setAttribute("y", info.y);
                    rect.setAttribute("stroke", "red");
                    rect.setAttribute("stroke-width", "2");
                    rect.setAttribute("fill", "none");
                    $(el).after(rect);
                    return false;
                }
            });
            if (!flag) {
                layer.msg('没有找到相关设备！', { icon: 0 });
            }
            return false;
        })
        //报警IP回车检索
        .on('keydown', '.j-search-alarm-ip', function(e) {
            if (e.keyCode == 13) {
                $('.j-search-alarm-icon').click();
                return false;
            }
        })
        //报警IP点击图标检索
        .on('click', '.j-search-alarm-icon', function(e) {
            alarmTable.ajax.reload();
        })
        //报警类型检索
        .on('change', '.j-select-alarm-type', function(e) {
            alarmTable.ajax.reload();
        })
        //报警级别检索
        .on('change', '.j-select-alarm-level', function(e) {
            alarmTable.ajax.reload();
        })
        //子拓朴
        .on('change', '#subtopo', function(e) {
            if ($(this).val() == "" || $(this).val() == undefined || $(this).val() == null || $(this).val() == "undefined") {
                $("#subtopo").val($("#hideselect").val());
                layer.msg("暂无子拓扑", { icon: 2 });
                return false;
            } else {
                localStorage['topoId_' + userid] = $(this).val();
                window.location.href = ctx + "/network/topology.do?userid=" + userid + "&displayrule=" + displayrule + '&partConfig=' + encodeURI(encodeURI(JSON.stringify(pConfig))) + "&topoId=" + $(this).val();
            }
        })
        //孤岛nat跳转
        .on('click', '.nat-item', function(e) {
            window.location.href = ctx + "/network/topology.do?userid=" + userid + "&displayrule=" + displayrule + '&partConfig=' + encodeURI(encodeURI(JSON.stringify(pConfig))) + "&topoId=" + $(this).attr('data-id');
        })
}

/**
 * 设备列表表格
 */
function getDeviceTable() {
    deviceTable = $('.openwindow .device-table').DataTable({ //表格初始化
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
        "dom": 'rlfrtip',
        "stateLoadParams": function(settings, data) { //状态加载完成之后，对数据处理的回调函数
            data.search.search = "";
        },
        "lengthMenu": [
            [20, 30, 50, 100],
            ["20条", "30条", "50条", "100条"]
        ], //定义在每页显示记录数的select中显示的选项
        "ajax": {
            "beforeSend": function() {},
            "url": parentCtx + "network/topology/getDeviceList",
            //改变从服务器返回的数据给Datatable
            "dataSrc": function(json) {
                return json.data;
            },
            //将额外的参数添加到请求或修改需要被提交的数据对象
            "data": {
                "status": '',
                "deviceType": '',
                "searchstr": '',
                "department": 1
            },
        },
        "columnDefs": [{
            "targets": [0],
            "orderable": false,
            "width": "35px",
            "render": function(data, type, full) {
                return '<input type="checkbox" class="j-check-device" data-ip="' + $(data).val() + '">';
            }
        }, {
            "targets": [1],
            "orderable": false,
            "class": "text-ellipsis",
            "width": "150px",
            "render": function(data, type, full) {
                data = data.split(',');
                var str = ipiconmaker(data);
                str += "<span style='position:relative;top:-5px;left:8px;width:80%;display:inline-block;'>" + data[2] + "</span>";
                return str;
            }
        }, {
            "targets": [2],
            "orderable": false,
            "class": "text-ellipsis j-nickname"
        }, {
            "targets": [3],
            "orderable": false,
            "class": "text-ellipsis"
        }, {
            "targets": [4],
            "orderable": false,
            "class": "text-ellipsis center-text",
            "width": "80px",
            "render": function(data, type, full) {
                var active = '';
                if (AssociatedIPs.indexOf($(data).text()) > -1) {
                    active = 'active';
                }
                return '<i class="icon-guanlian ' + active + '"></i>';
            }
        }],
        //当每次表格重绘的时候触发一个操作，比如更新数据后或者创建新的元素
        "drawCallback": function(oTable) {
            var table = $('.openwindow .device-table:eq(1)');
            var oTable = $(table).dataTable();
            //设置每一列的title
            $(table).find("tr td:not(:last-child)").each(function(index, obj) {
                $(obj).attr("title", $(obj).text());
            })
            //添加跳转到指定页
            $(".dataTables_paginate").append("<div class='datatable-custom'><span>到第</span><input id='changePage' type='text'><span>页</span> <a href='javascript:void(0);' id='dataTable-btn'>确认</a></div>");
            $('#dataTable-btn').click(function(e) {
                if ($("#changePage").val() && $("#changePage").val() > 0) {
                    var redirectpage = $("#changePage").val() - 1;
                } else {
                    var redirectpage = 0;
                }
                oTable.fnPageChange(redirectpage);
            });

            //键盘事件  回车键 跳页
            $("#changePage").keydown(function() {
                var e = event || window.event;
                if (e && e.keyCode == 13) {
                    if ($("#changePage").val() && $("#changePage").val() > 0) {
                        var redirectpage = $("#changePage").val() - 1;
                    } else {
                        var redirectpage = 0;
                    }
                    oTable.fnPageChange(redirectpage);
                }
            })
        }
    });
}
/**
 * 报警详情表格
 */
function getAlarmTable(ip, ips) {
    alarmTable = $('.openwindow .alarm-table').DataTable({ //表格初始化
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
            "url":"./topology/alarmdetail.json",
            //改变从服务器返回的数据给Datatable
            "dataSrc": function(json) {
                var data = [];
                alarmData = json.alarms;
                $.each(json.alarms, function(index, obj) {
                    if (obj.oip.indexOf($('.openwindow .j-search-alarm-ip').val().trim()) > -1 &&
                        obj.s.indexOf($('.openwindow .j-select-alarm-level').val()) > -1) {
                        var temp = [obj.oip, obj.etn, obj.s, obj.ot];
                        data.push(temp);
                    }
                });
                if (alarmTable.ajax.params().order.length > 0) {
                    //按IP排序
                    if (alarmTable.ajax.params().order[0].column == 0) {
                        if (alarmTable.ajax.params().order[0].dir == 'asc') {
                            data.sort(function(a, b) {
                                var tempA = a[0].split('.');
                                var tempB = b[0].split('.');
                                for (var i = 0; i < tempA.length; i++) {
                                    tempA[i] = ('00' + tempA[i]).slice(-3);
                                }
                                for (var j = 0; j < tempB.length; j++) {
                                    tempB[j] = ('00' + tempB[j]).slice(-3);
                                }
                                return Number(tempA.join('')) - Number(tempB.join(''));
                            })
                        } else {
                            data.sort(function(a, b) {
                                var tempA = a[0].split('.');
                                var tempB = b[0].split('.');
                                for (var i = 0; i < tempA.length; i++) {
                                    tempA[i] = ('00' + tempA[i]).slice(-3);
                                }
                                for (var j = 0; j < tempB.length; j++) {
                                    tempB[j] = ('00' + tempB[j]).slice(-3);
                                }
                                return -(Number(tempA.join('')) - Number(tempB.join('')));
                            })
                        }
                    }
                    //按时间排序
                    else if (alarmTable.ajax.params().order[0].column == 3) {
                        if (alarmTable.ajax.params().order[0].dir == 'asc') {
                            data.sort(function(a, b) {
                                return new Date(a[3]).getTime() - new Date(b[3]).getTime();
                            })
                        } else {
                            data.sort(function(a, b) {
                                return -(new Date(a[3]).getTime() - new Date(b[3]).getTime());
                            })
                        }
                    }
                }
                return data;
            },
            //将额外的参数添加到请求或修改需要被提交的数据对象
            "data": {
                "searchIp": ip,
                "ips": ips,
                "userid": userid,
                "displayrule": displayrule,
                "topoId": $.topology.view.id,
            },
        },
        "columnDefs": [{
            "targets": [0],
            "orderable": true,
            "class": "text-ellipsis"
        }, {
            "targets": [1],
            "orderable": false,
            "class": "text-ellipsis"
        }, {
            "targets": [2],
            "orderable": false,
            "class": "text-ellipsis"
        }, {
            "targets": [3],
            "orderable": true,
            "class": "text-ellipsis"
        }],
        //当每次表格重绘的时候触发一个操作，比如更新数据后或者创建新的元素
        "drawCallback": function(oTable) {
            var table = $('.openwindow .alarm-table');
            //设置每一列的title
            $(table).find("tr td:not(:last-child)").each(function(index, obj) {
                $(obj).attr("title", $(obj).text());
            })
        }
    });
}
/**
 * 展示报警信息
 */
function showAlarmInfo(alarms, outreachIps) {
    $('.j-alarm-tip').remove();
    if ($.isEmptyObject(alarms)) {
        return;
    }
    outreachIps = Object.keys(outreachIps);
    $.each(alarms, function(ip, num) {
        $.each(deviceSet, function(index, obj) {
            if (ip == obj.ipaddress) {
                var el = document.getElementById(obj.id);
                var info = el.getBBox();
                var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                g.setAttribute('class', 'j-alarm-tip');
                g.setAttribute("transform", 'translate(' + (info.x + info.width - 8) + ',' + (info.y - 8) + ')');
                $(el).after(g);

                var a = document.createElementNS("http://www.w3.org/2000/svg", "a");
                a.setAttribute('onclick', 'viewAlarmDetail("' + obj.ipaddress + '","' + obj.ips + '")');
                a.setAttribute('style', 'cursor:pointer');
                a.setAttribute('style', 'cursor:pointer');
                g.appendChild(a);

                var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute('height', 20);
                text.setAttribute('font-size', 14);
                text.setAttribute('x', '5');
                text.setAttribute('y', 15);
                text.setAttribute('fill', 'white');
                text.textContent = num;
                a.appendChild(text);
                var textInfo = text.getBBox();

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width", textInfo.width + 10);
                rect.setAttribute("height", 20);
                rect.setAttribute('rx', 10);
                rect.setAttribute('ry', 10);
                rect.setAttribute("fill", "red");
                a.insertBefore(rect, a.children[0]);

                //违规外联
                if (outreachIps.indexOf(ip) > -1) {
                    var rectInfo = a.getBBox();
                    var circleCx = rectInfo.x + rectInfo.width / 2;;
                    var circleCy = rectInfo.y + rectInfo.height / 2;
                    var circleR = Math.max(rectInfo.width, rectInfo.height) / 2 + 2;
                    for (var i = 0; i < 4; i++) {
                        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                        circle.setAttribute("cx", circleCx);
                        circle.setAttribute("cy", circleCy);
                        circle.setAttribute("r", circleR);
                        circle.setAttribute("style", 'pointer-events:none;');
                        if (i == 0) {
                            circle.setAttribute("fill", 'rgba(255,0,0,0.5)');
                        } else {
                            circle.setAttribute("stroke", 'red');
                            circle.setAttribute("stroke-width", 1);
                            circle.setAttribute("fill", 'transparent');
                            circle.setAttribute("opacity", 1);
                            var animateScale = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                            animateScale.setAttribute("attributeName", 'r');
                            animateScale.setAttribute("fill", 'freeze');
                            animateScale.setAttribute("from", circleR);
                            animateScale.setAttribute("to", circleR * 2);
                            animateScale.setAttribute("begin", -i - 1);
                            animateScale.setAttribute("dur", 3);
                            animateScale.setAttribute("repeatCount", 'indefinite');
                            animateScale.setAttribute("keySplines", '0 .75 .25 1');
                            circle.appendChild(animateScale);

                            var animateOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                            animateOpacity.setAttribute("attributeName", 'stroke');
                            animateOpacity.setAttribute("fill", 'freeze');
                            animateOpacity.setAttribute("from", 'rgba(255,0,0,1)');
                            animateOpacity.setAttribute("to", 'rgba(255,0,0,0)');
                            animateOpacity.setAttribute("begin", -i - 1);
                            animateOpacity.setAttribute("dur", 3);
                            animateOpacity.setAttribute("repeatCount", 'indefinite');
                            animateScale.setAttribute("keySplines", '0 .75 .25 1');
                            circle.appendChild(animateOpacity);
                        }
                        g.insertBefore(circle, a);
                    }
                }
                return false;
            }
        });
    })
}
/**
 * 跳转nat拓朴
 */
function jumpNatTopo(topoId) {
    if (!topoId || topoId == 'undefined') {
        layer.msg('找不到NAT拓朴', { icon: 0 });
    } else {
        window.location.href = ctx + "/network/topology.do?userid=" + userid + "&displayrule=" + displayrule + '&partConfig=' + encodeURI(encodeURI(JSON.stringify(pConfig))) + "&topoId=" + topoId;
    }
}
/**
 * 显示nat设备信息
 */
function showNatDeviecInfo() {
    var root = document.getElementById('view');
    var rootInfo = root.getBBox();
    var offsetY = 0;
    var offsetX = rootInfo.width - 250;
    $.each(natInfo, function(i, ni) {
        if (!ni.nodeip) {
            //孤岛nat设备
            if (ni.nattype == 0) {
                offsetY += 50;
                if (offsetY > rootInfo.height - 50) {
                    offsetX -= 50;
                    offsetY = 50;
                }
                var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                g.setAttribute('class', 'j-nat-device');
                g.setAttribute('id', '9999999');
                g.setAttribute("transform", 'translate(' + offsetX + ',' + offsetY + ')')

                var img = document.createElementNS("http://www.w3.org/2000/svg", "image");
                img.setAttribute('xlink:href', '/topology/skin/blue/images/topology/icon_svg/networkdevice/node_nat.svg');
                img.setAttribute('href', '/topology/skin/blue/images/topology/icon_svg/networkdevice/node_nat.svg');
                img.setAttribute('width', '36');
                img.setAttribute('height', '36');
                img.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
                img.setAttribute('x', '0');
                img.setAttribute('y', '0');

                var a = document.createElementNS("http://www.w3.org/2000/svg", "a");
                a.setAttribute('href', 'javascript:');
                a.setAttribute('onclick', 'jumpNatTopo(' + ni.topoid + ')');
                a.setAttribute('id', 'nat' + i);
                a.appendChild(img);
                g.append(a);
                root.appendChild(g);
            }
        } else {
            $.each(deviceSet, function(j, ds) {
                if (ni.nodeip == ds.ipaddress) {
                    //本身是nat设备或下联nat设备
                    if (ni.nattype == 1 || ni.nattype == 2) {
                        var el = document.getElementById(ds.id);
                        if ($(el).closest('g').find('.j-nat-tip').length == 0) {
                            var info = el.getBBox();
                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            g.setAttribute('class', 'j-nat-tip');
                            g.setAttribute("transform", 'translate(' + (info.x - 26) + ',' + (info.y + 20) + ')');
                            $(el).after(g);
                            var a = document.createElementNS("http://www.w3.org/2000/svg", "a");
                            g.appendChild(a);

                            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                            text.setAttribute('height', 20);
                            text.setAttribute('font-size', 14);
                            text.setAttribute('x', '5');
                            text.setAttribute('y', 15);
                            text.setAttribute('fill', 'white');
                            text.textContent = 'NAT';
                            a.appendChild(text);
                            var textInfo = text.getBBox();

                            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                            rect.setAttribute("width", textInfo.width + 10);
                            rect.setAttribute("height", 20);
                            rect.setAttribute('rx', 10);
                            rect.setAttribute('ry', 10);
                            rect.setAttribute("fill", "#2399F2");
                            a.insertBefore(rect, a.children[0]);
                        }
                        return false;
                    }
                }
            });

        }
    })
}
/**
 * 查看报警信息
 */
function viewAlarmDetail(ip, ips) {
    opentitlewindow("报警详情", 830, 550, $('#alarm').html());
    $(".openwindow .j-alarm-submit").click(function() {
        closeWindow();
    });
    $('.openwindow .j-search-alarm-ip').focus();
    getAlarmTable(ip, ips);
}
//刷新设备表格
function refreshDeviceTable() {
    deviceTable.settings()[0].ajax.data.searchstr = $('.openwindow input[name=search_ip]').val().trim();
    deviceTable.settings()[0].ajax.data.status = $('.openwindow select[name=work_status]').val();
    deviceTable.ajax.reload();
}
/**
 * 设备关联
 */
function AssociateDevice(instanceId) {
    opentitlewindow("关联设备", 830, 550, $('#device').html());
    getDeviceTable();
    $(".openwindow .j-device-cancel").click(function() {
        closeWindow();
    });
    $(".openwindow .j-device-submit").click(function() {
        var ip = $('.j-check-device:checked').attr('data-ip');
        if (!ip) {
            layer.msg("请先选择要关联的设备！", { icon: 0 });
            return;
        }
        if ($('.j-check-device:checked').closest('tr').find('.icon-guanlian').hasClass('active')) {
            layer.msg("该设备已进行了关联！", { icon: 0 });
            return;
        }
        var nickName = $('.j-check-device:checked').closest('tr').find('.j-nickname').text();
        $.ajax({
            type: "post",
            url: ctx + '/network/associateddevice.do',
            timeout: 60000, // 超时时间设置，单位毫秒
            dataType: "html",
            data: {
                topoId: $.topology.view.id,
                ip: ip,
                nickName: nickName,
                instanceId: instanceId
            },
            success: function(msg) {
                if (msg == '"success"') {
                    layer.msg("关联成功！", {
                        icon: 1,
                        end: function() {
                            location.reload();
                        }
                    });
                    closeWindow();
                } else {
                    layer.msg("关联失败！", { icon: 2 });
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                layer.msg("关联失败！", { icon: 2 });
            }
        })

    });
}

/**
 * 根据设备类型显示相应图标
 */
function ipiconmaker(obj) {
    var isOut = obj[3] == 'false' ? '_out' : ''; //不在监控范围内
    var isOutStr = obj[3] == 'false' ? '(不在监控范围内)' : '';
    if (obj[0] == undefined || obj[0] == "null") {
        obj[0] = "unknown";
    }
    if (obj[0] == "unknown") {
        if (obj[3] == 'false') {
            return "<img src= '" + ctxImg + "/device/homeunkonowon_out.png' alt='' title='不在监控范围内'>";
        } else if (obj[1] == 1) {
            return "<img src= '" + ctxImg + "/device/homeunkonowon.png' alt='' title='在线'>";
        } else {
            return "<img src= '" + ctxImg + "/device/homeunknownout.png' alt='' title='离线'>";
        }
    } else {
        if (obj[3] == 'false') {
            return "<img src= '" + ctxImg + "/device/online" + obj[0] + "_out.png' alt='' title='不在监控范围内'>";
        } else if (obj[1] == 1) {
            if(obj[4] == null || obj[4]== "null" || obj[4]== undefined || obj[4]== "undefined" || obj[4]== ""){
                return "<img src= '" + ctxImg + "/device/online" + obj[0] + ".png' alt='' title='在线'>";
            }else{
                return "<img src= '" + ctxImg + "/device/online" + obj[4] + ".png' alt='' title='在线'>";
            }

        } else {
            if(obj[4] == null || obj[4]== "null" || obj[4]== undefined || obj[4]== "undefined" || obj[4]== ""){
                return "<img src= '" + ctxImg + "/device/outline" + obj[0] + ".png' alt='' title='离线'>";
            }else{
                return "<img src= '" + ctxImg + "/device/outline" + obj[4] + ".png' alt='' title='离线'>";
            }
        }
    }
}

function layerConfig() {
    layer.config({
        success: function(layero, index) {
            $(layero).find('.layui-layer-ico:not(.layui-layer-close)').css({
                'background': 'none',
                'height': 'auto',
                'width': 'auto',
                'left': '46px',
                'top': '15px'
            }).closest('.layui-layer-dialog').css({
                'min-width': '270px',
                'border': 'none',
                'box-shadow': '0 0 5px 1px lightgrey',
                'color': '#1E8FA5'
            }).find('.layui-layer-content').css({
                'padding': '13px 70px'
            });

            //提示
            $(layero).find('.layui-layer-ico0').addClass('icon-tanhao-circle').addClass('icon-tanhao-circle').closest('.layui-layer-dialog').css({
                'background-color': '#E1EBF9',
                'color': '#347AD5'
            });
            //成功
            $(layero).find('.layui-layer-ico1').addClass('icon-duihao-circle').addClass('icon-duihao-circle').closest('.layui-layer-dialog').css({
                'background-color': '#ABE7ED',
                'color': '#1E8FA5'
            });
            //失败
            $(layero).find('.layui-layer-ico2').addClass('icon-cuohao-circle').addClass('icon-cuohao-circle').closest('.layui-layer-dialog').css({
                'background-color': '#FFCDD1',
                'color': '#E83C4B'
            });

        }
    });
}
//事件类型下拉框数据
function getDeviceType() {
    var url = parentCtx + 'system/getDictionaryInfo?dictType=eventType';
    $.get(url, function(data) {
        $.each(data, function(index, obj) {
            $('.j-select-alarm-type').append('<option value="' + obj.dictName + '">' + obj.dictName + '</option>');
        })
    });
};
//事件级别下拉框数据
function getAlarmLevel() {
    var url = parentCtx + 'system/getDictionaryInfo?dictType=eventServerity';
    $.getJSON(url, function(data) {
        $.get(url, function(data) {
            $.each(data, function(index, obj) {
                $('.j-select-alarm-level').append('<option value="' + obj.dictName + '">' + obj.dictName + '</option>');
            })
        });
    });
};
//获取子拓朴
function getSubTopo() {
    partConfig.forEach(function(obj) {
        $('#subtopo').append('<option value="' + obj.id + '">' + obj.name + '</option>').val(curTopoId);
    });
    $("#hideselect").val($("#subtopo").val());
}