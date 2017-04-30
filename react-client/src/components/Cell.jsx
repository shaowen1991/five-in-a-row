import React from 'react';

const Cell = (props) => (
  <a className="cell" onClick={() => {props.cellOnClick([props.rowIndex, props.colIndex])}}>{props.cell}</a>
)

export default Cell;