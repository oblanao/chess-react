import React, { Component } from 'react';

export default class DiagramViewer extends Component {
  constructor(props) {
    super(props);
    this.game = this.props.data
    console.log(this.game)
    const moves = this.game.history({ verbose: true })
    // while (this.game.undo()) {
    //   this.game.undo();
    // }
    this.state = {
      history: this.makeHistory(this.game.history({ verbose: true }))
    }
  }
  makeHistory(history) {
    return history.map(entry => ({
      from: entry.from,
      to: entry.to
    }))
  }
  makeInitialPosition(game) {
    let initialGame = game;
    while (initialGame.undo()) {
      initialGame.undo()
    }
    return initialGame
  }
  render() {
    return (
      <React.Fragment>
        <pre>{this.makeInitialPosition(this.game).ascii()}</pre>
        <pre>{JSON.stringify(this.state.history, null, 3)}</pre>
      </React.Fragment>
    )
  }
}