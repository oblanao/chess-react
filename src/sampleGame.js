import Chess from 'chess.js';
import testPgn from './data/testPgn';

const game = new Chess();
game.load_pgn(testPgn, { sloppy: true });

// game.move('e4')
// game.move('e5')
// game.move('Nf3')
// game.move('Nf6')
// game.move('Nc3')
// game.move('Nc6')
// game.move('Bc4')
// game.move('Bc5')
// game.move('O-O')
// game.move('O-O')
// game.move('d3')
// game.move('d6')
// game.move('h3')
// game.move('h6')
// game.move('a3')
// game.move('a6')
// game.move('Nb1')
// game.move('Nb8')
// game.move('Nc3')
// game.move('Nc6')
// game.move('Nb1')
// game.move('Nb8')
// game.move('Nc3')
// game.move('Nc6')
// game.move('Nb1')
// game.move('Nb8')
// game.move('Nc3')
// game.move('Nc6')
// game.move('Nb1')
// game.move('Nb8')
// game.move('Nc3')
// game.move('Nc6')
// game.move('Nb1')
// game.move('Nb8')
// game.move('Nc3')
// game.move('Nc6')



export default game;






