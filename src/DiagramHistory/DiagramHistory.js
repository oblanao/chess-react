import React, { useEffect, useState } from 'react';
import utils from '../utils';

import './DiagramHistory.css';

export default function DiagramHistory(props) {
  const [element, setElement] = useState(null)
  const [moves, setMoves] = useState([])
  useEffect(() => {
    const {
      history,
      sideToMove
    } = props;
    const movesPerLine = props.moverPerLine || 2;
    const prefixedMoves = utils.pgn.getPrefixedMoves(history, sideToMove, movesPerLine);
    setMoves(prefixedMoves);
    if (prefixedMoves.length) {
      const jsxEl = utils.pgn.getNotationJSX(prefixedMoves, onMoveClick, props.notationStyle)
      setElement(jsxEl);
      // If more than 5 lines, scroll to bottom
      if (props.notationStyle !== 'simple' && moves.length >= 9) {
        scrollToBottom()
      }
    }
  }, [props, moves.length])
  function onMoveClick(moveIndex, event) {
    props.onMoveClick && props.onMoveClick(moveIndex, event)
  }
  function scrollToBottom() {
    let element = document.querySelector('.diagramHistory-mainContainer');
    element.scrollTop = element.scrollHeight;
  }
  function getScrollClass() {
    return props.notationStyle !== 'simple' && moves.length >= 9 ? 'showYScroll' : ''
  }
  function getDivClass() {
    return props.notationStyle === 'simple' ? 'diagramHistory-simpleContainer' : 'diagramHistory-tableContainer'
  }
  function getContainerClass() {
    return `${getDivClass()} ${getScrollClass()}`
  }
  return (
    <div className={`diagramHistory-mainContainer ${getContainerClass()}`} style={props.height && { height: props.height }}>
      {props.title && <p>{props.title}</p>}
      {props.notationStyle === "simple" ?
        <p>{element}</p>
        :
        <table>
          <tbody>
            {element}
          </tbody>
        </table>}
    </div>
  )
}