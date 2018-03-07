/**
 * 关联设备
 */
var menu_item_associated_device = {
    "id": "1.18",
    "text": "关联设备",
    "image": ctxImg + "/topology/icon/attribute-16.png",
    "separator": true,
    "action": "$.lab.topo.itemAssociatedDevice",
    "available": "lab.testAttributePanel()==true",
    "visible": "lab.testAttributePanel()==true"
}

/**
 * 属性面板
 */
var menu_item_attribute_panel = {
    "id": "1.1",
    "text": "属性",
    "image": ctxImg + "/topology/icon/attribute-16.png",
    "separator": true,
    "action": "$.lab.topo.itemAttributePanel",
    "available": "lab.testAttributePanel()==true",
    "visible": "lab.testAttributePanel()==true"
}
/**
 * 选择工具
 */
var menu_item_selector = {
    "id": "1.2",
    "text": "选择工具",
    "image": ctxImg + "/topology/icon/selector-16.png",
    "action": "$.lab.ui.setViewDragSelect",
    "available": "topology.ui.viewDragAction!='select'",
    "visible": "topology.ui.viewDragAction!='select'"
}
/**
 * 平移工具
 */
var menu_item_drag = {
    "id": "1.3",
    "text": "平移工具",
    "image": ctxImg + "/topology/icon/drag-16.png",
    "action": "$.lab.ui.setViewDragMove",
    "available": "topology.ui.viewDragAction!='move'",
    "visible": "topology.ui.viewDragAction!='move'"
}
/**
 * 指标挂载
 */
var menu_item_hang = {
    "id": "1.4",
    "text": "指标挂载",
    "image": ctxImg + "/topology/icon/hang-16.png",
    "action": "$.lab.itsm.hangInfo",
    "separator": true
}
/**
 * 快捷键一览
 */
var menu_item_shortcutBook = {
    "id": "1.5",
    "text": "快捷键一览",
    "image": ctxImg + "/topology/icon/script-16.png",
    "separator": true,
    "action": "$.lab.ui.shortcutBook"
}
/**
 * 图形脚本
 */
var menu_item_script = {
    "id": "1.5",
    "text": "图形脚本",
    "image": ctxImg + "/topology/icon/script-16.png",
    "separator": true,
    "action": "$.lab.exp.svgXml"
}
/**
 * 保存
 */
var menu_item_save = {
    "id": "1.6",
    "text": "保存",
    "image": ctxImg + "/topology/icon/save-16.png",
    "action": "$.lab.topo.saveTopo"
}
/**
 * 导出
 */
var menu_item_exportPng = {
    "id": "1.8",
    "text": "导出图片",
    "image": ctxImg + "/topology/icon/export-16.png",
    "action": "$.lab.exp.exportPng"
}
/**
 * 导出
 */
var menu_item_export = {
    "id": "1.8",
    "text": "导出…",
    "image": ctxImg + "/topology/icon/export-16.png",
    "children": [{
        "id": "1.12.2",
        "text": "pdf文档",
        "image": ctxImg + "/topology/icon/acrobat-16.png",
        "action": "$.lab.exp.exportPdf"
    }, {
        "id": "1.12.6",
        "text": "png图片",
        "image": ctxImg + "/topology/icon/map-16.png",
        "action": "$.lab.exp.exportPng"
    }, {
        "id": "1.12.8",
        "text": "jpg图片",
        "image": ctxImg + "/topology/icon/img-16.png",
        "action": "$.lab.exp.exportPdf"
    }]
}
/**
 * 刷新
 */
var meun_item_refresh = {
    "id": "1.9",
    "text": "刷新",
    "image": ctxImg + "/topology/icon/refresh-16.png",
    "action": "$.lab.topo.viewRefresh",
    "separator": true
}
/**
 * 复制
 */
var menu_item_copy = {
    "id": "1.10",
    "text": "复制",
    "image": ctxImg + "/topology/icon/copy-16.png",
    "separator": true,
    "action": "$.lab.topo.copySelectedElement",
    "available": "lab.testCopySelectedElement()==true"
}
/**
 * 粘贴
 */
var menu_item_paste = {
    "id": "1.11",
    "text": "粘贴",
    "image": ctxImg + "/topology/icon/paste-16.png",
    "action": "$.lab.topo.pasteElement",
    "available": "lab.testPasteElement()==true"
}
/**
 * 删除
 */
var menu_item_delete = {
    "id": "1.12",
    "text": "删除",
    "image": ctxImg + "/topology/icon/del-16.png",
    "action": "$.lab.topo.deleteElement"
}

/**
 * 移除
 */
