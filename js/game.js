// debug setup
debug = {
	on : true,
	fps : true
};

// game variables
var Game = {
	fps : 60,
};

// game init
Game.start = function() {

	// normal canvas
	Game.canvas = document.getElementById('canvas');
	Game.context = Game.canvas.getContext('2d');
		
	// visibility canvas
	
    
	// level
	Game.level = new Level();
	
	// init
	Game.canvas.addEventListener('mousedown', mouseDown, false);
	Game.canvas.addEventListener('mouseup', mouseUp, false);
	Game.canvas.addEventListener('mousemove', mouseMove, false);

	// starting units
	Game.unit_t = [];
	Game.unit_t.push(new Unit(Game.level));
	
	Game.onEachFrame(Game.run);
};

// logic update of the game
Game.update = function() {

	//Game.level.update();

	// update units
	var i;
	for ( i = 0; i < Game.unit_t.length; i++) {
		Game.unit_t[i].update();
	}

	// debug logic
	if (debug.on) {
		updateDebugPanel();
		fps.update();
	}

};

// drawing step of the game
Game.draw = function() {

	// background erasal
	Game.context.fillStyle = '#000';
	Game.context.fillRect(0, 0, canvas.width, canvas.height);

	Game.level.draw(Game.context);
	
    //Game.maskcontext.fillStyle = '#FFF';
    //Game.maskcontext.fillRect(0, 0, Game.maskcanvas.width, Game.maskcanvas.height);
    	
	// draw units
	var i;
	for ( i = 0; i < Game.unit_t.length; i++ ) {
		Game.unit_t[i].draw(Game.context);
	}

	// debug messages
	if (debug.on) {
		showDebugMessages();
		fps.draw(Game.context);
	}

};

Game.onEachFrame = (function() {

	var requestAnimationFrame = window.RequestAnimationFrame;

	if (requestAnimationFrame) {
		return function(cb) {
			var _cb = function() {
				cb();
				requestAnimationFrame(_cb);
			};
			_cb();
		};
	} else {
		return function(cb) {
			setInterval(cb, 1000 / Game.fps);
		};
	}
})();

Game.run = (function() {
	var loops = 0, skipTicks = 1000 / Game.fps, maxFrameSkip = 10, nextGameTick = (new Date).getTime(), lastGameTick;

	return function() {
		loops = 0;

		while ((new Date).getTime() > nextGameTick) {
			Game.update();
			nextGameTick += skipTicks;
			loops++;
		}

		if (loops)
			Game.draw();

	};
})();

Game.start();
// launch game 