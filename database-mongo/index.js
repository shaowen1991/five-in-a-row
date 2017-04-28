var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var gameSchema = mongoose.Schema({
  p1: String,
  p2: String,
  winner: String,
});

var scoreSchema = mongoose.Schema({
  player: String,
  score: Number
});

var game = mongoose.model('Game', gameSchema);
var score = mongoose.model('Score', scoreSchema);

game.newGame = () => {

}

game.getGame = () => {

}

score.newScore = () => {

}

score.getScore = () => {

}

module.exports.game = game;
module.exports.score = score;