var menu_item_remove = {
    "id": "1.13",
    "text": "移除",
    "image": ctxImg + "/topology/icon/del-16.png",
    "action": "$.lab.topo.removeElement",
    "available": "lab.testMainTopo()==true",
    "visible": "lab.testMainTopo()==true"
}

/**
 * 删除-NEW
 */
var menu_item_deleteElement = {
    "id": "1.12",
    "text": "删除",
    "image": ctxImg + "/topology/icon/del-16.png",
    "action": "$.lab.topo.realDeleteElement"
}

/**
 * 图形缩放
 */
var menu_item_zoom = {
    "id": "2.1",
    "text": "图形缩放",
    "image": ctxImg + "/topology/icon/zoom-16.png",
    "children": [{
        "id": "2.1.2",
        "text": "满屏尺寸",
        "image": ctxImg + "/topology/icon/zoom_fit-16.png",
        "action": "$.lab.topo.viewFitToCanvas"
    }, {
        "id": "2.1.4",
        "text": "放大尺寸",
        "image": ctxImg + "/topology/icon/zoom_in-16.png",
        "action": "$.lab.topo.viewZoomIn"
    }, {
        "id": "2.1.6",
        "text": "缩小尺寸",
        "image": ctxImg + "/topology/icon/zoom_out-16.png",
        "action": "$.lab.topo.viewZoomOut"
    }, {
        "id": "2.1.8",
        "text": "原始尺寸",
        "image": ctxImg + "/topology/icon/zoom_original-16.png",
        "action": "$.lab.topo.viewOrigiZoom"
    }]
}
/**
 * 形状
 */
var menu_item_shape = {
    "id": "2.2",
    "text": "形状...",
    "image": ctxImg + "/topology/icon/shapes-16.png",
    "children": [{
        "id": "2.2.1",
        "text": "节点",
        "image": ctxImg + "/topology/icon/vnode-16.png",
        "action": "$.lab.topo.addVitualSymbol"
    }, {
        "id": "2.2.2",
        "text": "矩形",
        "image": ctxImg + "/topology/icon/shape_rect-16.png",
        "action": "$.lab.topo.addRect",
        "visible": "false"
    }, {
        "id": "2.2.3",
        "text": "圆形",
        "image": ctxImg + "/topology/icon/shape_circle-16.png",
        "action": "$.lab.topo.addCircle",
        "visible": "false"
    }, {
        "id": "2.2.4",
        "text": "多边形",
        "image": ctxImg + "/topology/icon/shape_polygon-16.png",
        "action": "$.lab.topo.addPolygon",
        "visible": "false"
    }]
}

/**
 * 添加设备
 */
var menu_item_addResource = {
    "id": "1.5",
    "text": "添加设备",
    "image": ctxImg + "/topology/icon/add-16.png",
    "visible": "lab.testAdmin()==true",
    "action": "$.lab.topo.addResource"
}
/**
 * 添加容器
 */
var menu_item_container = {
    "id": "2.3",
    "text": "添加容器",
    "image": ctxImg + "/topology/icon/cloud_add-16.png",
    "action": "$.lab.topo.addContainer"
}
/**
 * 拿出容器
 */
var menu_item_takeOutContainer = {
    "id": "2.4",
    "text": "拿出容器",
    "image": ctxImg + "/topology/icon/takeout-16.png",
    "action": "$.lab.topo.removeSymbolsFromContainer",
    "visible": "parent!=null"
}
/**
 * 布局
 */
var menu_item_layout = {
    "id": "2.5",
    "children": [{
        "id": "2.5.2",
        "text": "力学布局",
        "image": ctxImg + "/topology/icon/layout_force-16.png",
        "action": "$.lab.topo.forceLayout"
    }, {
        "id": "2.5.4",
        "text": "树形布局",
        "image": ctxImg + "/topology/icon/layout_tree-16.png",
        "action": "$.lab.topo.treeLayout",
        "visible": "lab.testLayoutTreeVisible()==true",
        "available": "lab.testLayoutTreeAvailable()==true"
    }],
    "text": "自动布局",
    "image": ctxImg + "/topology/icon/layout-16.png"
}
/**
 * 网格
 */
var menu_item_grid = {
    "id": "1.13",
    "text": "网格",
    "image": ctxImg + "/topology/icon/grid-16.png",
    "separator": true,
    "action": "$.lab.ui.gridAndSnap",
    "available": "lab.testCanvasGridSupport()==true"
}
/**
 * 中心位置
 */
var menu_item_center = {
    "id": "1.14",
    "text": "中心位置",
    "image": ctxImg + "/topology/icon/back_location-16.png",
    "action": "$.lab.topo.viewPositionReset"
}
/**
 * 全屏显示
 */
