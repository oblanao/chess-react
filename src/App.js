import React, { Component } from 'react';
import Diagram from './Diagram/';
import diagrams from './diagrams';
import Results from './Results';

import './App.css'
import Quiz from './Quiz';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'quiz'
    }
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
      <Quiz
        time={15}
        onComplete={this.onComplete}
        diagrams={diagrams}
      />
      :
      <Results data={this.state.results} />
    // <Diagram
    //   // time={5}
    //   onComplete={() => { console.log('ma sugi') }}
    //   onTimeout={() => {console.log('timeout')}}
    //   text="Play the KID Saemisch"
    //   position="rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1"
    //   solution={[
    //     {
    //       from: 'd7',
    //       to: 'd5'
    //     }
    //   ]} />
    // <Results data={this.state.results} />
    return (
     element
    )
  }
}
