// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
server.listen(port, function () {
console.log('Server listening at port %d', port);
});
// Routing

app.use(express.static(__dirname + '/public'));

// when the client emits instructions, this listens and executes
io.on('connection', function (socket) {
	//Line
	socket.on('line', function (data) {
		io.emit('line',data);
	});
	//Circle
	socket.on('circle', function (data) {
		io.emit('circle',data);

	});
	//Polygon
	socket.on('polygon', function (data) {
		io.emit('polygon',data);
	});
	//Square
	socket.on('square', function (data) {
		io.emit('square',data);
	});
	//Dynamic
	socket.on('dynamic', function (data) {
		io.emit('dynamic',data);
	});
	//Clear
	socket.on('clear', function () {
		io.emit('clear');
	});
});
