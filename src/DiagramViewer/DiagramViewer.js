import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import utils from '../utils';

import './DiagramViewer.css';
import DiagramHistory from '../DiagramHistory/DiagramHistory';

export default class DiagramViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      history: [],
      orientation: '',
      sideToMove: '',
    }
  }
  componentDidMount() {
    this.setInitialGame();
  }
  makeGameFromPgn(pgn) {
    const game = new Chess();
    if (!game.load_pgn(pgn)) {
      this.setState({
        failedImport: true
      })
    }
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
      turn,
      orientation,
      sideToMove
    })
  }
  render() {
    return (
      <div className="diagramViewer-container">
        {this.state.failedImport ?
          <React.Fragment>
            <p>Failed Import, game #{this.props.gameNr || 1}</p>
            <p className="smaller-text">{this.props.pgn}</p>
          </React.Fragment>
          :
          <React.Fragment>
            <Chessboard
              width={this.props.width || 300}
              id={this.state.game && this.state.game.fen()}
              draggable={false}
              position={this.state.game && this.state.game.fen()}
              orientation={this.state.orientation}
            />
            <p>{this.state.sideToMove}</p>
            {/* <p className="smaller-text">{this.state.game && utils.pgn.renderHistory(this.state.history, this.state.turn)}</p> */}
            {this.state.game &&
              <DiagramHistory
                notationStyle={"simple"}
                history={this.state.history}
                sideToMove={this.state.turn}
              />}
          </React.Fragment>
        }
      </div>
    )
  }
}