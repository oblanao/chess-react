import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import '../Question/Question.css';

export default class QueenMate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      fen: '8/8/8/4k3/8/8/4K3/4Q3 w - - 0 1',
      toMove: 'White to Move',
      orientation: 'white',
      timer: null,
      initialTime: 300,
      timeLeft: 60,
      numMoves: 0,
      missedMate: 0,
      timeSpent: 0,
      stage: 'test'
    }
    this.allowDrag = this.allowDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.updateTimeLeft = this.updateTimeLeft.bind(this)
  }
  componentDidMount() {
    let game = new Chess(this.state.fen)
    this.setState({
      game,
      timer: setInterval(this.updateTimeLeft, 1000)
    })
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
  }
  updateTimeLeft() {
    function checkTime() {
      if (this.state.timeLeft <= 0) {
        clearInterval(this.state.timer)
        this.onTimeout();
      }
    }
    const timeLeft = Math.round(this.state.timeLeft - 1)
    this.setState({ timeLeft }, checkTime)
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
  isSolutionComplete() {
    return !!this.state.game.in_checkmate()
  }
  onCorrect() {
    this.setState({
      results: {
        timeSpent: this.state.initialTime - this.state.timeLeft,
        missedMate: this.state.missedMate,
        numMoves: Math.ceil((this.state.numMoves + 1) / 2),
        numPlies: this.state.numMoves + 1,
      },
      stage: 'results',
      toMove: ''
    })
    console.log(this.state)
  }
  onGameOver() {
    let reason = null;
    if (this.state.game.in_draw()) {
      reason = 'In draw. Insufficient material'
    }
    if (this.state.game.in_stalemate()) {
      reason = 'In stalemate.'
    }
    if (this.state.game.in_threefold_repetition()) {
      reason = 'In threefold repetition'
    }
    this.setState({
      results: {
        timeSpent: this.state.initialTime - this.state.timeLeft,
        missedMate: this.state.missedMate,
        numMoves: Math.ceil((this.state.numMoves + 1) / 2),
        numPlies: this.state.numMoves + 1,
        didMate: false,
        reason,
      },
      toMove: '',
      stage: 'results'
    })
    console.log('ongameover')
  }
  onTimeout() {
    alert('timeout!')
    window.location.reload();
  }
  async makeAutoMove() {
    const { game } = this.state;
    function randomEl(arr) {
      const unixTime = new Date().getTime();
      const len = arr.length;
      const randomNum = unixTime % len;
      return arr[randomNum]
    }
    async function wait(ms) {
      await setTimeout(null, ms)
    }
    const moveToMake = randomEl(game.moves())
    await wait(500);
    game.move(moveToMake)
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
  hasMissedMate(moves) {
    console.log(moves);
    console.log(moves.filter(move => move.includes('#')).length)
    return !!moves.filter(move => move.includes('#')).length

  }
  updateGame(game) {
    this.setState({
      game,
      fen: game.fen(),
      numMoves: this.state.numMoves + 1,
    }, this.updateToMove)
  }
  onDrop(moveObj) {
    const { game } = this.state;
    const possibleMoves = game.moves();
    const source = moveObj.sourceSquare;
    const target = moveObj.targetSquare;
    if (source === target) {
      return 'snapback'
    }
    // see if the move is legal
    let move = game.move({
      from: source,
      to: target,
    })
    if (move === null) {
      return 'snapback'
    }
    console.log(game.game_over())
    if (game.game_over()) {
      if (this.isSolutionComplete()) {
        clearInterval(this.state.timer)
        this.onCorrect()
      } else {
        this.onGameOver()
      }
    } else {
      console.log('no game over')
      if (this.hasMissedMate(possibleMoves)) {
        this.setState({
          missedMate: this.state.missedMate + 1
        })
      }
      this.updateGame(game)
      this.makeAutoMove()
    }
  }
  render() {
    const element = this.state.stage === 'test'
      ? <Chessboard orientation={this.state.orientation} allowDrag={this.allowDrag} onDrop={this.onDrop} position={this.state.fen} />
      : <pre>{JSON.stringify(this.state.results, null, 3)}</pre>
    return (
      <div className="question-container">
        <p>Mate with Queen ASAP</p>
        <h5>{this.state.toMove}</h5>
        {element}
        <p className="time-left">Time left: {this.state.timeLeft} seconds</p>
      </div>
    )
  }
}