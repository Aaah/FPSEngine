/*
 * TODO : 
 * - add image for sprite
 * - ressource handler, loader at the beginning of the game
 * - cfg file for units
 * - mouse selection of a unit
 * - use of initialize?
 */

function Sprite() {

	this.x = 200;
	this.y = 200;
	this.radius = 24;
	this.color = '#600';
	this.outtercolor = '#c00';

}

Sprite.prototype.initialize = function() {

};

Sprite.prototype.draw = function(ctx) {
	
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.color;
	ctx.lineWidth = 3;
	ctx.strokeStyle = this.outtercolor;
	ctx.fill(); // fill the color
	ctx.stroke(); // fill the contour
	
};

Sprite.prototype.update = function(speed) {

	// logic for the movement of the sprite
	if (KEYBOARD.LEFT in keysDown) {
		this.x -= speed;
	}
	if (KEYBOARD.UP in keysDown) {
		this.y -= speed;
	}
	if (KEYBOARD.RIGHT in keysDown) {
		this.x += speed;
	}
	if (KEYBOARD.DOWN in keysDown) {
		this.y += speed;
	}

};
