import React, { Component } from "react";
import Chessboard from "chessboardjsx";
import Chess from "chess.js";
import "./Question.css";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      fen: "",
      toMove: null,
      solutionProgress: 0,
      timer: null,
      timeLeft: -1
    };

    this.boardMoveSound = new Audio("sounds/board-move.wav");
    this.solutionCompleteSound = new Audio("sounds/solution-complete.wav");

    this.allowDrag = this.allowDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.updateTimeLeft = this.updateTimeLeft.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    let game = new Chess(this.props.position);
    let fen = game.fen();
    this.setState({ game, fen }, () => {
      this.setOrientation();
      this.updateToMove();
    });
    if (this.props.time) {
      this.setState({
        timer: setInterval(this.updateTimeLeft, 1000),
        timeLeft: this.props.time
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  setOrientation() {
    if (!this.state.game) {
      return;
    }
    let orientation = "white";
    if (this.state.game.turn() === "b") {
      orientation = "black";
    }
    this.setState({
      orientation
    });
  }
  updateTimeLeft() {
    function checkTime() {
      if (this.state.timeLeft <= 0) {
        clearInterval(this.state.timer);
        this.props.onTimeout &&
          this.props.onTimeout(this.state.solutionProgress);
      }
    }
    const timeLeft = Math.round(this.state.timeLeft - 1);
    this.setState({ timeLeft }, checkTime);
  }
  updateToMove() {
    const { game } = this.state;
    if (!game) {
      return false;
    }
    let toMove = "White to move";
    if (game.turn() === "b") {
      toMove = "Black to move";
    }
    this.setState({ toMove });
  }
  isCorrectMove(move) {
    const expectedMove = this.props.solution[this.state.solutionProgress];
    if (
      expectedMove.from === move.sourceSquare &&
      expectedMove.to === move.targetSquare
    ) {
      return true;
    } else {
      return false;
    }
  }
  isSolutionComplete() {
    return this.state.solutionProgress === this.props.solution.length;
  }
  async makeAutoMove() {
    const { game } = this.state;
    const moveToMake = this.props.solution[this.state.solutionProgress];
    game.move(moveToMake);
    await this.updateGame(game);
    setTimeout(() => this.playSound(this.boardMoveSound), 500);
  }
  allowDrag(piece, source) {
    const { game } = this.state;
    // do not pick up pieces if the game is over
    if (game.game_over()) return false;
    // only pick up pieces for the side to move
    if (
      (game.turn() === "w" && piece.piece.substr(0, 1) !== "w") ||
      (game.turn() === "b" && piece.piece.substr(0, 1) !== "b")
    ) {
      return false;
    }
    return true;
  }
  playSound(theSound) {
    console.log(`playing sound with theSound `, theSound);
    return new Promise((resolve, reject) => {
      const newAudio = theSound.cloneNode(true);
      newAudio.onended = resolve;
      newAudio.play();
    });
  }
  updateGame(game) {
    this.setState({ game }, () => {
      this.setState({ fen: game.fen() }, () => {
        this.setState(
          { solutionProgress: this.state.solutionProgress + 1 },
          this.updateToMove
        );
      });
    });
  }
  async onDrop(moveObj) {
    this.playSound(this.boardMoveSound);
    console.log(moveObj);
    let { game } = this.state;
    const source = moveObj.sourceSquare;
    const target = moveObj.targetSquare;
    if (source === target) {
      return "snapback";
    }
    // see if the move is legal
    let move = game.move({
      from: source,
      to: target,
      promotion: "q"
    });
    if (move === null) {
      return "snapback";
    }
    if (!this.isCorrectMove(moveObj)) {
      this.state.game.undo();
      this.props.onWrongMove &&
        this.props.onWrongMove(
          this.state.timeLeft,
          this.state.solutionProgress
        );
      return "snapback";
    } else {
      this.updateGame(game);
      if (this.isSolutionComplete()) {
        clearInterval(this.state.timer);
        await this.playSound(this.solutionCompleteSound);
        console.log(`on correct se pare ca timeLeft = ${this.state.timeLeft}`);
        this.props.onCorrect &&
          this.props.onCorrect(
            this.state.timeLeft,
            this.state.solutionProgress
          );
      } else {
        this.makeAutoMove();
      }
    }
  }
  render() {
    return (
      <div className="question-container">
        <p>{this.props.text}</p>
        <Chessboard
          orientation={this.state.orientation}
          allowDrag={this.allowDrag}
          onDrop={this.onDrop}
          position={this.state.fen}
        />
        <h5>{this.state.toMove}</h5>
        <p className="time-left">
          Time left:{" "}
          {this.state.timeLeft < 0 ? <span>&infin;</span> : this.state.timeLeft}{" "}
          seconds
        </p>
      </div>
    );
  }
}
