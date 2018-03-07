var UIContiner = {

	Arr : {
		ArrList : undefined
	},

	initUIContiner : function() {
		UIContiner.Arr.ArrList = new Array();
	},

	getArr : function() {
		return UIContiner.Arr.ArrList;
	},

	addElement : function(obj) {
		UIContiner.Arr.ArrList.push(obj);
	}

}