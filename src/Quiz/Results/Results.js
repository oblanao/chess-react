import React, { Component } from 'react';
import './Results.css';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.results = this.makeResults();
  }
  makeResults() {
    if (!this.props.data) {
      return false
    }
    let totalTimeSpent = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalTimeouts = 0;
    const finalAnswers = this.props.data.results.map(result => {
      totalTimeSpent += result.timeSpent;
      if (result.timeSpent === this.props.data.time) {
        totalTimeouts++;
        result.timeout = true
      } else {
        if (result.correct) {
          totalCorrect++;
        } else {
          totalIncorrect++;
        }
      }
      return result
    })
    return {
      timePerQuestion: this.props.data.time,
      totalTimeSpent,
      totalCorrect,
      totalIncorrect,
      totalTimeouts,
      finalAnswers
    }
  }
  render() {
    return (
      <div className="results-container">
        <h4>Results</h4>
        <pre>{JSON.stringify(this.results, null, 3)}</pre>
      </div>
    )
  }
}