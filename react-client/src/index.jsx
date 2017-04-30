import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import GameRecords from './components/GameRecords.jsx';
import ScoresTable from './components/ScoresTable.jsx';
import Grid from './components/Grid.jsx';
var GameTester = require('./GameTester.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      board: [],
      games: [],
      scores: [],
      p1: '',
      p2: '',
      currentPlayer: '',
      hasWinnerState: '',
      bet: 1
    }
    this.postGameResult = this.postGameResult.bind(this);
    this.getGamesData = this.getGamesData.bind(this);
    this.newGameOnClick = this.newGameOnClick.bind(this);
    this.cellOnClick = this.cellOnClick.bind(this);
    this.hasWinner = this.hasWinner.bind(this);
  }

  postGameResult (winner) {
    console.log("click");
    $.ajax({
      url: '/gameEnd',
      method: 'POST',
      data: {gameResult: {
          p1: this.state.p1,
          p2: this.state.p2,
          winner: winner,
          created_at: new Date()
      }},
      success: () => {
        console.log('Success POST data from client to server');
      },
      error: (err) => {
        console.log('client ajax post call err');
      }
    });
    this.getGamesData(); 
  }

  getGamesData () {
    $.ajax({
      url: '/gamesData',
      method: 'GET', 
      success: (data) => {
        console.log('Success GET data from server to client');
        console.log(data);
        this.setState({
          games: data.games,
          scores: data.scores
        })
      },
      error: (err) => {
        console.log('client ajax get call err');
      }
    });
  }

  componentWillMount() {
    this.getGamesData();
  } 

  hasWinner(player, board) {
    var gameTester = new GameTester(board);
    var hasWin = gameTester.hasAnyRowWins(player) || gameTester.hasAnyColWins(player)
      || gameTester.hasAnyMajorDiagonalWins(player) || gameTester.hasAnyMinorDiagonalWins(player);
    return hasWin;
  }
  
  cellOnClick(cordinate) {
    //if this cell is empty and has no winner yet
    if (this.state.board[cordinate[0]][cordinate[1]] === 0 && this.state.hasWinnerState ===  '\'s turn') {
      var newBoard = this.state.board;
      var toggleTo;
      var switchPlayer;
      var currentPlayerId;

      if (this.state.currentPlayer === this.state.p1) {
        toggleTo = 1;
        currentPlayerId = 1;
        switchPlayer = this.state.p2;
      } else {
        toggleTo = 2;
        currentPlayerId = 2;
        switchPlayer = this.state.p1;
      }
      newBoard[cordinate[0]][cordinate[1]] = toggleTo;

      //check if have a winner
      if(this.hasWinner(currentPlayerId, newBoard)){
        alert(this.state.currentPlayer + ' Wins!');
        this.postGameResult(this.state.currentPlayer);
        //has winner should stop the game by not allow clicking
        this.setState({
          board: newBoard,
          hasWinnerState: 'Wins!'
        })
      } else {
        this.setState({
          currentPlayer: switchPlayer,
          board: newBoard
        })
      }
    }
    //do nothing when cell is not empty
  }

  newGameOnClick () {
    var p1 = prompt("Please enter Player 1 name");
    var p2 = prompt("Please enter Player 2 name");
    
    var newBoard = [];
    for (var i = 0; i < 19; i++) {
      newBoard.push([]);
      for (var j = 0; j < 19; j++) {
        newBoard[i][j] = 0;
      }
    }
    
    this.setState({
      p1: p1,
      p2: p2,
      board: newBoard,
      currentPlayer: p1,
      hasWinnerState: '\'s turn'
    })
  }

  render() {
    return (<div>
      <h1>Five In A Row 五子棋</h1>
      <button onClick={this.newGameOnClick}> New Game </button>

      <div className="media">
        <div>
          <h4>{this.state.currentPlayer} {this.state.hasWinnerState}</h4>
          <Grid className="col-md-7" board={this.state.board} cellOnClick={this.cellOnClick}/>
        </div>
        <div className="col-md-5">
          <div>Player 1: {this.state.p1} ========== Player 2 : {this.state.p2} </div>
          <GameRecords games={this.state.games}/>
          <ScoresTable scores={this.state.scores}/>
        </div>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));