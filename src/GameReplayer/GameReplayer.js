import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import { START_FEN } from '../helpers';

import './GameReplayer.css';
import DiagramHistory from '../DiagramHistory/DiagramHistory';

export default function GameReplayer(props) {
  const [fen, setFen] = useState(START_FEN);
  const [game, setGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState(0);
  function toPrevMove() {
    if (currentMove > 0) {
      game.undo();
      setCurrentMove(currentMove - 1);
      setGame(game);
      setFen(game.fen())
    }
  }
  function toNextMove() {
    if (currentMove < props.game.history().length) {
      game.move(props.game.history()[currentMove]);
      setCurrentMove(currentMove + 1);
      setGame(game);
      setFen(game.fen())
    }
  }
  function onMoveClick(moveIndex) {
    setCurrentMove(moveIndex + 1)
    const newGame = new Chess();
    for (let i = 0; i <= moveIndex; i++) {
      newGame.move(props.game.history()[i])
    }
    setGame(newGame);
    setFen(newGame.fen())
  }
  return (
    <div>
      <div className="gameReplayer-container">
        <div className="boardContainer">
          <Chessboard position={fen} key={fen} draggable={false} />
          <button onClick={toPrevMove}>Prev</button>
          <button onClick={toNextMove}>Next</button>
        </div>
        <div className="notationContainer">
          <DiagramHistory currentMove={currentMove} onMoveClick={onMoveClick} sideToMove={props.game.turn()} history={props.game.history()} title={""} height={560} />
        </div>
      </div>
      <pre>
        fen: {fen}<br />
        currentMove: {currentMove}
      </pre>
    </div>
  )
}