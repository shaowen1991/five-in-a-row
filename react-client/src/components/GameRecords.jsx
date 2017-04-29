import React from 'react';
import GameRecordItem from './GameRecordItem.jsx';

const GameRecords = (props) => (
  <div>
    <h4> Game played so far </h4>
    There are { props.games.length } games.
    { props.games.map(game => <GameRecordItem game={game}/>)}
  </div>
)

export default GameRecords;