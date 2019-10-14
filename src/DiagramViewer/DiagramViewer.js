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
      sideToMove: '',
      diagramText: '',
    }
    this.handleChange = this.handleChange.bind(this);
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
    console.log(initialGame.history())
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
      turn,
      orientation,
      sideToMove
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  renderHistory(history, sideToMove) {
    console.log(`received history`, history)
    console.log(`received sideToMove`, sideToMove)
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
  render() {
    return (
      <div className="diagramViewer-container">
        <input type="text" placeholder="Diagram text..." name="diagramText" value={this.state.diagramText} onChange={this.handleChange} />
        <Chessboard
          width={this.props.width || 300}
          id={this.state.game && this.state.game.fen()}
          draggable={false}
          position={this.state.game && this.state.game.fen()}
          orientation={this.state.orientation}
        />
        <p>{this.state.sideToMove}</p>
        <p>{this.state.game && this.renderHistory(this.state.history, this.state.turn)}</p>
      </div>
    )
  }
}