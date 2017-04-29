import React from 'react';

const GameRecordItem = (props) => (
  <li>
    Player 1: { props.game.p1 }  ||  Player 2: { props.game.p2 }  ||  Winner: { props.game.winner }
  </li>
)

export default GameRecordItem;