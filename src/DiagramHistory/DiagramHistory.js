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
      const jsxEl = utils.pgn.getNotationJSX(prefixedMoves, props.notationStyle)
      console.log(`jsxEl`, jsxEl)
      setElement(jsxEl);
      // If more than 5 lines, scroll to bottom
      if (shouldShowScroll()) {
        scrollToBottom()
      }
    }
  }, [props.history])
  function scrollToBottom() {
    let element = document.querySelector('.mainContainer');
    element.scrollTop = element.scrollHeight;
  }
  function shouldShowScroll() {
    return props.notationStyle !== 'simple' && moves.length >= 9
  }
  function getScrollClass() {
    return shouldShowScroll() ? 'showYScroll' : ''
  }
  function getDivClass() {
    return props.notationStyle === 'simple' ? 'diagramHistory-simpleContainer' : 'diagramHistory-tableContainer'
  }
  function getContainerClass() {
    return `${getDivClass()} ${getScrollClass()}`
  }
  return (
    <div className={`mainContainer ${getContainerClass()}`} style={props.height && { height: props.height }}>
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