topoData.config.context = {
	"symbol" : {
		"TOOLTIP" : {
			"kpis" : "IpAddr,DeviceVendor,Model,OnlineStatus,Department,AccessStatus,EventStatus,DeviceRemark,EventTotal,Availability,CpuRate,MemRate,Ping,SysUpTime",
			"operations" : ",,,,MAX,MAX,,",
			"converters" : "IP,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,LCD,ALARM,REVERSE_PERCENT2BAR,PERCENT2LCD,PERCENT2LCD,,RUNTIME"
		},
		"INFORMATION" : {
			"kpis" : "IpAddr,ZhLabel,SnmpIp,ZhObjCls,Geography,Vendor,EquipModel,SysDescr,IsSwitch,IsRouter,PortCnt,PhyPortCnt",
			"operations" : ",,,,,,,,,,,",
			"converters" : ",,,,,,,,SUPPORT,SUPPORT,INTEGER,INTEGER"
		},
		"HANG" : {
			"kpis" : "CpuRate,MemRate",
			"operations" : "MAX",
			"converters" : "PERCENT2LCD,PERCENT2LCD"
		}
	},
	"router" : {
		"TOOLTIP" : {
			"kpis" : "IpAddr,DeviceVendor,Model,OnlineStatus,Department,AccessStatus,EventStatus,DeviceRemark,EventTotal,Availability,CpuRate,MemRate,Ping,SysUpTime",
			"operations" : ",,,,MAX,MAX,,",
			"converters" : "IP,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,LCD,ALARM,REVERSE_PERCENT2BAR,PERCENT2LCD,PERCENT2LCD,,RUNTIME"
		},
		"INFORMATION" : {
			"kpis" : "IpAddr,ZhLabel,SnmpIp,ZhObjCls,Geography,Vendor,EquipModel,SysDescr,IsSwitch,IsRouter,PortCnt,PhyPortCnt",
			"operations" : ",,,,,,,,,,,",
			"converters" : ",,,,,,,,SUPPORT,SUPPORT,INTEGER,INTEGER"
		},
		"HANG" : {
			"kpis" : "CpuRate,MemRate",
			"operations" : "MAX",
			"converters" : "PERCENT2LCD,PERCENT2LCD"
		}
	},
	"switch" : {
		"TOOLTIP" : {
			"kpis" : "IpAddr,DeviceVendor,Model,OnlineStatus,Department,AccessStatus,EventStatus,DeviceRemark,EventTotal,Availability,CpuRate,MemRate,Ping,SysUpTime",
			"operations" : ",,,,MAX,MAX,,",
			"converters" : "IP,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,LCD,ALARM,REVERSE_PERCENT2BAR,PERCENT2LCD,PERCENT2LCD,,RUNTIME"
		},
		"INFORMATION" : {
			"kpis" : "IpAddr,ZhLabel,SnmpIp,ZhObjCls,Geography,Vendor,EquipModel,SysDescr,IsSwitch,IsRouter,PortCnt,PhyPortCnt",
			"operations" : ",,,,,,,,,,,",
			"converters" : ",,,,,,,,SUPPORT,SUPPORT,INTEGER,INTEGER"
		},
		"HANG" : {
			"kpis" : "CpuRate,MemRate",
			"operations" : "MAX",
			"converters" : "PERCENT2LCD,PERCENT2LCD"
		}
	},
	"v_host" : {
		"TOOLTIP" : {
			"kpis" : "IpAddr,DeviceVendor,Model,OnlineStatus,Department,AccessStatus,EventStatus,DeviceRemark,Availability,CpuRate,MemRate,Ping,SysUpTime",
			"operations" : ",,,,MAX,MAX,,",
			"converters" : "IP,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,LCD,ALARM,REVERSE_PERCENT2BAR,PERCENT2LCD,PERCENT2LCD,,RUNTIME"
		},
		"INFORMATION" : {
			"kpis" : "IpAddr,ZhLabel,SnmpIp,ZhObjCls,Geography,Vendor,EquipModel,SysDescr,IsSwitch,IsRouter,PortCnt,PhyPortCnt",
			"operations" : ",,,,,,,,,,,",
			"converters" : ",,,,,,,,SUPPORT,SUPPORT,INTEGER,INTEGER"
		},
		"HANG" : {
			"kpis" : "CpuRate,MemRate",
			"operations" : "MAX",
			"converters" : "PERCENT2LCD,PERCENT2LCD"
		}
	},
	"database" : {
		"TOOLTIP" : {
			"kpis" : "IpAddr,DeviceVendor,Model,OnlineStatus,Department,AccessStatus,EventStatus,DeviceRemark,EventTotal,Availability,CpuRate,MemRate,Ping,SysUpTime",
			"operations" : ",,,,MAX,MAX,,",
			"converters" : "IP,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,LCD,ALARM,REVERSE_PERCENT2BAR,PERCENT2LCD,PERCENT2LCD,,RUNTIME"
		},
		"INFORMATION" : {
			"kpis" : "IpAddr,ZhLabel,SnmpIp,ZhObjCls,Geography,Vendor,EquipModel,SysDescr,IsSwitch,IsRouter,PortCnt,PhyPortCnt",
			"operations" : ",,,,,,,,,,,",
			"converters" : ",,,,,,,,SUPPORT,SUPPORT,INTEGER,INTEGER"
		},
		"HANG" : {
			"kpis" : "CpuRate,MemRate",
			"operations" : "MAX",
			"converters" : "PERCENT2LCD,PERCENT2LCD"
		}
	},
	/*"link" : {
		"TOOLTIP" : {
			"kpis" : "SrcNode,SrcPort,DstNode,DstPort,EventTotal,EventLevel,LinkBwUsedPer,LinkInBwUsedPer,LinkOutBwUsedPer,LinkInFlaw,LinkOutFlaw,LinkErrorPacketRate,LinkBroadcastPacketRate",
			"operations" : ",,,,,,MAX,MAX,MAX,MAX,MAX,MAX,MAX",
			"converters" : ",,,,LCD,ALARM,PERCENT2LCD,PERCENT2LCD,PERCENT2LCD,KBYTEPS,KBYTEPS,PKGS,PKGS"
		},
		*//**
		LinkErrorPacketRate         错包率
		LinkPacketLossRate          丢包率
		LinkBroadcastPacketRate     广播包率
		**//*
		"INFORMATION" : {
			"kpis" : "ZhLabel,SrcNode,SrcPort,DstNode,DstPort",
			"operations" : ",,,,",
			"converters" : ",,,,,INTEGER,INTEGER"
		},
		"HANG" : {
			"kpis" : "LinkBwUsedPer,LinkInFlaw,LinkOutFlaw,LinkErrorPacketRate,LinkBroadcastPacketRate",
			"operations" : "MAX,MAX,MAX,MAX,MAX",
			"converters" : "PERCENT2LCD,KBYTEPS,KBYTEPS,PKGS,PKGS"
		}
	},
	"line" : {
		"TOOLTIP" : {
			"kpis" : "SrcNode,SrcPort,DstNode,DstPort,EventTotal,EventLevel,LinkBwUsedPer,LinkInBwUsedPer,LinkOutBwUsedPer,LinkInFlaw,LinkOutFlaw,LinkErrorPacketRate,LinkBroadcastPacketRate",
			"operations" : ",,,,,,MAX,MAX,MAX,MAX,MAX,MAX,MAX",
			"converters" : ",,,,LCD,ALARM,PERCENT2LCD,PERCENT2LCD,PERCENT2LCD,KBYTEPS,KBYTEPS,PKGS,PKGS"
		},
		"INFORMATION" : {
			"kpis" : "ZhLabel,SrcNode,SrcPort,DstNode,DstPort",
			"operations" : ",,,,",
			"converters" : ",,,,"
		},
		"HANG" : {
			"kpis" : "LinkBwUsedPer,LinkInFlaw,LinkOutFlaw,LinkErrorPacketRate,LinkBroadcastPacketRate",
			"operations" : "MAX,MAX,MAX,MAX,MAX",
			"converters" : "PERCENT2LCD,KBYTEPS,KBYTEPS,PKGS,PKGS"
		}
	}*/
}