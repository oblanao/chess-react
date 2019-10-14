import React, { Component } from 'react';
import DiagramViewer from '../DiagramViewer';

import './QuestionSetup.css';

export default class QuestionSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      difficulty: 1,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit() {
    console.log(this.state);
  }
  render() {
    return (
      <div className="questionSetup-container">
        <DiagramViewer pgn={this.props.pgn} />
        <div className="questionSetup-extras">
          Title
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Question title..." /><br />
          Tags
          <input type="text" name="tags" value={this.state.tags} onChange={this.handleChange} placeholder="Question tags..." /><br />
          Difficulty
          <input type="number" name="difficulty" value={this.state.difficulty} onChange={this.handleChange} placeholder="Question difficulty..." /><br />
        </div>
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    )
  }
}