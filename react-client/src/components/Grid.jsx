import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row.jsx';

const Grid = (props) => (
  <div className="grid">
    {props.board.map((row, index) => 
      <Row row={row} rowIndex={index} index cellOnClick={props.cellOnClick}/>
    )}
  </div>
)

export default Grid;