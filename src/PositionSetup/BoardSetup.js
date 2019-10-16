import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import './PositionSetup.css';

import { objToFen, START_FEN, CLEAR_FEN } from '../helpers';
import utils from '../utils';

export default function BoardSetup(props) {
  const [sideToMove, setSideToMove] = useState('w')
  const [fen, setFen] = useState('')
  const [castles, setCastles] = useState({
    K: true,
    Q: true,
    k: true,
    q: true,
  })
  useEffect(() => {
    setFen(props.fen || CLEAR_FEN)
  }, [props.fen])
  function getPosition(position) {
    setFen(objToFen(position))
  }
  function handleChange(e) {
    setSideToMove(e.target.value);
  }
  function handleCastlesChange(e) {
    setCastles({
      ...castles,
      [e.target.name]: !castles[e.target.name]
    })
  }
  function constructFen() {
    let fullFen = fen || START_FEN;
    if (utils.fen.isAlreadyConstructed(fullFen)) {
      return fullFen
    }
    // Add side to move
    fullFen += ` ${sideToMove}`;
    // Add castling
    fullFen += ` ${getFenForCastling()}`
    // Add en-passant
    fullFen += ` -`
    // Add final
    fullFen += ` 0 1`
    return fullFen
  }
  function getFenForCastling() {
    const keys = Object.keys(castles).filter(el => castles[el] === true).join("") || '-'
    return keys
  }
  function clearPosition() {
    setFen(CLEAR_FEN)
  }
  function startPosition() {
    setFen(START_FEN)
  }
  return (
    <div className="boardSetup-container">
      <div className="main-container">
        <Chessboard
          position={fen}
          dropOffBoard="trash"
          getPosition={getPosition}
          sparePieces={true}
          transitionDuration={0}
        />
      </div>
      <div className="extras-container">

        Side to move
        <form>
          <div className="radio">
            <label>
              <input type="radio" name="sideToMove" onChange={handleChange} value="w" checked={sideToMove === 'w'} />
              White
          </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="sideToMove" onChange={handleChange} value="b" checked={sideToMove === 'b'} />
              Black
          </label>
          </div>
        </form>
        Castling rights
        <form>
          <div>
            <label>
              <input type="checkbox" name="K" onChange={handleCastlesChange} checked={castles.K} />
              White 0-0
            </label>
            <br />
            <label>
              <input type="checkbox" name="Q" onChange={handleCastlesChange} checked={castles.Q} />
              White 0-0-0
            </label>
            <br />
            <label>
              <input type="checkbox" name="k" onChange={handleCastlesChange} checked={castles.k} />
              Black 0-0
            </label>
            <br />
            <label>
              <input type="checkbox" name="q" onChange={handleCastlesChange} checked={castles.q} />
              Black 0-0-0
            </label>
          </div>
        </form>
        <div className="buttons-container">
          <button id="button-clearBoard" onClick={clearPosition}>Clear Board</button>
          <button id="button-startPosition" onClick={startPosition}>Start Position</button><br />
          <button onClick={() => props.onSubmit(constructFen())}>Submit</button>
        </div>
      </div>
    </div>
  )
}