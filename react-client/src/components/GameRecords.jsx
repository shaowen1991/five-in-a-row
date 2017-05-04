import React from 'react';
import GameRecordItem from './GameRecordItem.jsx';

const GameRecords = (props) => (
  <div className="gamescore">
    <h4> Game played so far </h4>
    There are { props.games.length } games.
    { props.games.map((game, index) => <GameRecordItem key={index} game={game}/>)}
  </div>
)

export default GameRecords;