import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import './Diagram.css';

export default class Diagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      fen: props.position,
      toMove: null,
      solutionProgress: 0,
      timer: null,
      timeLeft: <span>&infin;</span>
    }
    this.allowDrag = this.allowDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.updateTimeLeft = this.updateTimeLeft.bind(this)
  }
  componentDidMount() {
    let game = new Chess(this.props.position);
    this.setState({ game }, () => {
      this.setOrientation()
      this.updateToMove()
    })
    if (this.props.time) {
      this.setState({
        timer: setInterval(this.updateTimeLeft, 1000),
        timeLeft: this.props.time
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
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
  updateTimeLeft() {
    function checkTime() {
      if (this.state.timeLeft <= 0) {
        clearInterval(this.state.timer)
        this.props.onTimeout && this.props.onTimeout();
      }
    }
    const timeLeft = Math.round(this.state.timeLeft - 1)
    this.setState({ timeLeft }, checkTime)
    console.log(timeLeft)
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
  isCorrectMove(move) {
    const expectedMove = this.props.solution[this.state.solutionProgress];
    return expectedMove.from === move.sourceSquare && expectedMove.to === move.targetSquare;
  }
  isSolutionComplete() {
    return this.state.solutionProgress === this.props.solution.length
  }
  makeAutoMove() {
    const { game } = this.state;
    const moveToMake = this.props.solution[this.state.solutionProgress]
    game.move(moveToMake);
    this.updateGame(game)
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
      this.setState({ fen: game.fen() }, () => {
        this.setState({ solutionProgress: this.state.solutionProgress + 1 }, this.updateToMove)
      })
    })
  }
  onDrop(moveObj) {
    console.log(moveObj)
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
    if (!this.isCorrectMove(moveObj)) {
      alert('ma sugi');
      this.state.game.undo()
      return 'snapback'
    } else {
      this.updateGame(game)
      if (this.isSolutionComplete()) {
        console.log(`complete`)
        this.props.onComplete && this.props.onComplete()
      } else {
        this.makeAutoMove()
      }
    }
  }
  render() {
    return (
      <div className="diagram-container">
        <h3>{this.state.toMove}</h3>
        <Chessboard orientation={this.state.orientation} allowDrag={this.allowDrag} onDrop={this.onDrop} position={this.state.fen} />
        <p>{this.props.text}</p>
        <p>Time left: {this.state.timeLeft} seconds</p>
      </div>
    )
  }
}