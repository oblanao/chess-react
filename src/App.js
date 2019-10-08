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
      position="r1bqkbnr/pppp1ppp/8/1B2p3/3nP3/8/PPPP1PPP/RNBQK1NR b KQkq -"
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
