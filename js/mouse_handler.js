function mouseDown(e) {

}

function mouseUp(e) {

}

function Crosshair() {
	x = 0;
	y = 0;
}

Crosshair.prototype.initialize = function() {
};

Crosshair.prototype.draw = function(ctx) {
	
	// Draw red dots
	ctx.fillStyle = "#dd3838";
	ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2*Math.PI, false);
    ctx.fill();
	for(var angle=0;angle<Math.PI*2;angle+=(Math.PI*2)/10){
		var dx = Math.cos(angle)*this.fuzzy_radius;
		var dy = Math.sin(angle)*this.fuzzy_radius;
		ctx.beginPath();
    	ctx.arc(this.x+dx, this.y+dy, 2, 0, 2*Math.PI, false);
    	ctx.fill();
    }
    
};

Crosshair.prototype.update = function(e) {
	
};

function mouseMove(e) {

	// get the position of crosshair
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		x = e.clientX;
		y = e.clientY;
	}
	
	//addDebugMessage("new coordinates: [" + x + "," +  y + "]");

}