import React from 'react';
import Cell from './Cell.jsx';

const Row = (props) => (
  <span className="row">
    {props.row.map((cell, index) => 
      <Cell cell={cell} rowIndex={props.rowIndex} colIndex={index} cellOnClick={props.cellOnClick}/>
    )}
  </span>
)

export default Row;