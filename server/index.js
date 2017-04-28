var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');

var app = express();

var fakeGameData = {
  p1: 'Jack',
  p2: 'Kriz',
  winner: 'Jack'
}

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/games', (req, res) => {

})

app.get('/scores', (req, res) => {

})

app.post('/gameEnd', (req, res) => {

})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});




