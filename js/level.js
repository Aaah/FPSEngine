function Level() {
	this.strokeStyle = "#000";	
	
	this.segments = [
	// Border
	{a:{x:0,y:0}, b:{x:800,y:0}},
	{a:{x:800,y:0}, b:{x:800,y:400}},
	{a:{x:800,y:400}, b:{x:0,y:400}},
	{a:{x:0,y:400}, b:{x:0,y:0}},
	
	// Polygon #1
	{a:{x:100,y:150}, b:{x:120,y:50}},
	{a:{x:120,y:50}, b:{x:200,y:80}},
	{a:{x:200,y:80}, b:{x:140,y:210}},
	{a:{x:140,y:210}, b:{x:100,y:150}},
	// Polygon #2
	{a:{x:100,y:200}, b:{x:120,y:250}},
	{a:{x:120,y:250}, b:{x:60,y:300}},
	{a:{x:60,y:300}, b:{x:100,y:200}},
	// Polygon #3
	{a:{x:200,y:260}, b:{x:220,y:150}},
	{a:{x:220,y:150}, b:{x:300,y:200}},
	{a:{x:300,y:200}, b:{x:350,y:320}},
	{a:{x:350,y:320}, b:{x:200,y:260}},
	// Polygon #4
	{a:{x:340,y:60}, b:{x:360,y:40}},
	{a:{x:360,y:40}, b:{x:370,y:70}},
	{a:{x:370,y:70}, b:{x:340,y:60}},
	// Polygon #5
	{a:{x:450,y:190}, b:{x:560,y:170}},
	{a:{x:560,y:170}, b:{x:540,y:270}},
	{a:{x:540,y:270}, b:{x:430,y:290}},
	{a:{x:430,y:290}, b:{x:450,y:190}},
	// Polygon #6
	{a:{x:400,y:95}, b:{x:580,y:50}},
	{a:{x:580,y:50}, b:{x:480,y:150}},
	{a:{x:480,y:150}, b:{x:400,y:95}}
];

}
	
Level.prototype.draw = function(ctx) {
	
	ctx.strokeStyle = this.strokeStyle;
	
	for(var i=0;i<this.segments.length;i++){
		var seg = this.segments[i];
		ctx.beginPath();
		ctx.moveTo(seg.a.x,seg.a.y);
		ctx.lineTo(seg.b.x,seg.b.y);
		ctx.stroke();
	}
	
};