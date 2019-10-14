import React, { useState } from 'react';
import Chess from 'chess.js';

import DiagramViewer from '../DiagramViewer';
import BoardSetup from './BoardSetup';
import SolutionSetup from './SolutionSetup';
import './PositionSetup.css';

import utils from '../utils';

export default function PositionSetup(props) {
  const [game, setGame] = useState(null);
  const [fen, setFen] = useState('');
  const [pgn, setPgn] = useState('');
  const [stage, setStage] = useState('board')
  function onBoardSubmit(boardFen) {
    const newGame = new Chess(boardFen);
    if (utils.game.isValidGame(newGame)) {
      setFen(boardFen);
      setGame(newGame);
      setPgn(newGame.pgn())
      setStage('solution')
    } else {
      alert('Invalid game!')
    }
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
              <SolutionSetup onSubmit={onFinalSubmit} fen={fen} pgn={pgn} />
              :
              <DiagramViewer pgn={pgn} />
        }
      </div>
      {stage === 'board' ? null : <button onClick={goBack}>&lt; GO BACK </button>}
    </div>
  )
}