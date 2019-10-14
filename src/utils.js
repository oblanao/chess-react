module.exports = {
  fen: {
    isAlreadyConstructed: fen => fen.split(" ").length === 6
  },
  pgn: {
    cure: str => str.split('{[#]} ').join(''),
    splitGames: str => str.split('[Event "?"]').map(str => `[Event "?"]${str}`).slice(1),
    renderHistory: (history, sideToMove) => {
      if (!history.length) {
        return ''
      }
      let prefixedMoves = [];
      let nextPly = 'black';
      if (sideToMove === 'w') {
        prefixedMoves[0] = `1. ${history[0]}`
      } else {
        prefixedMoves[0] = `1... ${history[0]}`;
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
      return prefixedMoves.join(" ")
    }
  },
  game: {
    isValidGame: (game) => {
      console.log(`game`)
      console.log(game)
      if (!game) {
        console.log(`!game`)
        return false
      }
      // Try catch to check for kings on the table
      try {
        if (game.game_over()) {
          console.log(`gameOver`)
          return false
        }
        let moves = game.moves();
        console.log(`moves`, moves)
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