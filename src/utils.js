import React from 'react';

const utils = {
  fen: {
    isAlreadyConstructed: fen => fen.split(" ").length === 6
  },
  pgn: {
    cure: str => str.split('{[#]} ').join(''),
    splitGames: str => str.split('[Event "?"]').map(str => `[Event "?"]${str}`).slice(1),
    getPrefixedMoves: (history, sideToMove, movesPerLine = 2) => {
      if (!history.length) {
        return ''
      }
      let prefixedMoves = [];
      let nextPly = 'black';
      if (sideToMove === 'w') {
        prefixedMoves.push(`1. ${history[0]}`)
      } else {
        prefixedMoves.push(' ');
        prefixedMoves.push(`1... ${history[0]}`);
        nextPly = 'white';
      }
      for (let i = 1; i < history.length; i++) {
        if (nextPly === 'white') {
          prefixedMoves.push(`${Math.ceil(prefixedMoves.length / 2) + 1}. ${history[i]}`);
          nextPly = 'black';
        } else {
          prefixedMoves.push(history[i]);
          nextPly = 'white'
        }
      }
      return prefixedMoves
    },
    getNotationJSX: (prefixedMoves, onClick, style = 'table') => {
      let element = [];
      if (style === 'table') {
        for (let i = 0; i < prefixedMoves.length; i += 2) {
          element.push(<tr key={`tr-${i}-${prefixedMoves[i]}`}><td onClick={(e) => onClick(i, e)}>{prefixedMoves[i]}</td>{i < prefixedMoves.length - 1 && <td onClick={(e) => onClick(i + 1, e)}>{prefixedMoves[i + 1]}</td>}</tr>)
        }
      } else {
        element = prefixedMoves.join(" ");
      }
      return element;
    },
  },
  game: {
    isValidGame: (game) => {
      if (!game) {
        return false
      }
      // Try catch to check for kings on the table
      try {
        if (game.game_over()) {
          return false
        }
        let moves = game.moves();
        if (moves.length) {
          return true
        }
        return false
      }
      catch (err) {
        return false
      }
    }
  }
}

export default utils;