var menu_item_fullscreen = {
    "id": "1.16",
    "text": "全屏显示",
    "image": ctxImg + "/topology/icon/fullscreen-16.png",
    "action": "$.lab.ui.fullScreen",
    "visible": "lab.testFullScreen()==false"
}
/**
 * 绘制链路
 */
var menu_item_drawlink = {
    "id": "2.15",
    "text": "绘制链路",
    "image": ctxImg + "/topology/icon/draw_link-16.png",
    "action": "$.lab.topo.drawStraightLink",
    "visible": "lab.testDrawLine()==true"
}
/**
 * 绘制连线
 */
var menu_item_drawline = {
    "id": "2.6",
    "text": "绘制连线",
    "image": ctxImg + "/topology/icon/draw_line-16.png",
    "action": "$.lab.topo.drawStraightLine",
    "visible": "lab.testDrawLine()==true"
}
/**
 * 线条...
 */
var menu_item_line = {
    "id": "2.7",
    "text": "线条...",
    "separator": true,
    "image": ctxImg + "/topology/icon/line-16.png",
    "children": [{
        "id": "2.3.1",
        "text": "直线",
        "image": ctxImg + "/topology/icon/line-16.png",
        "action": "$.lab.topo.drawStraightLine"
    }, {
        "id": "2.3.2",
        "text": "曲线",
        "image": ctxImg + "/topology/icon/line-17.png",
        "action": "$.lab.topo.drawCurveLine"
    }]
}
/**
 * 图层操作
 */
var menu_item_layers = {
    "id": "2.8",
    "children": [{
        "id": "2.8.2",
        "text": "置于顶层",
        "image": ctxImg + "/topology/icon/move_front-16.png",
        "action": ""
    }, {
        "id": "2.8.4",
        "text": "置于底层",
        "image": ctxImg + "/topology/icon/move_back-16.png",
        "action": ""
    }, {
        "id": "2.8.8",
        "text": "上移一层",
        "image": ctxImg + "/topology/icon/move_forwards-16.png",
        "action": "",
        "separator": true
    }, {
        "id": "2.8.10",
        "text": "下移一层",
        "image": ctxImg + "/topology/icon/move_backwards-16.png",
        "action": ""
    }],
    "text": "图层操作",
    "image": ctxImg + "/topology/icon/layers-16.png",
    "visible": "false",
    "separator": true,
    "available": "false"
}
/**
 * 信息表
 */
var menu_item_infoTable = {
    "id": "2.3",
    "text": "信息表...",
    "image": ctxImg + "/topology/icon/table-16.png",
    "visible": "lab.testSingleSelected()==true",
    "children": [{
        "id": "2.3.1",
        "text": "地址表",
        "image": ctxImg + "/topology/icon/vnode-16.png",
        "action": "$.lab.itsm.infoTableAddr"
    }, {
        "id": "2.3.2",
        "text": "路由表",
        "image": ctxImg + "/topology/icon/router-16.png",
        "action": "$.lab.itsm.infoTableRouter",
        "visible": "true"
    }, {
        "id": "2.3.3",
        "text": "ARP表",
        "image": ctxImg + "/topology/icon/apr-16.png",
        "action": "$.lab.itsm.infoTableARP",
        "visible": "true"
    }, {
        "id": "2.3.4",
        "text": "Vlan表",
        "image": ctxImg + "/topology/icon/shape_polygon-16.png",
        "action": "$.lab.itsm.infoTableVlan",
        "visible": "false"
    }]
}
/**
 * 展开
 */
var menu_item_expand = {
    "id": "2.9",
    "text": "展开",
    "image": ctxImg + "/topology/icon/expand-16.png",
    "action": "$.lab.topo.elementExpandCollapseToggle",
    "visible": "this.isExpand==false"
}
/**
 * 闭合
 */
var menu_item_unexpand = {
    "id": "2.10",
    "text": "闭合",
    "image": ctxImg + "/topology/icon/collapse-16.png",
    "action": "$.lab.topo.elementExpandCollapseToggle",
    "visible": "this.isExpand==true"
}
/**
 * 横平竖直
 */
var menu_item_rightAnglePolyLine = {
    "id": "2.11",
    "text": "横平竖直",
    "image": ctxImg + "/topology/icon/poly_line_format-16.png",
    "action": "$.lab.topo.rightAnglePolyLine",
    "visible": "this.points.length>2"
}
/**
 * 转换曲线
 */
