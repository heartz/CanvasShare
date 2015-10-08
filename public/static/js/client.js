//Canvas Drawing
$(function() {
	var canvas,
	context,
	dragging = false,
	dragStartLocation,
	snapshot,
	x1,y1,
	x2,y2,sides,angle;

	//Function to get Coordinates
	function getCanvasCoordinates(event) {

		var x = event.clientX - canvas.getBoundingClientRect().left,
		y = event.clientY - canvas.getBoundingClientRect().top;
		return {x: x, y: y};
	}
	function takeSnapshot() {
		snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
	}
	function restoreSnapshot() {
		context.putImageData(snapshot, 0, 0);
	} 

	//Draw the line
	function drawLine(x1,y1,x2,y2,fill,color) {
		context.strokeStyle = '#'+color;
		context.fillStyle = '#'+color;
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.stroke();

	}
	//Function for circle
	function drawCircle(x1,y1,x2,y2,fill,color) {
		context.strokeStyle = '#'+color;
		context.fillStyle = '#'+color;
		var radius = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
		context.beginPath();
		context.arc(x1, y1, radius, 0, 2 * Math.PI, false);
		if(fill){
			context.fill();
		}
		else{
			context.stroke();
		}
	}
	//Function for Polygon

	function drawPolygon(x1,y1,x2,y2, sides, angle,fill,color) {
		context.strokeStyle = '#'+color;
		context.fillStyle = '#'+color;
		var coordinates = [],
		radius = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)),
		index = 0;
		for (index = 0; index < sides; index++) {
			coordinates.push({x: x1 + radius * Math.cos(angle), y: y1 - radius * Math.sin(angle)});
			angle += (2 * Math.PI) / sides;
		}
		context.beginPath();
		context.moveTo(coordinates[0].x, coordinates[0].y);
		for (index = 1; index < sides; index++) {
			context.lineTo(coordinates[index].x, coordinates[index].y);
		}
		context.closePath();
		if(fill){
			context.fill();
		}
		else{
			context.stroke();
		}

	}
	//Function for Square
	function drawSquare(x1,y1,x2,y2,sides,angle,fill,color) {
		context.strokeStyle = '#'+color;
		context.fillStyle = '#'+color;
		var coordinates = [],
		radius = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)),
		index = 0;
		for (index = 0; index < sides; index++) {
			coordinates.push({x: x1 + radius * Math.cos(angle+Math.PI/4), y: y1 - radius * Math.sin(angle+Math.PI/4)});
			angle += Math.PI/2;
		}
		context.beginPath();
		context.moveTo(coordinates[0].x, coordinates[0].y);
		for (index = 1; index < sides; index++) {
			context.lineTo(coordinates[index].x, coordinates[index].y);
		}
		context.closePath();
		if(fill){
			context.fill();
		}
		else{
			context.stroke();
		}
	}
	function init() {
		canvas = $("#canvas")[0];
		context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.lineCap = 'round';
	}
	window.addEventListener('load', init, false);

	// Recieving functions
	
	var socket=io();
	socket.on('line',function(data){
		var b=JSON.parse(data);
		drawLine(b.x1,b.y1,b.x2,b.y2,b.fill,b.color)
	});

	socket.on('circle',function(data){
		var b=JSON.parse(data);
		drawCircle(b.x1,b.y1,b.x2,b.y2,b.fill,b.color)
	});

	socket.on('polygon',function(data){
		var b=JSON.parse(data);
		drawPolygon(b.x1,b.y1,b.x2,b.y2,8,Math.PI/4,b.fill,b.color);
	});
	socket.on('square',function(data){
		var b=JSON.parse(data);
		drawSquare(b.x1,b.y1,b.x2,b.y2,4,Math.PI/2,b.fill,b.color);
	});
	socket.on('clear',function(){
		context.clearRect ( 0 , 0 , canvas.width, canvas.height );
	});
});