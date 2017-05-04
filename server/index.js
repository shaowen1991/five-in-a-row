var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var Game_Score = require('../database-mongo');
var io = require('socket.io');
var UUID = require('node-uuid');
var http = require('http');
var verbose= false;        
var Game = Game_Score.game;
var Score = Game_Score.score;

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/gamesData', (req, res) => {
  var gamesData = {};
  Promise.resolve(gamesData)
    .then((gamesData) => { 
      // console.log('first then', gamesData);
      return Game.getGameRecord(gamesData);
    })
    .then(() => {
      // console.log('second then', gamesData);
      return Score.getScore(gamesData);
    })
    .then(() => {
      // console.log('final then', gamesData);
      res.send(gamesData)})
    .catch((err) => {
      console.log('get games data fail in Promise chain')
    });
})

app.post('/gameEnd', (req, res) => {
  var gameResultFromReq = req.body.gameResult;
  //put it in game records collection
  Game.putGameRecord(gameResultFromReq, res);
  //put it in score collection
  var newWinner = {
    player: gameResultFromReq.winner
  }
  Score.putScore(newWinner, res);
  console.log("Success put new score and game record into DB");
})


server.listen(3000, function() {
  console.log('listening on port 3000!');
});


/* Socket.IO server set up. */

//Express and socket.io can work together to serve the socket.io client files for you.
//This way, when the client requests '/socket.io/' files, socket.io determines what the client needs.
        
//Create a socket.io instance using our express server
var sio = io(server);

sio.use(function(socket, next) {
  var handshake = socket.request;
  next();
})
//create new board
var newBoard = [];
for (var i = 0; i < 19; i++) {
  newBoard.push([]);
  for (var j = 0; j < 19; j++) {
    newBoard[i][j] = 0;
  }
}
//create init states
var state = {
  p1: '',
  p2: '',
  board: newBoard
}

//Socket.io will call this function when a client connects, 
//So we can send that client a unique ID we use so we can 
//maintain the list of players.
sio.sockets.on('connection', function (client) {
  //Generate a new UUID, looks something like 
  //5b2ca132-64bd-4513-99da-90e838ca47d1
  //and store this on their socket/connection
  client.userid = UUID();

  //tell the player they connected, giving them their id
  client.emit('onconnected', { id: client.userid } );

  //Useful to know when someone connects
  console.log('\t socket.io:: player ' + client.userid + ' connected');
  
  //When this client disconnects
  client.on('disconnect', function () {
    //Useful to know when someone disconnects
    console.log('\t socket.io:: client disconnected ' + client.userid );
  }); //client.on disconnect
  


  client.on('click', function(data) {
    console.log('\t socket.io:: player ' + client.userid + ' clicked')
    var cordinate = data.cordinate;
    var opponentPlayerID = data.thisPlayerID;
    client.broadcast.emit('new piece', {
      cordinate: cordinate,
      opponentPlayerID: opponentPlayerID
    })
  });

  client.on('new game', ({p1}) => {
    state.p1 = p1;
    // console.log('socket on new game', state);
  })
  // console.log(state)
  client.on('join game', ({p2}) => {
    state.p2 = p2;
    client.broadcast.emit('game set', state);
    client.emit('game set', state);
  })
}); //sio.sockets.on connection



