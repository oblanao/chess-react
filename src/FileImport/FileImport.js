import React, { Component } from 'react';
import DiagramViewer from './DiagramViewer';
import './FileImport.css';

const Chess = require('chess.js');

export default class FileImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  curePgn(string) {
    return string.split('{[#]} ').join('');
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
    const curedPgn = this.curePgn(pgnString);
    let splitGames = curedPgn.split('[Event "?"]').map(str => `[Event "?"]${str}`)
    splitGames = splitGames.slice(1);
    // const chessGames = splitGames.map(gamePgn => new Chess(gamePgn))
    let chessGames = [];
    for (let i = 0; i < splitGames.length; i++) {
      const game = new Chess();
      game.load_pgn(splitGames[i]);
      chessGames.push(game)
    }
      this.setState({
        games: chessGames
      })
  }
  render() {
    return (
      <div className="fileImport-container">
        <textarea placeholder="Paste PGN contents here..." id="pgn-string" name="pgn-string" cols="80" rows="20" />
        <br />
        <button onClick={this.onSubmit}>Submit</button>
        {
          this.state.games.map(game => <DiagramViewer data={game}/>)
        }
      </div>
    )
  }
}