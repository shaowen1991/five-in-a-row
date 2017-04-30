// ROWS - run from left to right
// --------------------------------------------------------------
//
// test if a specific row on this board contains a win
class GameTester {
  constructor(board) {
    this.board = board;
  }

  hasRowWinAt(player, rowIndex) {
    let countPiece = 0;
    for (let rowElement of this.board[rowIndex]) {
      if (rowElement === player) {
        countPiece++;
      } else {
        countPiece = 0;
      }
      if (countPiece === 5) {
        return true;
      }
    }
    return false; 
  }

  // test if any rows on this board contain Wins
  hasAnyRowWins(player) {
    let wins = false;
    for (let rowIndex = 0; rowIndex < 19; rowIndex++) {
      wins = wins || this.hasRowWinAt(player, rowIndex);
    }
    return wins; 
  }



  // COLUMNS - run from top to bottom
  // --------------------------------------------------------------
  //
  // test if a specific column on this board contains a Win
  hasColWinAt(player, colIndex) {
    let countPiece = 0;
    for (let row of this.board) {
      if (row[colIndex] === player) {
        countPiece++;
      } else {
        countPiece = 0;
      }
      
      if (countPiece === 5) {
        return true;
      }
    }
    return false; 
  }

  // test if any columns on this board contain Wins
  hasAnyColWins(player) {
    let wins = false;
    for (let colIndex = 0; colIndex < 19; colIndex++) {
      wins = wins || this.hasColWinAt(player, colIndex);
    }
    return wins; 
  }



  // Major Diagonals - go from top-left to bottom-right
  // --------------------------------------------------------------
  //
  // test if a specific major diagonal on this board contains a Win
  hasMajorDiagonalWinAt(player, majorDiagonalColumnIndexAtFirstRow) {
    let countPiece = 0;
    let rowIndex = 0;
    let colIndex = majorDiagonalColumnIndexAtFirstRow;
    // console.log('rowIndex', rowIndex, 'colIndex', colIndex);
    while (rowIndex < 19 && colIndex < 19) {
      // console.log('count piece',countPiece);
      if (this.board[rowIndex][colIndex] === player) {
        countPiece++;
      } else {
        countPiece = 0;
      }
      if (countPiece === 5) {
        return true;
      }
      rowIndex++;
      colIndex++;
    }
    return false; 
  }

  // test if any major diagonals on this board contain Wins
  hasAnyMajorDiagonalWins(player) {
    let wins = false;
    // console.log('start');
    //checking the matrix by iterating through each col in the first row, starting from -(n-1)
    //because that will cover the slots in the bottom left corner of the matrix
    for (let colIndex = -18; colIndex < 19; colIndex++) {
      wins = wins || this.hasMajorDiagonalWinAt(player, colIndex);
    }
    // console.log('end');
    return wins;
  }


  // Minor Diagonals - go from top-right to bottom-left
  // --------------------------------------------------------------
  //
  // test if a specific minor diagonal on this board contains a Win
  hasMinorDiagonalWinAt(player, minorDiagonalColumnIndexAtFirstRow) {
    let countPiece = 0;
    let rowIndex = 0;
    let colIndex = minorDiagonalColumnIndexAtFirstRow;
    while (rowIndex < 19 && colIndex >= 0) {
      if (this.board[rowIndex][colIndex] === player) {
        countPiece++;
      } else {
        countPiece = 0;
      }
      if (countPiece === 5) {
        return true;
      }
      rowIndex++;
      colIndex--;
    }
    return false; 
  }

  // test if any minor diagonals on this board contain Wins
  hasAnyMinorDiagonalWins(player) {
    let wins = false;
    //checking the matrix by iterating through each col in the first row, starting from 0 to 2n-1
    //because that will cover the slots in the bottom right corner of the matrix
    for (let colIndex = 0; colIndex < 19 * 2 - 1; colIndex++) {
      wins = wins || this.hasMinorDiagonalWinAt(player, colIndex);
    }
    return wins;
  }
}



module.exports = GameTester;


