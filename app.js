require('dotenv').config({ path: __dirname + '/variables.env' })
var express = require('express');
var http = require('http');
var app = express();
var servidor = http.createServer(app);
var puerto = process.env.PORT || 3000;
servidor.listen(puerto);
var io = require('socket.io').listen(servidor);

io.on('connection', (socket) => {
console.log(socket.id);
var tuid = socket.id;
		socket.on('txb', (data) => {
					
					vertw(data, tuid);
						
		});
console.log("nueva conexion");
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/' + 'index.html');
});



						function vertw(data3, tuid2) {



							var Twitter = require('node-tweet-stream'),t = new Twitter({
    consumer_key: process.env.KEYCON,
    consumer_secret: process.env.KEYCOS,
    token: process.env.TK,
    token_secret: process.env.TKS
  })
							t.track(data3);
						
						t.on('tweet', function(tweet){
						
						  io.to(tuid2).emit('tweetu', tweet.user.name);
						  io.to(tuid2).emit('tweett', tweet.text);
						  console.log(tweet.user.name)
						  console.log(tweet.text)
						});
						};