import React from 'react';

const ScoresTable = (props) => (
  <div>
    <h4>Winner Board</h4>
    {props.scores.map(score => 
      <li>Player: {score.player}   ||  Wins: {score.score}</li>
    )}
  </div>
)

export default ScoresTable;
