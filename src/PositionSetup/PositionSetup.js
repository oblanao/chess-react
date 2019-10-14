import React, { useState } from 'react';
import Chess from 'chess.js';

import BoardSetup from './BoardSetup';
import SolutionSetup from './SolutionSetup';
import './PositionSetup.css';

import utils from '../utils';
import QuestionSetup from '../QuestionSetup/QuestionSetup';

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
    <div className="positionSetup-container">
      {
        stage === 'board' ?
          <BoardSetup fen={fen} onSubmit={onBoardSubmit} />
          :
          stage === 'solution' ?
            <SolutionSetup onSubmit={onFinalSubmit} fen={fen} pgn={pgn} />
            :
            <QuestionSetup pgn={pgn} />
      }
      {stage === 'board' ? null :
        <div>
          <button onClick={goBack}>&lt; GO BACK </button>
        </div>
      }
    </div>
  )
}