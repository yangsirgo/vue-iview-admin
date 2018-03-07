function DevImg(context, imgsrc, centerX, centerY, type) {

	this.context = context;
	this.imgsrc = imgsrc;
	this.centerX = centerX;
	this.centerY = centerY;
	this.type = type;

	this.img = new Image();
	this.img.src = imgsrc;
	if (type == "upload") {
		var path = discoverbackplan.rootPath();
		path += "/";
		this.img.src = path + imgsrc;
	}

}

DevImg.prototype.setWidth = function(width) {
	this.width = width;
};

DevImg.prototype.setHeight = function(height) {
	this.height = height;
};

DevImg.prototype.setCenterX = function(x) {
	this.centerX = x;
};

DevImg.prototype.setCenterY = function(y) {
	this.centerY = y;
};

DevImg.prototype.draw = function() {
	this.context.save();
	var context = this.context;
	context.beginPath();

	// x,y坐标
	var x = this.centerX;// - this.width / 2;
	var y = this.centerY;// - this.height / 2;
	var width = this.width;
	var height = this.height;
	if (!this.img.complete) {
		this.img.addEventListener('load', function() {
			context.drawImage(this, x, y);
		});
	} else {/* 已加载完 */
		context.drawImage(this.img, x, y);
	}
	this.context.restore();
};

/**
 * 坐标是否包含在图片中
 */
DevImg.prototype.IsIncludePoint = function(Point) {
	var x = Point.x;
	var y = Point.y;
	if (x > this.centerX && x < this.centerX + this.img.width
			&& y > this.centerY && y < this.centerY + this.img.height) {
		return true
	}
	return false;
};

DevImg.prototype.getObject = function() {
	var object = new Object();

	object.imgsrc = this.imgsrc;
	object.centerX = this.centerX;
	object.centerY = this.centerY;

	// x,y坐标
	object.x = this.x;
	object.y = this.y;

	object.type = this.type;
	return object;
};
