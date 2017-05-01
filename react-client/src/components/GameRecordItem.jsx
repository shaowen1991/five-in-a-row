import React from 'react';

const GameRecordItem = (props) => (
  <li>
    { props.game.p1 } --VS-- { props.game.p2 }  ||  Winner: { props.game.winner }
  </li>
)

export default GameRecordItem;