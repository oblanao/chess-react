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
  updateAnswers(timeLeft, correct) {
    const answser = this.makeAnswer(timeLeft, correct);
    const newAnswers = this.state.answers;
    newAnswers.push(answser);
    this.setState({ answers: newAnswers })
  }
  updateGame(timeLeft, correct) {
    this.updateAnswers(timeLeft, correct);
    if (this.isQuizFinished()) {
      let finalResults = {
        results: this.state.answers,
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
    console.log(`on quiz render, currdata`, this.state.currentQuestion)
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