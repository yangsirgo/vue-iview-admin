
discoverbackplan = {
	data : {
		ethernet : ["rj45","100base","gbic"],	//以太口
		optical : ["fiber","sfp"],	//光纤口
		console : ["console","aux","telcom"],	//控制口
		other : ["c16","new_wic_2t","bnc","hssi","c36_utp","c36_mii","c36_dp60","c36_aui","c36_60","c36_15","c36_9"]	//其他
	},
	
	DEVLISTDATA: "",
	
	backplanViewShow : function(){
		window.open(backplanpath, '_blank');
	},
	
	searchAction : function(){
		$("#resultUl").show();
		discoverbackplan.makeSearchResult($("#searchDiv").find("input:first").val());
		defaultNav();
	},
	
	loadDevList : function(){
	},
	
	loadDevImg : function(){
		var data = {"logo":["logo/Allied.png","logo/Bdcom.png","logo/Cisco.png","logo/dlink.png","logo/EMC.png","logo/Extreme.png","logo/F5.png","logo/Foundry.png","logo/H3C.png","logo/HpMemproc.png","logo/HUAWEI.png","logo/IBM.png","logo/IBMNAS.png","logo/NetScreen.png","logo/Nortel.png","logo/Orinoco.png","logo/Quidway.png","logo/Radware.png","logo/SonicWALL.png","logo/TOPSEC.png"],"pkg_module":["pkg_module/1ce1b.gif","pkg_module/1ce1u.gif","pkg_module/1ct1csu.gif","pkg_module/1ct1dsu.gif","pkg_module/2600_card_2w.gif","pkg_module/2ce1b.gif","pkg_module/2ce1u.gif","pkg_module/2ct1csu.gif","pkg_module/2ct1dsu.gif","pkg_module/3600_card_1fe1r2w.gif","pkg_module/3600_card_1fe2w.gif","pkg_module/3600_card_2fe2w.gif","pkg_module/3600_card_4atm-e1.gif","pkg_module/3600_card_4atm-t1.gif","pkg_module/3600_card_8atm-e1.gif","pkg_module/3600_card_atm-t1.gif","pkg_module/4asyncserial.gif","pkg_module/4brist.gif","pkg_module/4briu.gif","pkg_module/6509_vss.gif","pkg_module/7600-SIP-200.gif","pkg_module/7600-SIP-400.gif","pkg_module/8asyncserial.gif","pkg_module/8brist.gif","pkg_module/8briu.gif","pkg_module/aic_64.gif","pkg_module/aip-h.gif","pkg_module/atm_25mbps_card.gif","pkg_module/BilboPOE_24_2.gif","pkg_module/BilboPOE_48_4.gif","pkg_module/Bilbo_24_2.gif","pkg_module/Bilbo_48_4.gif","pkg_module/c16-brist.gif","pkg_module/c16-briu.gif","pkg_module/c1605_card_dsu56k.gif","pkg_module/c1710.gif","pkg_module/c1720.gif","pkg_module/c1721.gif","pkg_module/c1750.gif","pkg_module/c1751.gif","pkg_module/c1760.gif","pkg_module/C1841-4rj.jpg","pkg_module/C1841-BRI.jpg","pkg_module/C1841.gif","pkg_module/c2610.gif","pkg_module/c2610xm.gif","pkg_module/c2611.gif","pkg_module/c2611xm.gif","pkg_module/c2612.gif","pkg_module/c2613.gif","pkg_module/c2620.gif","pkg_module/c2620xm.gif","pkg_module/c2621.gif","pkg_module/c2621xm.gif","pkg_module/c2650.gif","pkg_module/c2650xm.gif","pkg_module/c2651.gif","pkg_module/c2651xm.gif","pkg_module/c2691.gif","pkg_module/c2811_mocha.gif","pkg_module/c2820.gif","pkg_module/c2851_mocha.jpg","pkg_module/c2900-lre_xl_12.gif","pkg_module/c2900-lre_xl_24.gif","pkg_module/c2900_mocha.gif","pkg_module/c2908xl.gif","pkg_module/c2911.gif","pkg_module/c2912mxl.gif","pkg_module/c2912xl.gif","pkg_module/c2916xl-pismo.gif","pkg_module/c2916xl.gif","pkg_module/c2924cxl.gif","pkg_module/c2924mxl.gif","pkg_module/c2924xl.gif","pkg_module/c2940_tf.gif","pkg_module/c2940_tt.gif","pkg_module/c2948.gif","pkg_module/c2948g.gif","pkg_module/c2948ggetx.gif","pkg_module/c2948gl3.gif","pkg_module/c2950_12.gif","pkg_module/c2950_12g.gif","pkg_module/c2950_24.gif","pkg_module/c2950_24c.gif","pkg_module/c2950_24g.gif","pkg_module/c2950_24sx.gif","pkg_module/c2950_24_lre.gif","pkg_module/c2950_48g.gif","pkg_module/c2950_48sx.gif","pkg_module/c2950_48t.gif","pkg_module/c2955_12c.gif","pkg_module/c2955_12s.gif","pkg_module/c2955_12t.gif","pkg_module/c2960_24.gif","pkg_module/c2960_24_2.gif","pkg_module/c2960_48.gif","pkg_module/c2960_48_2.gif","pkg_module/c2960_8.gif","pkg_module/c2970_24.gif","pkg_module/c2970_24t.gif","pkg_module/c2980g.gif","pkg_module/c2980ga.gif","pkg_module/c3508xl.gif","pkg_module/c3512xl.gif","pkg_module/c3524pxl.gif","pkg_module/c3524xl.gif","pkg_module/c3548xl.gif","pkg_module/c3550_12g.gif","pkg_module/c3550_12t.gif","pkg_module/c3550_24.gif","pkg_module/c3550_24fx.gif","pkg_module/c3550_24pwr.gif","pkg_module/c3550_48.gif","pkg_module/c3560E_12.gif","pkg_module/c3560g_24p.gif","pkg_module/c3560g_24t.gif","pkg_module/c3560g_48p.gif","pkg_module/c3560g_48t.gif","pkg_module/c3560_24p.gif","pkg_module/c3560_24t.gif","pkg_module/c3560_48p.gif","pkg_module/c3560_48t.gif","pkg_module/c3620.gif","pkg_module/c3630.gif","pkg_module/c3640.gif","pkg_module/c3660.gif","pkg_module/c3661.gif","pkg_module/c3725.gif","pkg_module/c3745.gif","pkg_module/c3750me.gif","pkg_module/c3750_24_2_FX.gif","pkg_module/c3845_mocha.gif","pkg_module/c3945_mocha.png","pkg_module/c4-power.gif","pkg_module/c4003.gif","pkg_module/c4006.gif","pkg_module/c4148.gif","pkg_module/c4232.gif","pkg_module/c4306.gif","pkg_module/c4418.gif","pkg_module/c4448.gif","pkg_module/c4503.gif","pkg_module/c4506.gif","pkg_module/c4507r.gif","pkg_module/c4510r.gif","pkg_module/c49-300ac.gif","pkg_module/c4912g.gif","pkg_module/c4948.gif","pkg_module/c4950.gif","pkg_module/c5500.gif","pkg_module/c5505.gif","pkg_module/c5509.gif","pkg_module/C5520.gif","pkg_module/C5550.gif","pkg_module/c7000-ps.gif","pkg_module/c7200-io-2fe-e-h.gif","pkg_module/c7200-io-ge-e-h.gif","pkg_module/c7200-io-h.gif","pkg_module/c7202.gif","pkg_module/c7204.gif","pkg_module/c7204VXRf.gif","pkg_module/c7206-ps-ac.gif","pkg_module/c7206-ps-dc.gif","pkg_module/c7206.gif","pkg_module/c7206vxr-nops.gif","pkg_module/c7206vxr.gif","pkg_module/c7301.gif","pkg_module/c7304-nse100-h.gif","pkg_module/c7304.gif","pkg_module/c7401.gif","pkg_module/c7505.gif","pkg_module/c7507_mocha.gif","pkg_module/c7513.gif","pkg_module/c801.gif","pkg_module/c802.gif","pkg_module/c803.gif","pkg_module/c804.gif","pkg_module/c805.gif","pkg_module/c806.gif","pkg_module/c811.gif","pkg_module/c813.gif","pkg_module/c826.gif","pkg_module/c827-4v.gif","pkg_module/c827.gif","pkg_module/c827H.gif","pkg_module/c828.gif","pkg_module/c831.gif","pkg_module/c836.gif","pkg_module/c837.gif","pkg_module/c851.gif","pkg_module/c857.gif","pkg_module/c871.gif","pkg_module/c876.gif","pkg_module/c877.gif","pkg_module/c878.gif","pkg_module/cama.gif","pkg_module/card-16.gif","pkg_module/card-flexwan.gif","pkg_module/card_1ce1t1-pri_1147.gif","pkg_module/card_2ce1t1-pri_1148.gif","pkg_module/card_3600_nm-cem-4ser.gif","pkg_module/card_3600_nm-cem-4te1.gif","pkg_module/card_3600_nm-esw-161_16.gif","pkg_module/card_3600_nm-esw-161_32.gif","pkg_module/card_3600_nm-hd-1v.gif","pkg_module/card_3600_nm-hd-2v.gif","pkg_module/card_3600_nm-hd-2ve.gif","pkg_module/card_3600_nm-hda.gif","pkg_module/card_3600_nm-hdv2-1t1_e1.gif","pkg_module/card_3600_nm-hdv2-2t1_e1.gif","pkg_module/card_3600_nm-hdv2.gif","pkg_module/card_atm_1a-e3.gif","pkg_module/card_atm_1a-oc3mm.gif","pkg_module/card_atm_1a-oc3smi.gif","pkg_module/card_atm_1a-oc3sml.gif","pkg_module/card_atm_1a-oc3_mm-1v.gif","pkg_module/card_atm_1a-oc3_smi-1v.gif","pkg_module/card_atm_1a-oc3_sml-1v.gif","pkg_module/card_atm_1a-t3.gif","pkg_module/card_encryption_3des_mp_kaos.gif","pkg_module/card_nm-1fe-smf.gif","pkg_module/card_nm-cue.gif","pkg_module/card_nm-hdv.gif","pkg_module/card_nmd-ce-hp.gif","pkg_module/card_nm_16as.gif","pkg_module/card_nm_1ge.gif","pkg_module/card_nm_1t3e3.gif","pkg_module/card_nm_cids.gif","pkg_module/card_nm_nam.gif","pkg_module/card_pri_1fe-1ct1-csu.gif","pkg_module/card_pri_1fe-1ct1.gif","pkg_module/card_pri_1fe-2ce1-bu.gif","pkg_module/card_pri_1fe-2ct1-csu.gif","pkg_module/card_pri_1fe-2ct1.gif","pkg_module/card_pri_1fe-2e1.gif","pkg_module/card_vic2_2bri_nt_te.gif","pkg_module/card_vic2_2em.gif","pkg_module/card_vic2_2fxo.gif","pkg_module/card_vic2_2fxs.gif","pkg_module/card_vic_2b-nt_te.gif","pkg_module/card_vic_2b-st_te.gif","pkg_module/card_vic_2fxo-eu.gif","pkg_module/card_vic_2fxo-m1.gif","pkg_module/card_vic_2fxo-m2.gif","pkg_module/card_vic_2fxo-m3.gif","pkg_module/card_vic_did-2fxs.gif","pkg_module/card_vic_did-4fxs.gif","pkg_module/card_vwic2_1mft_t1e1.gif","pkg_module/card_vwic2_1mft_t1e1_g703.gif","pkg_module/card_vwic2_2mft_t1e1.gif","pkg_module/card_vwic2_2mft_t1e1_g703.gif","pkg_module/card_vwic_1mft-e1.gif","pkg_module/card_vwic_1mft-g703.gif","pkg_module/card_vwic_1mft-t1.gif","pkg_module/card_vwic_2e1_di.gif","pkg_module/card_vwic_2mft-e1.gif","pkg_module/card_vwic_2mft-g703.gif","pkg_module/card_vwic_2mft-t1.gif","pkg_module/card_vwic_2t1_di.gif","pkg_module/card_wic_1adsl_dg.gif","pkg_module/card_wic_1adsl_i_dg.gif","pkg_module/card_wic_1bri_st_v2.gif","pkg_module/card_wic_1bri_u_v2.gif","pkg_module/card_wic_1dsu_t1_v2.gif","pkg_module/card_wic_eswitch4port.gif","pkg_module/Cat3750G_24_2_TS.gif","pkg_module/Cat3750G_24_4_PS.gif","pkg_module/Cat3750G_24_4_TS_1U.gif","pkg_module/Cat3750G_48_4_PD.gif","pkg_module/Cat3750G_48_4_PS.gif","pkg_module/Cat3750G_48_4_TS.gif","pkg_module/cat4000_empty.gif","pkg_module/ccyc-p6509.jpg","pkg_module/ci7000-h.gif","pkg_module/cip-h.gif","pkg_module/cpm-1e1r.gif","pkg_module/cpm-2e.gif","pkg_module/cpu-7200-npe100-h.gif","pkg_module/cpu-7200-npe150-h.gif","pkg_module/cpu-7200-npe175-h.gif","pkg_module/cpu-7200-npe200-h.gif","pkg_module/cpu-7200-npe225-h.gif","pkg_module/cpu-7200-npe300-h.gif","pkg_module/cpu-7200-npe400-h.gif","pkg_module/cpu-7200-npeg1-h.gif","pkg_module/cpu-7200-nse1-h.gif","pkg_module/cpu-7301-npeg1-h.gif","pkg_module/dc-brist.gif","pkg_module/dc-briu.gif","pkg_module/defaultbackboard.png","pkg_module/defaultbackboard_2.png","pkg_module/defaultbackboard_3.png","pkg_module/defaultbackboard_4.png","pkg_module/defaultbackboard_5.png","pkg_module/defaultbackboard_6.png","pkg_module/defaultbackboard_7.png","pkg_module/defaultbackboard_8.png","pkg_module/defaultbackboard_9.png","pkg_module/E1000.jpg","pkg_module/E500.jpg","pkg_module/E500_2port.jpg","pkg_module/E500_4port.jpg","pkg_module/E500_8port.jpg","pkg_module/eip-h.gif","pkg_module/em.gif","pkg_module/F5000.gif","pkg_module/fg620b.gif","pkg_module/fip-h.gif","pkg_module/Frodo_0_12.gif","pkg_module/Frodo_24_0.gif","pkg_module/Frodo_24_4.gif","pkg_module/fsip-h.gif","pkg_module/fxo.gif","pkg_module/fxs.gif","pkg_module/geip-plus-h.gif","pkg_module/H3C-5040-16Port.jpg","pkg_module/H3C-5040-1port.jpg","pkg_module/H3C-5040-2Port.png","pkg_module/H3C-5040-2Serial.jpg","pkg_module/H3C-5040-4Port.png","pkg_module/H3C-5040-8Serial.png","pkg_module/H3C-5040-MPU.png","pkg_module/H3C-5040-non.png","pkg_module/H3C-S12508x2.jpg","pkg_module/hip-h.gif","pkg_module/Hirschmann.gif","pkg_module/Hirschmann_1.gif","pkg_module/Hirschmann_2.gif","pkg_module/io-1fe-tx-isl-h.gif","pkg_module/io-fe-h.gif","pkg_module/LST1FW2A1.jpg","pkg_module/LST1GT48-Vertical.jpg","pkg_module/LST1GT48LEB1.jpg","pkg_module/LST1MRPNC1.jpg","pkg_module/LST1XP32REB1.jpg","pkg_module/M10I.png","pkg_module/M7I.png","pkg_module/M8600-02XFP24SFP_12GT-EC.gif","pkg_module/M8600-24GT_12SFP.gif","pkg_module/M8600-24SFP.gif","pkg_module/M8600-MPLS.gif","pkg_module/M8600-VSU-02XFP.gif","pkg_module/M8600_02XFP24SFP-12GT_E.gif","pkg_module/M8606-CMII.gif","pkg_module/M8614-CMII.gif","pkg_module/mip-h.gif","pkg_module/module_fx2.gif","pkg_module/module_fx4.gif","pkg_module/module_tx4.gif","pkg_module/MP4152E.gif","pkg_module/n7000.gif","pkg_module/n7000_nexus.gif","pkg_module/NE40E.jpg","pkg_module/NE40E_10port.jpg","pkg_module/NE40E_24port1.jpg","pkg_module/NE40E_8port.jpg","pkg_module/ne40E_panel.gif","pkg_module/new_card_hssi_1.gif","pkg_module/new_wic_2as.gif","pkg_module/new_wic_2t.gif","pkg_module/nm_1fe_2w_v2_1143.gif","pkg_module/nm_1fe_2w_v2_1145.gif","pkg_module/nm_am_modem_286.gif","pkg_module/nm_am_modem_287.gif","pkg_module/nm_am_modem_4020.gif","pkg_module/nm_am_modem_4021.gif","pkg_module/nxn7000-01.gif","pkg_module/nxn7000_24.gif","pkg_module/nxn7000_24_p.gif","pkg_module/nxn7000_48.gif","pkg_module/nxn7000_48_p.gif","pkg_module/OSM-16OC3-POS-MM.gif","pkg_module/OSM-16OC3-POS-SI.gif","pkg_module/OSM-16OC3-POS-SL.gif","pkg_module/OSM-1OC48-POS-SI.gif","pkg_module/OSM-1OC48-POS-SL.gif","pkg_module/OSM-1OC48-POS-SS.gif","pkg_module/OSM-2OC12-ATM-MM.gif","pkg_module/OSM-2OC12-ATM-SI.gif","pkg_module/OSM-2OC12-POS-MM.gif","pkg_module/OSM-2OC12-POS-SI.gif","pkg_module/OSM-2OC12-POS-SL.gif","pkg_module/OSM-4GE-WAN-GBIC.gif","pkg_module/OSM-4OC12-POS-MM.gif","pkg_module/OSM-4OC12-POS-SI.gif","pkg_module/OSM-4OC12-POS-SL.gif","pkg_module/OSM-4OC3-POS-MM.gif","pkg_module/OSM-4OC3-POS-SI.gif","pkg_module/OSM-4OC3-POS-SL.gif","pkg_module/OSM-8OC3-POS-MM.gif","pkg_module/OSM-8OC3-POS-SI.gif","pkg_module/OSM-8OC3-POS-SL.gif","pkg_module/p6509-16port.jpg","pkg_module/p6509-48port.jpg","pkg_module/p6509-5port.jpg","pkg_module/pa-2fe-tx-h.gif","pkg_module/pa-2feisl-tx-h.gif","pkg_module/pa-4e-h.gif","pkg_module/pa-4r-h.gif","pkg_module/pa-4t-h.gif","pkg_module/pa-4t.gif","pkg_module/pa-5e-h.gif","pkg_module/pa-8ce1-h.gif","pkg_module/pa-8e-h.gif","pkg_module/pa-8t-v35-h.gif","pkg_module/pa-atmdx-smi-h.gif","pkg_module/pa-fe-tx-h.gif","pkg_module/pa-h1t-h.gif","pkg_module/pa-h2t-h.gif","pkg_module/pa-mc-8te1+-h.gif","pkg_module/pa-mc-8te1plus-h.gif","pkg_module/pa-mc-stm1-smi-h.gif","pkg_module/pa-vxc-2t1e1plus-h.gif","pkg_module/pane_e008_fe.gif","pkg_module/pane_e017_fe.gif","pkg_module/pane_e026t.gif","pkg_module/pane_e026_fe.gif","pkg_module/pane_hpa10508.gif","pkg_module/pane_s2008.gif","pkg_module/pane_s2008c.gif","pkg_module/pane_s2008cp.gif","pkg_module/pane_s2008ct.gif","pkg_module/pane_s2016.gif","pkg_module/pane_s2016c.gif","pkg_module/pane_s2026.gif","pkg_module/pane_s2026c_si.gif","pkg_module/pane_s2026z_si.gif","pkg_module/pane_s2108_ei.gif","pkg_module/pane_s2116_ei.gif","pkg_module/pane_s2126_ei.gif","pkg_module/pane_s2126_si.gif","pkg_module/pane_s2352p_ei.gif","pkg_module/pane_s2403h.gif","pkg_module/pane_s2403i.gif","pkg_module/pane_s2726tp_si.gif","pkg_module/pane_s3026.gif","pkg_module/pane_s3026c.gif","pkg_module/pane_s3026c2412fm.gif","pkg_module/pane_s3026c2412fs.gif","pkg_module/pane_s3026c_si.gif","pkg_module/pane_s3026e.gif","pkg_module/pane_s3026efm.gif","pkg_module/pane_s3026efs.gif","pkg_module/pane_s3026f.gif","pkg_module/pane_s3026g.gif","pkg_module/pane_s3026g_si.gif","pkg_module/pane_s3026pwr.gif","pkg_module/pane_s3026s_si.gif","pkg_module/pane_s3026t.gif","pkg_module/pane_s3026v.gif","pkg_module/pane_s3050.gif","pkg_module/pane_s3100_26tp_ei.gif","pkg_module/pane_s3100_52tp_si.gif","pkg_module/pane_s3328tp_ei.gif","pkg_module/pane_s3352p_ei.gif","pkg_module/pane_s3526.gif","pkg_module/pane_s3526c.gif","pkg_module/pane_s3526c2412fm.gif","pkg_module/pane_s3526c2412fs.gif","pkg_module/pane_s3526e.gif","pkg_module/pane_s3526efm.gif","pkg_module/pane_s3526efs.gif","pkg_module/pane_s3526f.gif","pkg_module/pane_s3528g.gif","pkg_module/pane_s3528p.gif","pkg_module/pane_s3552.gif","pkg_module/pane_s3552f.gif","pkg_module/pane_s3552f_ea.gif","pkg_module/pane_s3552g.gif","pkg_module/pane_s3552p.gif","pkg_module/pane_s3628p_ei.gif","pkg_module/pane_s3628p_si.gif","pkg_module/pane_s3628tp_si.gif","pkg_module/pane_s3652p_ei.gif","pkg_module/pane_s5012g.gif","pkg_module/pane_s5012g_ac.gif","pkg_module/pane_s5012t.gif","pkg_module/pane_s5012t_ac.gif","pkg_module/pane_s5024g.gif","pkg_module/pane_s5100_26c_ei.gif","pkg_module/pane_s5100_50c_ei.gif","pkg_module/pane_s5120_52c-ei.gif","pkg_module/pane_s5120_52p_si.gif","pkg_module/pane_s5124p_ei.gif","pkg_module/pane_s5124p_si.gif","pkg_module/pane_s5148p_si.gif","pkg_module/pane_S5324tp_pwr_si.gif","pkg_module/pane_S5324tp_si.gif","pkg_module/pane_s5328c_ei.gif","pkg_module/pane_s5328c_ei_24s.gif","pkg_module/pane_s5328c_pwr_ei.gif","pkg_module/pane_s5328c_pwr_si.gif","pkg_module/pane_s5328c_si.gif","pkg_module/pane_s5348tp_pwr_si.gif","pkg_module/pane_s5352c_ei.gif","pkg_module/pane_s5352c_pwr_ei.gif","pkg_module/pane_s5352c_pwr_si.gif","pkg_module/pane_s5352c_si.gif","pkg_module/pane_s5500_24p_si.gif","pkg_module/pane_s5500_28c_ei.gif","pkg_module/pane_s5500_28c_pwr_ei.gif","pkg_module/pane_s5500_28f_ei.gif","pkg_module/pane_s5500_52c_ei.gif","pkg_module/pane_s5500_52c_pwr_ei.gif","pkg_module/pane_s5516.gif","pkg_module/pane_s5528c_si.gif","pkg_module/pane_s5650c.gif","pkg_module/pane_S5700S_52P.gif","pkg_module/pane_s5728c_ei_24s.gif","pkg_module/pane_s5800_32c.gif","pkg_module/pane_S5800_32F.gif","pkg_module/pane_s6502.gif","pkg_module/pane_s6503.gif","pkg_module/pane_s6503_v5.gif","pkg_module/pane_s6506.gif","pkg_module/pane_s6506r.gif","pkg_module/pane_s6506r_v5.gif","pkg_module/pane_s6506_v5.gif","pkg_module/pane_s6902.gif","pkg_module/pane_s6903.gif","pkg_module/pane_s6906.gif","pkg_module/pane_s6906r.gif","pkg_module/pane_s7506e.gif","pkg_module/pane_s7506r.gif","pkg_module/pane_s7802.gif","pkg_module/pane_s7803.gif","pkg_module/pane_s7803l.gif","pkg_module/pane_s7806.gif","pkg_module/pane_s7806_v.gif","pkg_module/pane_s7810.gif","pkg_module/pane_s8502.gif","pkg_module/pane_s8505.gif","pkg_module/pane_s8508.gif","pkg_module/pane_s8508v.gif","pkg_module/pane_s8512.gif","pkg_module/pane_s8802.gif","pkg_module/pane_s8805.gif","pkg_module/pane_s8808.gif","pkg_module/pane_s8812.gif","pkg_module/pane_s9312.gif","pkg_module/pane_s9505.gif","pkg_module/pane_s9508.gif","pkg_module/pane_s9512_ei.gif","pkg_module/pane_se026.gif","pkg_module/pane_se026_si.gif","pkg_module/pane_se050.gif","pkg_module/pane_sr6608.gif","pkg_module/pane_sS5348tp_si.gif","pkg_module/pane_wlan.gif","pkg_module/pane_xrn_5500_24si.gif","pkg_module/pane_xrn_5500_28si.gif","pkg_module/pane_xrn_5500_52si.gif","pkg_module/pm-16a.gif","pkg_module/pm-1e.gif","pkg_module/pm-1fe-fx-v2.gif","pkg_module/pm-1fe.gif","pkg_module/pm-32a.gif","pkg_module/pm-4e.gif","pkg_module/pm-4r.gif","pkg_module/pm-compression.gif","pkg_module/pwr-c45-1000ac.gif","pkg_module/pwr-c45-1300acv.gif","pkg_module/pwr-c45-1400dc.gif","pkg_module/pwr-c45-1400dcsp.gif","pkg_module/pwr-c45-2800ac.gif","pkg_module/pwr-c49-300dc.gif","pkg_module/RGS2126S.gif","pkg_module/RGS2128G.gif","pkg_module/RGS2150G.gif","pkg_module/RGS5750S_24GT_12SF.gif","pkg_module/rp-h.gif","pkg_module/rsp1-h.gif","pkg_module/rsp16-h.gif","pkg_module/rsp2-h.gif","pkg_module/rsp4-h.gif","pkg_module/rsp4plus-h.gif","pkg_module/rsp7000-h.gif","pkg_module/rsp8-h.gif","pkg_module/S2000.gif","pkg_module/S3230.gif","pkg_module/s5624_28.gif","pkg_module/S5800_16port.gif","pkg_module/S7506E-24port.gif","pkg_module/S7506E-LSQM1SRPA0.gif","pkg_module/S7506E.gif","pkg_module/S7506E_2port.gif","pkg_module/S7506R_slot.gif","pkg_module/S7510E.gif","pkg_module/S8606.gif","pkg_module/S8614.gif","pkg_module/S8614X2.gif","pkg_module/S9306.gif","pkg_module/sa-encryption-h.gif","pkg_module/Shadowfax_16_1.gif","pkg_module/sip-h.gif","pkg_module/slot_10or100m_48.gif","pkg_module/slot_lsb1gp24b_green.gif","pkg_module/slot_lsb1gp24ca_gray.gif","pkg_module/slot_lsb1gt24b_green.gif","pkg_module/slot_lsb1gt24ca_gray.gif","pkg_module/slot_lsb1gt8pca_green.gif","pkg_module/slot_lsb1natb_gray.gif","pkg_module/slot_lsb1srp1n1_green.gif","pkg_module/slot_lsb1srp1n6_gray.gif","pkg_module/slot_lsb1srp2n5_gray.gif","pkg_module/sp-h.gif","pkg_module/SRX650.gif","pkg_module/ssip-h.gif","pkg_module/ssp-h.gif","pkg_module/subslot_1000base.gif","pkg_module/subslot_1000base_t_1.gif","pkg_module/subslot_10or100m_6.gif","pkg_module/subslot_10or100m_8.gif","pkg_module/subslot_rpe-x1.gif","pkg_module/t1_ft1_wic.gif","pkg_module/topsec.png","pkg_module/trip-h.gif","pkg_module/trp-h.gif","pkg_module/vip-blank-h.gif","pkg_module/vip-blank-v.gif","pkg_module/voip2v.gif","pkg_module/voip4v.gif","pkg_module/VS-S720-10G.gif","pkg_module/vss_4p.gif","pkg_module/vss_5p.gif","pkg_module/wic-1-enet.gif","pkg_module/wic-1adsl.gif","pkg_module/wic-1am.gif","pkg_module/wic-1shdsl.gif","pkg_module/wic-2am.gif","pkg_module/ws-4k-svc-nam.gif","pkg_module/ws-7603.gif","pkg_module/ws-7604.gif","pkg_module/ws-7606.gif","pkg_module/ws-7613.gif","pkg_module/ws-cac-1000w.gif","pkg_module/ws-cac-1360w.gif","pkg_module/ws-cac-2500w.gif","pkg_module/ws-cac-3000w.gif","pkg_module/ws-cac-4000w.gif","pkg_module/ws-cac-6000w.gif","pkg_module/ws-cdc-1000w.gif","pkg_module/ws-cdc-1360w.gif","pkg_module/ws-cdc-2500w.gif","pkg_module/ws-cdc-4000w.gif","pkg_module/ws-sup32-2x10ge-pfc3b-3bxl-msfc2a.gif","pkg_module/ws-sup32-2x10ge-pfc3b-3bxl.gif","pkg_module/ws-sup32-2x10ge.gif","pkg_module/ws-sup32-8ge-pfc3b-msfc2a.gif","pkg_module/ws-sup32-8ge-pfc3b.gif","pkg_module/ws-sup32-8ge.gif","pkg_module/ws-sup720-Vertical.jpg","pkg_module/ws-sup720.gif","pkg_module/ws-svc-idsm-2.gif","pkg_module/ws-svc-ssl-1.gif","pkg_module/ws-x2931-xl.gif","pkg_module/ws-x2932-xl.gif","pkg_module/ws-x2951-xl.gif","pkg_module/ws-x2961-xl.gif","pkg_module/ws-x2971-xl.gif","pkg_module/ws-x2972-xl.gif","pkg_module/ws-x4008dc.gif","pkg_module/ws-x4013-plus.gif","pkg_module/ws-x4013-ts.gif","pkg_module/ws-x4013.gif","pkg_module/ws-x4014.gif","pkg_module/ws-x4124-rj45.gif","pkg_module/ws-x4124fxmt.gif","pkg_module/ws-x4148febdlc.gif","pkg_module/ws-x4148felxmt.gif","pkg_module/ws-x4148fxmt.gif","pkg_module/ws-x4148rj21.gif","pkg_module/ws-x4148rj45v.gif","pkg_module/ws-x4224-rj45v.gif","pkg_module/ws-x4232-l3.gif","pkg_module/ws-x4232rjxx.gif","pkg_module/ws-x4232rjxx_subModules.gif","pkg_module/ws-x4248rj21v.gif","pkg_module/ws-x4248rj45v.gif","pkg_module/ws-x4302-gb.gif","pkg_module/ws-x4412-2gb-tx.gif","pkg_module/ws-x4424gbrj45.gif","pkg_module/ws-x4448-gb-sfp.gif","pkg_module/ws-x4448gbrj45.gif","pkg_module/ws-x4506-gb-t.gif","pkg_module/ws-x4515.gif","pkg_module/ws-x4516-10ge.gif","pkg_module/ws-x4516.gif","pkg_module/ws-x4524-gb-rj45v.gif","pkg_module/ws-x4548gbrj45.gif","pkg_module/ws-x6503.gif","pkg_module/ws-x6504E.gif","pkg_module/ws-x6506.gif","pkg_module/ws-x6509.gif","pkg_module/ws-x6582-pa.gif","pkg_module/WS-X6708-10GE.gif","pkg_module/ws-x6x06.gif","pkg_module/ws-x6x09.gif","pkg_module/ws-x6x13.gif","pkg_module/ws-x7609.jpg","pkg_module/ws-x7609_bak.jpg","pkg_module/wsg6483.gif","pkg_module/wsg6488.gif","pkg_module/wssvccsg.gif","pkg_module/wssvcfwm1.gif","pkg_module/wssvcnam1.gif","pkg_module/wssvcnam2.gif","pkg_module/wsx6024mtrj.gif","pkg_module/wsx6066slbapc.gif","pkg_module/wsx6101oc12mmf.gif","pkg_module/wsx6101oc12smf.gif","pkg_module/wsx6108gbic.gif","pkg_module/wsx6148aGETX.gif","pkg_module/wsx6148arj45.gif","pkg_module/wsx6148fesfp.gif","pkg_module/wsx6148GETX-Vertical.jpg","pkg_module/wsx6148GETX.gif","pkg_module/wsx6148rj21v.gif","pkg_module/wsx6148rj45v.gif","pkg_module/wsx6148x2rj45.gif","pkg_module/wsx6196rj21.gif","pkg_module/wsx6224ammmt.gif","pkg_module/wsx6224mmmt.gif","pkg_module/wsx6248arj45.gif","pkg_module/wsx6248atel.gif","pkg_module/wsx6248rj45.gif","pkg_module/wsx6248tel.gif","pkg_module/wsx6302amsm.gif","pkg_module/wsx6302msm.gif","pkg_module/wsx6316TX.gif","pkg_module/wsx6324mm.gif","pkg_module/wsx6324sm.gif","pkg_module/wsx6348rj21.gif","pkg_module/wsx6348rj45.gif","pkg_module/wsx6380nam.gif","pkg_module/wsx6381ids.gif","pkg_module/wsx6408agbic.gif","pkg_module/wsx6408gbic.gif","pkg_module/wsx6416gbic.gif","pkg_module/wsx6416sxmt.gif","pkg_module/wsx6500sfm.gif","pkg_module/wsx6500sfm2.gif","pkg_module/wsx650110gex4.gif","pkg_module/wsx650210ge.gif","pkg_module/wsx6516agbic.gif","pkg_module/wsx6516gbic.gif","pkg_module/wsx6516GETX.gif","pkg_module/wsx6524mm.gif","pkg_module/wsx6548GETX.gif","pkg_module/wsx6548rj21.gif","pkg_module/wsx6548VGETX.gif","pkg_module/wsx6608e1.gif","pkg_module/wsx6608t1.gif","pkg_module/wsx6624fxs.gif","pkg_module/wsx6648rj45.gif","pkg_module/wsx670410ge.gif","pkg_module/wsx6724sfp-Vertical.jpg","pkg_module/wsx6724sfp.gif","pkg_module/wsx6748GETX.gif","pkg_module/wsx6748sfp.gif","pkg_module/wsx6ks2amsfc2a.gif","pkg_module/wsx6ksup12ge.gif","pkg_module/wsx6ksup1a2ge.gif","pkg_module/wsx6ksup22ge.gif"],"interface":["interface/100base.gif","interface/bnc.gif","interface/c16.gif","interface/c36_15.gif","interface/c36_60.gif","interface/c36_9.gif","interface/c36_aui.gif","interface/c36_mii.gif","interface/c36_utp.gif","interface/fiber.gif","interface/gbic.gif","interface/hssi.gif","interface/new_wic_2t.gif","interface/rj45.gif","interface/sfp.gif"],"upload":[]}
		discoverbackplan.makeImgList(data);
	},
	
	uploadImg : function(){
		$("#uploadText").val("");
		$("#uploadImg").show();
		$("#uploadImg").find("a:last").bind("click",function(){
			var uploadText = $("#uploadText").val();
			if(uploadText == null || uploadText == "" || uploadText == undefined){
				infotip("请选择图片");
				return;
			}else if(! ("BMPPNGGIFJPGJPEG".indexOf(uploadText.split(".")[1].toUpperCase()) >= 0)){
				infotip("图片限于bmp,png,gif,jpeg,jpg格式！");
				return;
			}
			var formData = new FormData($( "#uploadForm" )[0]); 
			$.ajax({  
			    url: ctx + "/backplan/upload_img",
			    type: 'POST',  
			    data: formData,  
			    async: false,  
			    cache: false,  
			    contentType: false,  
			    processData: false,  
			    success: function (data) { 
					if(data){
						infotip("上传成功");
				 		$("#uploadImg").hide();
				 		discoverbackplan.loadDevImg();
				 		defaultNav();
					}else{
						infotip("上传失败");
					}
				},  
			    error: function (data) {  
					infotip("上传失败");
			    }  
			});  
			
		});
	},

	makeImgList : function(data){
		var imgSr = ctx + '/skin/blue/images/topology/backboard/';
		var imgList = $("#backLeftTree");
		imgList.html("");
		if(data.logo){
			var liStr = '<li class="backboardImgNav" id="logoLi"><p class="backboardnavtitle"><em  class="active"></em>厂商LOGO</p>'+ 
						'<ul class="backboardLeftNavLiImg" style="display:block;"></ul></li>';
			imgList.append(liStr);
			var arr = data.logo;
			for(var ele in arr){
				$("#logoLi").find("ul").append('<li><img src="'+imgSr+arr[ele]+'"></li>');
			}
			
		}
		if(data.pkg_module){
			var liStr = '<li class="backboardImgNav" id="pkg_moduleLi"><p class="backboardnavtitle"><em  class="active"></em>板卡</p>'+ 
						'<ul class="backboardLeftNavLiImg" style="display:none;"></ul></li>';
			imgList.append(liStr);
			var arr = data.pkg_module;
			for(var ele in arr){
				$("#pkg_moduleLi").find("ul").append('<li><img src="'+imgSr+arr[ele]+'"></li>');
			}
			
		}
		if(data.interface){
			var liStr = '<li class="backboardImgNav" id="interfaceLi"><p class="backboardnavtitle"><em  class="active"></em>接口</p>'+ 
						'<ul class="backboardLeftNavLiImg" style="display:none;"></ul></li>';
			imgList.append(liStr);
			var arr = data.interface;
			for(var ele in arr){
				$("#interfaceLi").find("ul").append('<li><img src="'+imgSr+arr[ele]+'"></li>');
			}
			
		}
		
		if(data.upload){
			var path = discoverbackplan.rootPath();
			path += "/";
			var liStr = '<li class="backboardImgNav" id="uploadLi"><p class="backboardnavtitle"><em  class="active"></em>自定义<a class="backbordBlue" onclick="discoverbackplan.uploadImg()">上传</a></p>'+ 
						'<ul class="backboardLeftNavLiImg" style="display:none;"></ul></li>';
			imgList.append(liStr);
			var arr = data.upload;
			for(var ele in arr){
				$("#uploadLi").find("ul").append('<li><img src="'+path+arr[ele]+'"></li>');
			}
			
		}
	},

	rootPath : function(){
		var curPath = window.document.location.href;// 获取主机地址之后的目录，如：//
		var pathName = window.document.location.pathname;
		var pos = curPath.indexOf(pathName); // 获取主机地址，如：
													// http://localhost:8083
		var localhostPaht = curPath.substring(0, pos); // 获取带"/"的项目名，如：/uimcardprj
		return localhostPaht;
	},
	makeSearchResult : function(str){
		data = discoverbackplan.DEVLISTDATA;
		var devList = $("#resultUl");
		var ONEINFO = '<li class="topoBackboardLeftNavLi"><p class="topoBackboardLeftNavLRP"><span>搜索结果</span><a onclick="hideResult(this,\'.topoBackboardLeftNavLR\')">X</a></p> </li>';
		devList.html(ONEINFO);
		if(data.router){
			var arr = data.router;
			var liStr = '<li class="topoBackboardLeftNavLi" id="routerLiSea"><p><em></em>路由器</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#routerLiSea").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.routerswitch){
			var liStr = '<li class="topoBackboardLeftNavLi" id="routerswitchLiSea"><p><em></em>三层交换机</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.routerswitch;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#routerswitchLiSea").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.firewall){
			var liStr = '<li class="topoBackboardLeftNavLi" id="firewallLi"><p><em></em>防火墙</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.firewall;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#firewallLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.wirelessap){
			var liStr = '<li class="topoBackboardLeftNavLi" id="wirelessapLi"><p><em></em>无线AP</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.wirelessap;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#wirelessapLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.switch){
			var liStr = '<li class="topoBackboardLeftNavLi" id="switchLi"><p><em></em>交换机</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.switch;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#switchLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.server){
			var liStr = '<li class="topoBackboardLeftNavLi" id="serverLiSea"><p><em></em>服务器</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.server;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#serverLiSea").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.host){
			var liStr = '<li class="topoBackboardLeftNavLi" id="hostLi"><p><em></em>主机</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.host;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#hostLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.storage){
			var liStr = '<li class="topoBackboardLeftNavLi" id="storageLi"><p><em></em>存储设备</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.storage;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#storageLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.node){
			var liStr = '<li class="topoBackboardLeftNavLi" id="nodeLi"><p><em></em>非网管</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.node;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#nodeLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.NetsSluice){
			var liStr = '<li class="topoBackboardLeftNavLi" id="NetsSluiceLi"><p><em></em>网闸</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.NetsSluice;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#NetsSluiceLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.loadbalance){
			var liStr = '<li class="topoBackboardLeftNavLi" id="loadbalanceLi"><p><em></em>负载均衡</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.loadbalance;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#loadbalanceLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.camera){
			var liStr = '<li class="topoBackboardLeftNavLi" id="cameraLi"><p><em></em>摄像设备</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.camera;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#cameraLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.ids){
			var liStr = '<li class="topoBackboardLeftNavLi" id="idsLi"><p><em></em>IDS</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.ids;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#idsLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}
		if(data.other){
			var liStr = '<li class="topoBackboardLeftNavLi" id="otherLi"><p><em></em>其它</p>'+
						'<ul class="topoBackboardLeftNavL2"></ul></li>';
			var arr = data.other;
			if(arr.length > 0){
				for(var ele in arr){
					var name = arr[ele].devname.toLowerCase();
					var ip = arr[ele].ip.toLowerCase();
					if(name.indexOf(str.toLowerCase()) >= 0 || ip.indexOf(str.toLowerCase()) >= 0){
						if(ele == 0){
							devList.append(liStr);
						}
						$("#otherLi").find("ul").append('<li name='+arr[ele].id+'><a>'+arr[ele].devname+'</a></li>')
					}
				}
			}
		}

	},

	makeDevList : function(data){},
	
	formatDevType:function(devType){},
}
