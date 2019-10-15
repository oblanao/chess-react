import React, { Component, useState } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import './SolutionSetup.css';
import utils from '../utils';
import DiagramHistory from '../DiagramHistory/DiagramHistory';

export default class SolutionSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      fen: '',
      toMove: null,
      orientation: ''
    }
    this.allowDrag = this.allowDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.undo = this.undo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    let game = new Chess();
    game.load(this.props.fen)
    const fen = game.fen();
    this.setState({ game, fen }, () => {
      this.setOrientation();
      this.updateToMove();
    })
  }
  setOrientation() {
    if (!this.state.game) {
      return
    }
    let orientation = 'white';
    if (this.state.game.turn() === 'b') {
      orientation = 'black'
    }
    this.setState({
      orientation
    })

  }
  updateToMove() {
    const { game } = this.state;
    if (!game) {
      return false
    }
    let toMove = 'White to move'
    if (game.turn() === 'b') {
      toMove = 'Black to move'
    }
    this.setState({ toMove })
  }

  allowDrag(piece, source) {
    const { game } = this.state;
    // do not pick up pieces if the game is over
    if (game.game_over()) return false
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.piece.substr(0, 1) !== 'w') ||
      (game.turn() === 'b' && piece.piece.substr(0, 1) !== 'b')) {
      return false
    }
    return true
  }
  updateGame(game) {
    this.setState({ game }, () => {
      this.setState({ fen: game.fen() }, this.updateToMove)
    })
  }
  onDrop(moveObj) {
    let { game } = this.state;
    const source = moveObj.sourceSquare;
    const target = moveObj.targetSquare;
    if (source === target) {
      return 'snapback'
    }
    // see if the move is legal
    let move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    })
    if (move === null) {
      return 'snapback'
    }
    this.updateGame(game)
  }
  undo() {
    let { game } = this.state;
    game.undo();
    this.updateGame(game)
    console.log(`fen now: ${this.state.fen}`)
  }
  onSubmit() {
    const turn = this.state.game.turn();
    const orientation = this.state.orientation;
    if (turn === 'b' && orientation === 'white' || turn === 'w' && orientation === 'black') {
      this.props.onSubmit(this.state.game);
    } else {
      alert(`Solution incomplete. Last move should be ${orientation}'s.`)
    }
  }
  render() {
    return (
      <div className="solutionSetup-container">
        <div className="main-container">
          <p>{this.state.toMove}</p>
          <Chessboard orientation={this.state.orientation} allowDrag={this.allowDrag} onDrop={this.onDrop} key={this.state.fen} position={this.state.fen} />
        </div>
        <div className="extras-container">
          {this.state.game &&
            <DiagramHistory
              title={"Solution entered"}
              height={300}
              history={this.state.game.history()}
              sideToMove={this.state.orientation === 'white' ? 'w' : 'b'}
            />}
          <div className="solution-buttons">
            <button onClick={this.undo}>Undo</button>
            <button onClick={this.onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}