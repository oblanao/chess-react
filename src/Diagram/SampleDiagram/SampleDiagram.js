import React from 'react';
import Diagram from '../Diagram';

export default function SampleDiagram() {
  console.log(`here`)
  return (
    <Diagram
      time={15}
      onCorrect={(timeLeft) => { alert(`complete solution in ${15 - timeLeft} seconds`); window.location.reload(); }}
      onTimeout={() => { alert('timeout') }}
      text="Win some material"
      position="7k/1pp4p/3p2q1/p1nPp3/2P1Pr2/8/PPB5/1K4RQ b - - 0 1"
      solution={[
        {
          from: 'f4',
          to: 'h4'
        },
        {
          from: 'h1',
          to: 'h4'
        },
        {
          from: 'g6',
          to: 'g1'
        },
        {
          from: 'c2',
          to: 'd1'
        },
        {
          from: 'g1',
          to: 'd1'
        }
      ]} />
  )
}