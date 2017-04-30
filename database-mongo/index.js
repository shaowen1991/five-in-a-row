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
  created_at: String
});

var scoreSchema = mongoose.Schema({
  player: String,
  score: Number
});

var game = mongoose.model('Game', gameSchema);
var score = mongoose.model('Score', scoreSchema);

game.putGameRecord = (record, res) => {
  var newGameRecord = new game(record);
  newGameRecord.save((err, newGameRecord) => {
    if (err) console.log(err);
  });
}

score.putScore = (newWinner, res) => {
  score.findOneAndUpdate(
    newWinner,
    {$inc: {score: 1}},
    {upsert: true},
    (err, newScore) => {
      if (err) console.log(err);
    }
  );
}

game.getGameRecord = (gamesData) => {
  return game.find()
    .sort('-created_at')
    .exec((err, data) => {
      if (err) {
        console.log("DB getGameRecord fail");
        res.sendStatus(500);
      }
      console.log("DB getGameRecord");
      gamesData.games = data;
    })
}

score.getScore = (gamesData) => {
  return score.find()
    .sort('-score')
    .exec((err, data) => {
      if (err) {
        console.log("DB getScore fail");
        res.sendStatus(500);
      }
      console.log("DB getScore");
      gamesData.scores = data;
    });
}

module.exports.game = game;
module.exports.score = score;


