function Sight(level) {
	this.radius = 200; // horizon of sight
	this.fuzzy_sight = 50;
	this.aperture = 45; // aperture of sight
	this.look_direction = 0;
	this.fuzzy_radius = 10; // fuzzy radius
	this.polygons = []; // current sight polygon
	this.level = level;
	this.x = 0;
	this.y = 0;
	this.radgrad = 0;
}

Sight.prototype.update = function(x,y) {
	
	this.x = x;
	this.y = y;
	this.polygons = [this.getSightPolygon(x,y)];
	
};

Sight.prototype.draw = function(ctx) {
	
	for(var angle = 0; angle < Math.PI*2; angle += (Math.PI*2)/10){
		var dx = Math.cos(angle) * this.fuzzy_radius;
		var dy = Math.sin(angle) * this.fuzzy_radius;
		this.polygons.push( this.getSightPolygon( this.x+dx, this.y+dy) );
	};
	
	// Draw sight as one-body polygon
	for(var i=1;i<this.polygons.length;i++){
		this.drawPolygon(this.polygons[i],ctx,"rgba(255,255,255,0.2)");
	}
	this.drawPolygon(this.polygons[0],ctx,"#fff");


	var maskcanvas = document.createElement('canvas');
	maskcanvas.width = 800;
	maskcanvas.height = 400;
	maskcontext = maskcanvas.getContext('2d');
	maskcontext.translate(-maskcanvas.width, 0);
    maskcontext.shadowOffsetX = maskcanvas.width;    
    maskcontext.shadowOffsetY = 0;
    maskcontext.shadowColor = '#000';
    maskcontext.shadowBlur = 50;
    
    maskcontext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    maskcontext.closePath();
    maskcontext.fill();
    
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(maskcanvas, 0, 0);
    ctx.restore();
    	
};

Sight.prototype.drawPolygon = function(polygon,ctx,fillStyle){
	
	ctx.fillStyle = fillStyle;
	ctx.beginPath();
	ctx.moveTo(polygon[0].x,polygon[0].y);
	for(var i=1;i<polygon.length;i++){
		var intersect = polygon[i];
		ctx.lineTo(intersect.x,intersect.y);
	}
	ctx.fill();
	
};

// Find intersection of RAY & SEGMENT
Sight.prototype.getIntersection = function(ray,segment) {
	
	// RAY in parametric: Point + Delta*T1
	var r_px = ray.a.x;
	var r_py = ray.a.y;
	var r_dx = ray.b.x-ray.a.x;
	var r_dy = ray.b.y-ray.a.y;
	
	// SEGMENT in parametric: Point + Delta*T2
	var s_px = segment.a.x;
	var s_py = segment.a.y;
	var s_dx = segment.b.x-segment.a.x;
	var s_dy = segment.b.y-segment.a.y;
	
	// Are they parallel? If so, no intersect
	var r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
	var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
	if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){
		// Unit vectors are the same.
		return null;
	}
	
	var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
	var T1 = (s_px+s_dx*T2-r_px)/r_dx;
	
	// Must be within parametic whatevers for RAY/SEGMENT
	if(T1<0) return null;
	if(T2<0 || T2>1) return null;
	
	// Return the POINT OF INTERSECTION
	return {
		x: r_px+r_dx*T1,
		y: r_py+r_dy*T1,
		param: T1
	};
};

Sight.prototype.getSightPolygon = function(sightX,sightY) {
	
	var segments = this.level.segments;
	
	// Get all unique points
	var points = (function(segments){
		var a = [];
		segments.forEach(function(seg){
			a.push(seg.a,seg.b);
		});
		return a;
	})(segments);
	
	var uniquePoints = (function(points){
		var set = {};
		return points.filter(function(p){
			var key = p.x+","+p.y;
			if(key in set){
				return false;
			}else{
				set[key]=true;
				return true;
			}
		});
	})(points);
	
	// Get all angles
	var uniqueAngles = [];
	for(var j=0;j<uniquePoints.length;j++){
		var uniquePoint = uniquePoints[j];
		var angle = Math.atan2(uniquePoint.y-sightY,uniquePoint.x-sightX);
		
		uniquePoint.angle = angle;
		uniqueAngles.push(angle-0.00001,angle,angle+0.00001);
		
	}
	
	// RAYS IN ALL DIRECTIONS
	var intersects = [];
	for(var j=0;j<uniqueAngles.length;j++){
		var angle = uniqueAngles[j];
		
		// Calculate dx & dy from angle
		var dx = Math.cos(angle);
		var dy = Math.sin(angle);
		
		// Ray from center of screen to mouse
		var ray = {
			a:{x:sightX,y:sightY},
			b:{x:sightX+dx,y:sightY+dy}
		};
		
		// Find CLOSEST intersection
		var closestIntersect = null;
		for(var i=0;i<segments.length;i++){
			var intersect = this.getIntersection(ray,segments[i]);
			if(!intersect) continue;
			if(!closestIntersect || intersect.param<closestIntersect.param){
				closestIntersect=intersect;
			}
		}
		
		// Intersect angle
		if(!closestIntersect) continue;
		closestIntersect.angle = angle;
		
		// Add to list of intersects
		intersects.push(closestIntersect);
	}
	
	// Sort intersects by angle
	intersects = intersects.sort(function(a,b){
		return a.angle-b.angle;
	});
	
	// Polygon is intersects, in order of angle
	return intersects;
};