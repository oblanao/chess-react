import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';

import './DiagramViewer.css';

export default class DiagramViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      history: [],
      orientation: '',
      sideToMove: ''
    }
  }
  componentDidMount() {
    this.setInitialGame();
  }
  makeGameFromPgn(pgn) {
    const game = new Chess();
    game.load_pgn(pgn);
    return game;
  }
  setInitialGame() {
    let initialGame = this.makeGameFromPgn(this.props.pgn);
    this.setState({
      history: initialGame.history()
    })
    while (initialGame.undo()) {
      initialGame.undo()
    }
    let game = initialGame;
    const turn = initialGame.turn();
    let orientation = 'white'
    let sideToMove = 'White to move'
    if (turn === 'b') {
      orientation = 'black';
      sideToMove = 'Black to move'
    }
    this.setState({
      game,
      orientation,
      sideToMove
    })
  }
  render() {
    return (
      <div className="diagramViewer-container">
        <Chessboard
          width={this.props.width || 300}
          id={this.state.game && this.state.game.fen()}
          draggable={false}
          position={this.state.game && this.state.game.fen()}
          orientation={this.state.orientation}
        />
        <p>{this.state.sideToMove}</p>
        <pre>{this.state.history.join(" ")}</pre>
      </div>
    )
  }
}