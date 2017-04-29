import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import GameRecords from './components/GameRecords.jsx';
import ScoresTable from './components/ScoresTable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      board: [],
      games: [],
      scores: [],
      p1: '',
      p2: ''
    }
    this.postGameResult = this.postGameResult.bind(this);
    this.getGamesData = this.getGamesData.bind(this);
    this.newGameOnClick = this.newGameOnClick.bind(this);
  }

  postGameResult () {
    console.log("click");
    $.ajax({
      url: '/gameEnd',
      method: 'POST',
      data: {gameResult: {
          p1: this.state.p1,
          p2: this.state.p2,
          winner: this.state.p1,
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

  newGameOnClick () {
    var p1 = prompt("Please enter your name");
    if (p1 == null || p1 == "") {
      console.log("User cancelled the propt.");
    } else {
      console.log("Hello " + p1 + "! How are you today?");
    }
    var p2 = prompt("Please enter your name");
    if (p2 == null || p2 == "") {
      console.log("User cancelled the propt.");
    } else {
      console.log("Hello " + p2 + "! How are you today?");
    }
    this.setState({
      p1: p1,
      p2: p2
    })
  }
  render() {
    return (<div>
      <h1>Five In A Row 五子棋</h1>
      <button onClick={this.newGameOnClick}> New Game </button>
      <button onClick={this.postGameResult}> New Fake Game Result</button>
      <div>Player 1: {this.state.p1}  ||  Player 2 : {this.state.p2} </div>
      <GameRecords games={this.state.games}/>
      <ScoresTable scores={this.state.scores}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));