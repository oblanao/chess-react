import React, { useState } from 'react';
import BoardSetup from './BoardSetup';
import SolutionSetup from './SolutionSetup';

import Chess from 'chess.js';
import './PositionSetup.css';

import { objToFen, START_FEN, CLEAR_FEN } from '../helpers';
import DiagramViewer from '../DiagramViewer';

export default function PositionSetup(props) {
  const [game, setGame] = useState(null);
  const [fen, setFen] = useState('');
  const [pgn, setPgn] = useState('');
  const [stage, setStage] = useState('board')
  function onBoardSubmit(boardFen) {
    setFen(boardFen);
    const game = new Chess(boardFen);
    setGame(game);
    setStage('solution')
  }
  function onFinalSubmit(game) {
    setPgn(game.pgn())
    setStage('diagram')
  }
  function goBack() {
    const stages = ['board', 'solution', 'diagram'];
    const currIndex = stages.indexOf(stage);
    const newIndex = (currIndex - 1) % stages.length;
    setStage(stages[newIndex])
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="positionSetup-container">
        {
          stage === 'board' ?
            <BoardSetup fen={fen} onSubmit={onBoardSubmit} />
            :
            stage === 'solution' ?
              <SolutionSetup onSubmit={onFinalSubmit} game={game} />
              :
              <DiagramViewer pgn={pgn} />
        }
      </div>
      {stage === 'board' ? null : <button onClick={goBack}>&lt; GO BACK </button>}
    </div>
  )
}