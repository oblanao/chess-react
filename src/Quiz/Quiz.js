// TODO: rename solutions to answers
import React, { Component } from 'react';
import Diagram from '../Diagram';
import './Quiz.css';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      currentData: null,
      totalQuestions: this.props.diagrams.length,
      solutions: []
    }
    this.onCorrect = this.onCorrect.bind(this);
    this.onTimeout = this.onTimeout.bind(this);
    this.onWrongMove = this.onWrongMove.bind(this);
  }
  updateData() {
    const currentData = this.props.diagrams[this.state.questionNumber]
    const questionNumber = this.state.questionNumber + 1;
    this.setState({
      currentData,
      questionNumber
    })
    // this.setState({
    //   questionNumber: this.state.questionNumber + 1
    // }, () => {
    //   const currentData = this.props.diagrams[this.state.questionNumber - 1];
    //   this.setState({
    //     currentData
    //   })
    // })
  }
  componentDidMount() {
    this.updateData()
  }
  isQuizFinished() {
    return this.state.questionNumber === this.props.diagrams.length
  }
  makeSolution(timeLeft, correct) {
    console.log(`8888888888 makeSolution 88888888888`)
    let solution = {
      correct,
    }
    if (this.props.time) {
      solution.timeSpent = this.props.time - timeLeft;
    }
    console.log(`this.props.time = ${this.props.time} and timeLeft=${timeLeft}`)
    return solution
  }
  updateSolutions(timeLeft, correct) {
    const solution = this.makeSolution(timeLeft, correct);
    const newSolutions = this.state.solutions;
    newSolutions.push(solution);
    this.setState({ solutions: newSolutions })
  }
  updateGame(timeLeft, correct) {
    this.updateSolutions(timeLeft, correct);
    if (this.isQuizFinished()) {
      let finalResults = {
        results: this.state.solutions,
        time: this.props.time
      }
      return this.props.onComplete(finalResults)
    }
    this.updateData()
  }
  onCorrect(timeLeft) {
    this.updateGame(timeLeft, true)
  }
  onTimeout() {
    this.updateGame(0, false)
  }
  onWrongMove(timeLeft) {
    this.updateGame(timeLeft, false)
  }
  render() {
    console.log(`on quiz render, currdata`, this.state.currentData)
    return (
      <div className="quiz-container">
        <h3>Question no: {this.state.questionNumber} out of {this.state.totalQuestions}</h3>
        {this.state.currentData &&
          <Diagram
            key={this.state.questionNumber}
            time={this.props.time}
            onCorrect={this.onCorrect}
            onWrongMove={this.onWrongMove}
            onTimeout={this.onTimeout}
            {...this.state.currentData}
          />
        }
      </div>
    )
  }
}