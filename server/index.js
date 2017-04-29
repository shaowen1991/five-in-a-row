var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var Game_Score = require('../database-mongo');
var Game = Game_Score.game;
var Score = Game_Score.score;

var app = express();

var fakeGameData = {
  p1: 'Jack',
  p2: 'Kriz',
  winner: 'Jack',
  created_at: new Date()
}

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


app.listen(3000, function() {
  console.log('listening on port 3000!');
});




