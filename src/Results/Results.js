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
    console.log(this.props.data.results)
    const finalResults = this.props.data.results.map(result => {
      if (result.timeSpent === this.props.data.time) {
        result.timeout = true
      }
      return result
    })
    return {
      time: this.props.data.time,
      finalResults
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