import React, { Component } from 'react';
import Question from '../../Question';
import './Questions.css';

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      currentQuestion: null,
      totalQuestions: this.props.questions.length,
      answers: []
    }
    this.onCorrect = this.onCorrect.bind(this);
    this.onTimeout = this.onTimeout.bind(this);
    this.onWrongMove = this.onWrongMove.bind(this);
  }
  updateData() {
    const currentQuestion = this.props.questions[this.state.questionNumber]
    const questionNumber = this.state.questionNumber + 1;
    this.setState({
      currentQuestion,
      questionNumber
    })
  }
  componentDidMount() {
    this.updateData()
  }
  isQuizFinished() {
    return this.state.questionNumber === this.state.totalQuestions
  }
  makeAnswer(timeLeft, correct) {
    let answser = {
      correct,
    }
    if (this.props.time) {
      answser.timeSpent = this.props.time - timeLeft;
    }
    return answser
  }
  updateAnswers(timeLeft, correct, solutionProgress) {
    const answer = this.makeAnswer(timeLeft, correct);
    if (typeof solutionProgress !== 'undefined') {
      answer.solutionProgress = solutionProgress
    }
    const newAnswers = this.state.answers;
    newAnswers.push(answer);
    this.setState({ answers: newAnswers })
  }
  updateGame(timeLeft, correct, solutionProgress) {
    this.updateAnswers(timeLeft, correct, solutionProgress);
    if (this.isQuizFinished()) {
      let finalResults = {
        results: this.state.answers,
        time: this.props.time
      }
      return this.props.onComplete(finalResults)
    }
    this.updateData()
  }
  onCorrect(timeLeft, solutionProgress) {
    this.updateGame(timeLeft, true, solutionProgress)
  }
  onTimeout(solutionProgress) {
    this.updateGame(0, false, solutionProgress)
  }
  onWrongMove(timeLeft, solutionProgress) {
    this.updateGame(timeLeft, false, solutionProgress)
  }
  render() {
    return (
      <div className="quiz-container">
        <h3>Question no: {this.state.questionNumber} out of {this.state.totalQuestions}</h3>
        {this.state.currentQuestion &&
          <Question
            key={this.state.questionNumber}
            time={this.props.time}
            onCorrect={this.onCorrect}
            onWrongMove={this.onWrongMove}
            onTimeout={this.onTimeout}
            {...this.state.currentQuestion}
          />
        }
      </div>
    )
  }
}