var menu_item_rightAngleCurveLine = {
    "id": "2.12",
    "text": "转换曲线",
    "image": ctxImg + "/topology/icon/poly_line_format-17.png",
    "action": "$.lab.topo.rightAngleCurveLine",
    "visible": "lab.testPolyPoints()==true"
}

/**
 * 接口一览
 */
var menu_item_interfaces = {
    "id": "2.13",
    "text": "接口一览",
    "image": ctxImg + "/topology/icon_dis/information-16.png",
    "separator": true,
    "action": "$.lab.itsm.interfacesList",
    "available": "lab.testSingleSelected()==true",
    "visible": "lab.testSingleSelected()==true"
}

/**
 * 链路信息
 */
var menu_item_linkInfo = {
    "id": "2.14",
    "text": "链路信息",
    "image": ctxImg + "/topology/icon/information-16.png",
    "action": "$.lab.itsm.detailInfo",
    "available": "lab.testSingleSelected()==true"
}

/**
 * 新建子拓扑
 */
var menu_item_addSub = {
    "id": "2.14",
    "text": "新建子拓扑",
    "image": ctxImg + "/topology/icon/addtopu-16.png",
    "action": "$.lab.topo.addSub",
    "available": "lab.testHasSubTopo()==true"
}

/**
 * 发送子拓扑
 */
var menu_item_sendToSub = {
    "id": "2.14",
    "text": "发送到子拓扑",
    "image": ctxImg + "/topology/icon/senttopu-16.png",
    "action": "$.lab.topo.sendToSub",
    "available": "lab.testHasSubTopo()==true"
}

/**
 * 对齐
 */
var menu_item_format = {
    "id": "4",
    "text": "对齐",
    "image": ctxImg + "/topology/icon/rules-16.png",
    "available": "lab.testSingleSelected()!=true",
    "visible": "lab.testSingleSelected()!=true",
    "children": [{
        "id": "4.1",
        "text": "垂直对齐...",
        "image": ctxImg + "/topology/icon/align_middle-16.png",
        "children": [{
            "id": "4.1.1",
            "text": "顶端",
            "image": ctxImg + "/topology/icon/align_top-16.png",
            "action": "$.lab.topo.vertTopAlign"
        }, {
            "id": "4.1.2",
            "text": "中部",
            "image": ctxImg + "/topology/icon/align_middle-16.png",
            "action": "$.lab.topo.vertMiddleAlign"
        }, {
            "id": "4.1.3",
            "text": "底端",
            "image": ctxImg + "/topology/icon/align_bottom-16.png",
            "action": "$.lab.topo.vertBottomAlign"
        }],
        "available": "lab.testAlignlet()==true",
        "disabled": true
    }, {
        "id": "4.2",
        "text": "水平对齐...",
        "image": ctxImg + "/topology/icon/align_center-16.png",
        "children": [{
            "id": "4.2.1",
            "text": "左侧",
            "image": ctxImg + "/topology/icon/align_left-16.png",
            "action": "$.lab.topo.horiLeftAlign"
        }, {
            "id": "4.2.2",
            "text": "居中",
            "image": ctxImg + "/topology/icon/align_center-16.png",
            "action": "$.lab.topo.horiCenterAlign"
        }, {
            "id": "4.2.3",
            "text": "右侧",
            "image": ctxImg + "/topology/icon/align_right-16.png",
            "action": "$.lab.topo.horiRightAlign"
        }],
        "available": "lab.testAlignlet()==true",
        "disabled": true
    }, {
        "id": "4.3",
        "text": "垂直分布",
        "image": ctxImg + "/topology/icon/vertical-distribution-16.png",
        "action": "$.lab.topo.vertDistribute",
        "available": "lab.testDistributelet()==true",
        "disabled": true
    }, {
        "id": "4.4",
        "text": "水平分布",
        "image": ctxImg + "/topology/icon/horizontal-distribution-16.png",
        "action": "$.lab.topo.horiDistribute",
        "available": "lab.testDistributelet()==true",
        "disabled": true
    }]
}
/**
 * 设备信息
 */
var menu_item_info = {
    "id": "5.1",
    "text": "资源一览",
    "image": ctxImg + "/topology/icon/information-16.png",
    "separator": true,
    "action": "$.lab.itsm.overview",
    "available": "lab.testSingleSelected()==true"
}
/**
 * 网络工具
 */
