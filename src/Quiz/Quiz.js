import React, { Component } from 'react';

import Questions from './Questions';
import Results from './Results';

import diagrams from '../data/diagrams';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'quiz'
    }
    this.time = 15;
    this.diagrams = diagrams;
    this.onComplete = this.onComplete.bind(this);
  }
  onComplete(results) {
    this.setState({
      stage: 'results',
      results
    })
  }
  render() {
    const element = this.state.stage === 'quiz' ?
      <Questions
        time={this.props.time || this.time}
        onComplete={this.props.onComplete || this.onComplete}
        questions={this.props.diagrams || this.diagrams}
      />
      :
      <Results data={this.state.results} />
    return element
  }
}
