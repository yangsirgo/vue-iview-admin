function BackPort(context, imgsrc, centerX, centerY, withIf, icontype, up_down,
		title, otherType, otherStatus, ifIndex, ifType, ifAdminStatus,
		ifOperStatus, ifDescr) {

	this.context = context;
	this.imgsrc = imgsrc;
	this.centerX = centerX;
	this.centerY = centerY;
	this.withIf = withIf;
	this.icontype = icontype;
	this.up_down = up_down;
	this.title = title;
	this.otherType = otherType;
	this.otherStatus = otherStatus;

	this.ifIndex = ifIndex;
	this.ifType = ifType;
	this.ifAdminStatus = ifAdminStatus;
	this.ifOperStatus = ifOperStatus;
	this.ifDescr = ifDescr;

	this.img = new Image();
	this.img.src = imgsrc;

}

BackPort.prototype.setImgWidth = function(width) {
	this.img.width = width;
};

BackPort.prototype.setImgHeight = function(height) {
	this.img.height = height;
};

BackPort.prototype.setCenterX = function(x) {
	this.centerX = x;
};

BackPort.prototype.setCenterY = function(y) {
	this.centerY = y;
};

BackPort.prototype.setImgsrc = function(imgsrc) {
	this.img.src = imgsrc;
};

BackPort.prototype.draw = function() {
	this.context.save();
	var context = this.context;
	context.beginPath();

	// x,y坐标
	var x = this.centerX;// - this.width / 2;
	var y = this.centerY;// - this.height / 2;
	if (this.up_down == "down") {
		var newY = this.centerY + this.img.height / 2;
		var newX = this.centerX + this.img.width / 2;
		context.translate(newX, newY);
		context.rotate(Math.PI);
	}
	var width = this.width;
	var height = this.height;
	if (!this.img.complete) {
		this.img.addEventListener('load', function() {
			if (this.up_down == "down") {
				context.drawImage(this, x - newX, y - newY);
			} else {
				context.drawImage(this, x, y);
			}
		});
	} else {/* 已加载完 */
		if (this.up_down == "down") {
			context.drawImage(this.img, x - newX, y - newY);
		} else {
			context.drawImage(this.img, x, y);
		}
	}
	this.context.restore();
};

/**
 * 坐标是否包含在图片中
 */
BackPort.prototype.IsIncludePoint = function(Point) {
	var x = Point.x;
	var y = Point.y;
	if (x > this.centerX && x < this.centerX + this.img.width
			&& y > this.centerY && y < this.centerY + this.img.height) {
		return true
	}
	return false;
};

BackPort.prototype.getObject = function() {
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