var menu_item_tools = {
    "id": "5.2",
    "children": [{
            "id": "5.2.2",
            "text": "Ping",
            "image": ctxImg + "/topology/icon/cmd-16.png",
            "action": "$.lab.itsm.ping",
            "available": true
        }, {
            "id": "5.2.8",
            "text": "Telnet",
            "image": ctxImg + "/topology/icon/cmd-16.png",
            "action": "$.lab.itsm.telnet",
            "available": true
        }, {
            "id": "5.2.10",
            "text": "SSH",
            "image": ctxImg + "/topology/icon/cmd-16.png",
            "action": "$.lab.itsm.ssh",
            "available": true
        }
        /*, {
        		"id" : "5.2.4",
        		"text" : "SNMP Test",
        		"image" : ctxImg + "/topology/icon/cmd-16.png",
        		"action" : "$.lab.itsm.snmp",
        		"available" : true
        	}, {
        		"id" : "5.2.6",
        		"text" : "下载SNMP信息",
        		"image" : ctxImg + "/topology/icon/cmd-16.png",
        		"action" : "$.lab.itsm.downloadsnmp",
        		"available" : "lab.testRelaIns()==true"
        	}*/
    ],
    "text": "网络工具",
    "image": ctxImg + "/topology/icon/tools-16.png",
    "visible": "lab.testSingleSelected()==true"
}
/**
 * 接口状态
 */
var menu_item_portStatus = {
    "id": "5.3",
    "text": "接口状态",
    "image": ctxImg + "/topology/icon/port-16.png",
    "action": "$.lab.itsm.portStatus",
    "available": "topology.id==1"
}
/**
 * 接口配置
 */
var menu_item_portConfig = {
    "id": "5.4",
    "text": "接口配置",
    "image": ctxImg + "/topology/icon/portcfg-16.png",
    "action": "$.lab.itsm.portConfig",
    "available": "topology.id==1"
}
/**
 * 所连PC
 */
var menu_item_switch2pc = {
    "id": "5.5",
    "text": "所连PC",
    "image": ctxImg + "/topology/icon/connect-16.png",
    "action": "$.lab.itsm.switch2pc",
    "visible": "lab.testSwitchConnectPC()==true"
}
/**
 * 配置检查
 */
var menu_item_configCompare = {
    "id": "5.6",
    "text": "配置检查",
    "image": ctxImg + "/topology/icon/compare-16.png",
    "action": "$.lab.itsm.configCompare",
    "visible": "global.check_config_file==1"
}
/**
 * nat跳转
 */
var menu_item_nat = {
    "id": "5.7",
    "text": "NAT设备",
    "image": ctxImg + "/topology/icon/nat.png",
    "separator": false,
}

/**
 * 背板
 */
var menu_item_backboard = {
    "id": "1.9",
    "text": "背板",
    "image": ctxImg + "/topology/icon/backboard-16.png",
    "separator": true,
    "action": "$.lab.itsm.backboard"
}

/**
 *
 */
var menu_item_activeUrl = {
    "id": "active",
    "action": "$.lab.menu.activeUrl"
}
/**
 * 右键菜单
 */
topoData.config.contextmenu4show = {
    "view": [menu_item_selector, menu_item_drag, menu_item_exportPng,
        menu_item_save, menu_item_grid, menu_item_layout, menu_item_center
    ],
    "symbol": [menu_item_drawline, menu_item_layout, menu_item_deleteElement,
        menu_item_tools
    ],
    "icon": [menu_item_drawline, menu_item_layout, menu_item_deleteElement,
        menu_item_associated_device
    ],
    "lseter": [menu_item_rightAnglePolyLine, menu_item_expand,
        menu_item_unexpand
    ],
    "line": [menu_item_rightAnglePolyLine, menu_item_deleteElement],
    "link": [menu_item_rightAnglePolyLine, menu_item_deleteElement],
    "container": [menu_item_expand, menu_item_unexpand, menu_item_sendToSub, menu_item_layout, menu_item_paste,
        menu_item_deleteElement
    ],
    "router": [menu_item_drawline, menu_item_layout, menu_item_takeOutContainer,
        menu_item_deleteElement, menu_item_backboard,
        menu_item_tools
    ],
    "switch": [menu_item_drawline, menu_item_layout, menu_item_takeOutContainer,
        menu_item_deleteElement, menu_item_backboard,
        menu_item_tools
    ],
    "firewall": [menu_item_drawline, menu_item_layout, menu_item_takeOutContainer,
        menu_item_deleteElement, menu_item_backboard,
        menu_item_tools
    ],
    "v_host": [menu_item_drawline, menu_item_layout, menu_item_takeOutContainer,
        menu_item_deleteElement, menu_item_tools
    ],
    "vpn": [menu_item_drawline, menu_item_layout, menu_item_takeOutContainer,
        menu_item_deleteElement
    ],
    "splitter": [menu_item_drawline, menu_item_layout, menu_item_takeOutContainer,
        menu_item_deleteElement, menu_item_tools
    ]
};