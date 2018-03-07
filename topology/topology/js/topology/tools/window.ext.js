function ajaxOpenTitleWindow(ctx, title, width, height, urlStr){
	loadingwindow(ctx, 200, 50, '加载中...')
	$.ajax({
		type : "get",
		url : urlStr,
		dataType : "html",
		timeout : 60000, //超时时间设置，单位毫秒
		success : function(content) {
    		closeLodingWindow();
			opentitlewindow(title, width, height, content, "NetToolsDisconnect()")
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
	        if(textStatus == 'timeout') {
	    		closeLodingWindow();
				layer.msg('您的操作请求已经超时',{icon:0});
	        } else {
	    		closeLodingWindow();
				layer.msg("系统异常，请联系管理员",{icon:0});
	        }
	    }
	})	
}
