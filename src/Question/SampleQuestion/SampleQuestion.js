import React from 'react';
import Question from '../Question';

export default function SampleQuestion() {
  const [numWrongs, setNumWrongs] = React.useState(0)
  function onWrongMove() {
    setNumWrongs(numWrongs + 1)
    alert('Wrong. Try again')
  }
  return (
    <Question
      time={15}
      onWrongMove={onWrongMove}
      onCorrect={(timeLeft) => { alert(`After ${numWrongs + 1} tries, complete solution in ${15 - timeLeft} seconds`); window.location.reload(); }}
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