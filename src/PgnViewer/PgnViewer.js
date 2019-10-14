import React from 'react';
import DiagramViewer from '../DiagramViewer';

export default function PgnViewer(props) {
  return (
    props.pgns.map((pgn, index) => <DiagramViewer key={index} gameNr={index + 1} pgn={pgn} />)
  )
}