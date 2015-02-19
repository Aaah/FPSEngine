function Unit(level) {

	this.speed = 10;
	this.sprite = new Sprite();
	this.crosshair = new Crosshair();
	this.sight = new Sight(level);

}

Unit.prototype.initialize = function(ctx) {
	this.sight.initialize(ctx);
};

Unit.prototype.draw = function(ctx) {

	this.sight.draw(ctx);
	this.crosshair.draw(ctx);
	this.sprite.draw(ctx);
	
	
};

Unit.prototype.update = function() {

	this.crosshair.update();
	this.sight.update(this.sprite.x,this.sprite.y);
	this.sprite.update(this.speed);

};
