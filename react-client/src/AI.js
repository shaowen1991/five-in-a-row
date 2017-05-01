var GameTester = require('./GameTester.js');

var AI_main = (board) => {
  var maxScore = 0;
  var move = [];
  var playerStonesXY = [];

  for (var x = 0; x < 19; x++) {
    for (var y = 0; y < 19; y++) {
      //do something only when [x, y] is empty cell
      if (board[x][y] === 0) {
        var moveBoard_AI = copyMatrix(board); 
        var moveBoard_player = copyMatrix(board);
        moveBoard_AI[x][y] = 2; //toggle to AI's playerID
        moveBoard_player[x][y] = 1; //toggle to player's ID
        //use each new board to instanciate new tester class
        var gameTester_AI = new GameTester(moveBoard_AI); 
        var gameTester_player = new GameTester(moveBoard_player); 
        //justify this move [x,y]'s score
        //AI playerID = 2, player playerID = 1
        var AIScore = scoreEstimator(gameTester_AI, 2);
        var playerScore = scoreEstimator(gameTester_player, 1);
        var moveScore = AIScore / 2 + playerScore / 2;
        //if AI has a win move => put here to win
        //if player has a win move => put here to block
        if (AIScore === 101 || playerScore === 100) {
          return [x, y];
        }
        //update score and move
        if (moveScore > maxScore) {
          maxScore = moveScore;
          move = [x, y];
        }
        //store the [x, y] that has a player's stone around it
        if (hasNeighbors(board, x, y, 1)) {
          playerStonesXY.push([x, y]);
        }
      }
    }
  }
  //if maxScore is 0, chose random place for AI that is close to one of the player stone
  if (maxScore === 0) {
    var randomIndex = Math.floor(Math.random() * playerStonesXY.length);
    move = playerStonesXY[randomIndex];
  }
  return move;
}
//
//Deep copy a matrix to new one
// 
var copyMatrix = (board) => {
  var newBoard = [];
  for (var x = 0; x < 19; x++) {
    var row = [];
    for (var y = 0; y < 19; y++) {
      row.push(board[x][y]);
    }
    newBoard.push(row);
  }
  return newBoard;
}
//
//Give [x, y] on board, if there is one neighbor around it, return true
//
var hasNeighbors = (board, x, y, targetNeighbor) => {
  if (board[x - 1] !== undefined){
    if (board[x - 1][y - 1] === targetNeighbor) {
      return true;
    }
    if (board[x - 1][y] === targetNeighbor) {
      return true;
    }
    if (board[x - 1][y + 1] === targetNeighbor) {
      return true;
    }
  }
  
  if (board[x][y - 1] === targetNeighbor) {
    return true;
  }
  if (board[x][y + 1] === targetNeighbor) {
    return true;
  }

  if (board[x + 1] !== undefined) {
    if (board[x + 1][y - 1] === targetNeighbor) {
      return true;
    }
    if (board[x + 1][y] === targetNeighbor) {
      return true;
    }
    if (board[x + 1][y + 1] === targetNeighbor) {
      return true;
    }
  }
  return false;
}
//
//Given a gameTester including a current board with the new move,
//test functions, and a current player,
//calculate the highest score on this move.
//
var scoreEstimator = (gameTester, player) => {
  var playerScore = 0;
  var addition = player === 2 ? 1 : 0;
  if (form5(gameTester, player)) {
    playerScore = 100 + addition;
  }
  else if (live4(gameTester, player)) {
    playerScore = 90 + addition;
  }
  else if (double3(gameTester, player)) {
    playerScore = 80 + addition;
  }
  else if (live3(gameTester, player)) {
    playerScore = 50 + addition;
  }
  else if (doubleLive2(gameTester, player)) {
    playerScore = 40 + addition;
  }
  else if (live2(gameTester, player)) {
    playerScore = 20 + addition;
  }
  else {
    playerScore = 0;
  }

  return playerScore;
}

//
// differnt types of strategies, return boolean of board has this shape or not
//
var form5 = (gameTester, player) => {
  return gameTester.hasAnyRowWins(player, 5) || gameTester.hasAnyColWins(player, 5)
      || gameTester.hasAnyMajorDiagonalWins(player, 5) || gameTester.hasAnyMinorDiagonalWins(player, 5);
}
var live4 = (gameTester, player) => {
  return gameTester.hasAnyRowWins(player, 4) || gameTester.hasAnyColWins(player, 4)
      || gameTester.hasAnyMajorDiagonalWins(player, 4) || gameTester.hasAnyMinorDiagonalWins(player, 4);
}
var double3 = (gameTester, player) => {
  var truths = 0;
  if(gameTester.hasAnyRowWins(player, 3)) truths++;
  if(gameTester.hasAnyColWins(player, 3)) truths++;
  if(gameTester.hasAnyMajorDiagonalWins(player, 3)) truths++;
  if(gameTester.hasAnyMinorDiagonalWins(player, 3)) truths++;

  if (truths >= 2) return true;
  return false;
}
var live3 = (gameTester, player) => {
  return gameTester.hasAnyRowWins(player, 3) || gameTester.hasAnyColWins(player, 3)
      || gameTester.hasAnyMajorDiagonalWins(player, 3) || gameTester.hasAnyMinorDiagonalWins(player, 3);
}
var doubleLive2 = (gameTester, player) => {
  var truths = 0;
  if(gameTester.hasAnyRowWins(player, 2)) truths++;
  if(gameTester.hasAnyColWins(player, 2)) truths++;
  if(gameTester.hasAnyMajorDiagonalWins(player, 2)) truths++;
  if(gameTester.hasAnyMinorDiagonalWins(player, 2)) truths++;

  if (truths >= 2) return true;
  return false;
}
var live2 = (gameTester, player) => {
  return gameTester.hasAnyRowWins(player, 2) || gameTester.hasAnyColWins(player, 2)
      || gameTester.hasAnyMajorDiagonalWins(player, 2) || gameTester.hasAnyMinorDiagonalWins(player, 2);
}

module.exports = AI_main;

// 成5, 100分

// 活4、双死4、死4活3， 90分

// 双活3， 80分

// 死3活3， 70分

// 死4， 60分

// 活3， 50分

// 双活2， 40分

// 死3， 30分

// 活2， 20分

// 死2， 10分

// 单子 0分