import React from 'react';

const Cell = (props) => {
  var classString = "cell-" + props.cell;
  return (
    <a className={classString} onClick={() => {props.cellOnClick([props.rowIndex, props.colIndex])}}></a>)
}

export default Cell;