import React, { Component } from 'react';
import PgnViewer from '../PgnViewer';

import './PgnImport.css';

import samplePgn from '../data/samplePgn.js';
import utils from '../utils';

const Chess = require('chess.js');

export default class PgnImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pgns: []
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.loadSamplePgn = this.loadSamplePgn.bind(this);
  }
  loadSamplePgn() {
    document.getElementById('pgn-string').value = samplePgn
  }
  onSubmit() {
    let pgnString = document.getElementById('pgn-string').value;
    const curedPgn = utils.pgn.cure(pgnString);
    let splitPgns = utils.pgn.splitGames(curedPgn)
    if (splitPgns.length) {
      this.setState({
        pgns: splitPgns
      })
    }
    else {
      alert('No valid games parsed! Please try again.')
    }
  }
  render() {
    return (
      <div className="fileImport-container">
        {this.state.pgns.length ?
          null
          :
          <React.Fragment>
            <textarea placeholder="Paste PGN contents here..." id="pgn-string" name="pgn-string" cols="80" rows="20" />
            <br />
            <button onClick={this.onSubmit}>Submit</button>
            <button onClick={this.loadSamplePgn}>Load sample PGN</button>
          </React.Fragment>
        }
        <PgnViewer pgns={this.state.pgns} />
      </div>
    )
  }
}