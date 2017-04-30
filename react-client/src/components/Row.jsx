import React from 'react';
import Cell from './Cell.jsx';

const Row = (props) => (
  <div className="gridrow">
    {props.row.map((cell, index) => 
      <Cell key={index} cell={cell} rowIndex={props.rowIndex} colIndex={index} cellOnClick={props.cellOnClick}/>
    )}
  </div>
)

export default Row;