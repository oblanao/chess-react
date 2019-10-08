import React from 'react';
import Diagram from './Diagram/';
import './App.css'

function App() {
  return (
    <Diagram
      // time={5}
      onComplete={() => { console.log('ma sugi') }}
      onTimeout={() => {console.log('timeout')}}
      text="Play the KID Saemisch"
      position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      solution={[
        {
          from: 'd2',
          to: 'd4'
        },
        {
          from: 'g8',
          to: 'f6'
        },
        {
          from: 'c2',
          to: 'c4'
        }
      ]} />
  );
}

export default App;
