var keysDown = {};

var KEYBOARD = {
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40
};

window.addEventListener('keydown', function(e) {
	keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
	delete keysDown[e.keyCode];
});

var debugMessages = [];

// display all debug messages and empty the debugMessages array
function showDebugMessages() {
	
	var i;
	if (debug.on) {
		for ( i = 0; i < debugMessages.length; i++) {
			console.log("DEBUG: " + debugMessages[i]);
		}
		debugMessages = [];
	}

}

// append new debug message to the debugMessages array
function addDebugMessage(msg) {

	if (debug.on) {
		debugMessages.push(msg);
	}

}

// update the debug variables
function updateDebugPanel() {

	if (document.getElementById('debug-FPS').checked == true && debug.fps == false) {
		debug.fps = true;
		addDebugMessage("show fps enabled");
	}

	if (document.getElementById('debug-FPS').checked == false && debug.fps == true) {
		debug.fps = false;
		addDebugMessage("show fps disabled");
	}

}

// fps object
var fps = {
	current : 0,
	last : 0,
	lastUpdated : Date.now(),
	draw : function(ctx) {

		if (debug.fps) {
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, 100, 25);
			ctx.font = '12pt Arial';
			ctx.fillStyle = '#fff';
			ctx.textBaseline = 'top';
			ctx.fillText(fps.last + ' fps', 5, 5);
		}

	},
	update : function() {

		if (debug.fps) {
			fps.current++;
			if (Date.now() - fps.lastUpdated >= 1000) {
				fps.last = fps.current;
				fps.current = 0;
				fps.lastUpdated = Date.now();
			}
		}

	}
};
