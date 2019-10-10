import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import './DiagramViewer.css';

export default class DiagramViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      history: this.props.data.history(),
      orientation: '',
      sideToMove: ''
    }
  }
  componentDidMount() {
    console.log(`didMount with game`)
    console.log(this.props.data.ascii())
    this.setInitialGame();
  }
  setInitialGame() {
    let initialGame = this.props.data;
    let nrMoves = 0;
    while (initialGame.undo()) {
      initialGame.undo()
      nrMoves++
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
    console.log(this.state.game)
    return (
      <div className="diagramViewer-container">
        <Chessboard
          width={this.props.width || 300}
          id={this.state.game && this.state.game.fen()}
          // draggable={false}
          position={this.state.game && this.state.game.fen()}
          orientation={this.state.orientation}
        />
        <p>{this.state.sideToMove}</p>
        <pre>{this.state.history.join(" ")}</pre>
      </div>
    )
  }
}