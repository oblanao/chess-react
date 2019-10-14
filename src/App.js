import React from 'react';
import './App.css';

export default function App() {
  return (
    <div className="home-container">
      <h1>React Chess Utils</h1>
      <div className="routes-container">
        <a href="/sample-question">Sample Question</a>
        <a href="/sample-quiz">Sample Quiz</a>
        <a href="/pgn-import">PGN Import</a>
        <a href="/position-setup">Position Setup</a>
      </div>
    </div>
  )
}