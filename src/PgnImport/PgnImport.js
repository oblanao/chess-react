import React, { Component } from 'react';
import DiagramViewer from '../DiagramViewer';
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
    // let pgnString = document.getElementById('pgn-string').value;
    // const curedPgn = this.curePgn(pgnString);
    // console.log(curedPgn)
    // const game = new Chess();
    // game.load_pgn(curedPgn)
    // this.setState({
    //   games: [game]
    // })
    // *********************************************************************************
    let pgnString = document.getElementById('pgn-string').value;
    const curedPgn = utils.pgn.cure(pgnString);
    let splitPgns = utils.pgn.splitGames(curedPgn)
    // let chessGames = [];
    // for (let i = 0; i < splitGames.length; i++) {
    //   const game = new Chess();
    //   game.load_pgn(splitGames[i]);
    //   console.log(`for i==${i}, result is ${game.load_pgn(splitGames[i])}`)
    //   chessGames.push(game)
    // }
    // this.setState({
    //   games: chessGames
    // })
    this.setState({
      pgns: splitPgns
    })
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
        {
          this.state.pgns.map((pgn, index) => <DiagramViewer key={index} pgn={pgn} />)
        }
      </div>
    )
  }
}