//Canvas Drawing
$(function() {
	var canvas,
	context,
	dragging = false,
	dragStartLocation,
	snapshot,
	sides,
	angle;
	var clickX = new Array();
	var clickY = new Array();
	var paint;
	var mouseX;
	var mouseY;

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

	function addClick(x, y, dragging){
		clickX.push(x);
		clickY.push(y);
	}
	function redraw(color){
		context.strokeStyle = "#"+color;
		for(var i=0; i < clickX.length; i++) {		
			context.beginPath();
			if(i){
			    context.moveTo(clickX[i-1], clickY[i-1]);
			}
			else{
			    context.moveTo(clickX[i]-1, clickY[i]);
			}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.stroke();
		}
	}
	// Sends the function parameters to the clients
	function sending(x1,x2,y1,y2,sides,angle,fill,color){
		var prop={x1:x1,x2:x2,y1:y1,y2:y2,sides:sides,angle:angle,fill:fill,color:color};
		var a=JSON.stringify(prop);
		return a;

	}
	// Main draw function that calls the other draw functions
	function draw(x1,y1,x2,y2){
		fillBox=$("#fillBox")[0];
		radiobutton1=$("#radiobutton1")[0];
		radiobutton2=$("#radiobutton2")[0];
		radiobutton3=$("#radiobutton3")[0];
		radiobutton4=$("#radiobutton4")[0];
		var color=$('#c_picker').val()
		if(radiobutton1.checked ==true ){
			a=sending(x1,x2,y1,y2,sides,angle,fillBox.checked,color);
			socket.emit('line',a);

		}
		if(radiobutton2.checked==true){
			a=sending(x1,x2,y1,y2,sides,angle,fillBox.checked,color);
			socket.emit('circle',a);
		}
		if(radiobutton3.checked==true){
			a=sending(x1,x2,y1,y2,sides,angle,fillBox.checked,color);
			socket.emit('polygon',a);
		}
		if(radiobutton4.checked==true){
			a=sending(x1,x2,y1,y2,sides,angle,fillBox.checked,color);
			socket.emit('square',a);
		}
	}
	$('#canvas').mouseleave(function(e){
  		paint = false;
  		clickX = new Array();
		clickY = new Array();
		var dynamic_array =JSON.stringify({x:clickX,y:clickY,color:$('#c_picker').val()});
		socket.emit('dynamic',dynamic_array);
	});
	//To show currently drawn item
	function currentDraw(x1,y1,x2,y2){
		fillBox=$("#fillBox")[0];
		radiobutton1=$("#radiobutton1")[0];
		radiobutton2=$("#radiobutton2")[0];
		radiobutton3=$("#radiobutton3")[0];
		radiobutton4=$("#radiobutton4")[0];
		var color =$('#c_picker').val()
		if(radiobutton1.checked ==true ){
			drawLine(x1,y1,x2,y2,fillBox.checked,color);}

		if(radiobutton2.checked==true){
			drawCircle(x1,y1,x2,y2,fillBox.checked,color)
		}
		if(radiobutton3.checked==true){
			drawPolygon(x1,y1,x2,y2,8,Math.PI/4,fillBox.checked,color);
		}
		if(radiobutton4.checked==true){
			drawSquare(x1,y1,x2,y2,4,Math.PI/2,fillBox.checked,color);
		}
	}
	function dragStart(event) {
		if(radiobutton5.checked==true){
				dragStartLocation = getCanvasCoordinates(event);
				paint = true;
				addClick(dragStartLocation.x, dragStartLocation.y);
				var dynamic_array =JSON.stringify({x:clickX,y:clickY,color:$('#c_picker').val()});
				socket.emit('dynamic',dynamic_array);
		}
		else{
			dragging = true;
			dragStartLocation = getCanvasCoordinates(event);
			takeSnapshot();
			x1=dragStartLocation.x;
			y1=dragStartLocation.y;
		}
	}
	function drag(event) {
		if(radiobutton5.checked==true){
			if(paint){
			    dragStartLocation = getCanvasCoordinates(event);
			    addClick(dragStartLocation.x, dragStartLocation.y);
				var dynamic_array =JSON.stringify({x:clickX,y:clickY,color:$('#c_picker').val()});
				socket.emit('dynamic',dynamic_array);
			  }
			}
		else{
			var position;
			if (dragging === true) {
				restoreSnapshot();
				position = getCanvasCoordinates(event);
				x2=position.x;
				y2=position.y;
				currentDraw(x1,y1,x2,y2);
			}
		}
	}
	function dragStop(event) {
		if(radiobutton5.checked==true){
			paint = false;
			clickX = new Array();
			clickY = new Array();
			var dynamic_array =JSON.stringify({x:clickX,y:clickY,color:$('#c_picker').val()});
			socket.emit('dynamic',dynamic_array);
		}
		else{
			dragging = false;
			restoreSnapshot();
			var position = getCanvasCoordinates(event);
			x2=position.x;
			y2=position.y;
			draw(x1,y1,x2,y2);
		}
	}
	function init() {
		canvas = $("#canvas")[0];
		context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.lineCap = 'round';
		canvas.addEventListener('mousedown', dragStart, false);
		canvas.addEventListener('mousemove', drag, false);
		canvas.addEventListener('mouseup', dragStop, false);
	}
	window.addEventListener('load', init, false);

	// Sending Clear Instruction
	
	$("#clearer").click(function(){
		socket.emit('clear');
		clickX = new Array();
		clickY = new Array();
	});

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
	socket.on('dynamic',function(data){
		var dynamic_recieve=JSON.parse(data);
		clickX=dynamic_recieve.x;
		clickY=dynamic_recieve.y;
		color=dynamic_recieve.color;
		redraw(color);
	});
	socket.on('clear',function(){
		context.clearRect ( 0 , 0 , canvas.width, canvas.height );
	});
});