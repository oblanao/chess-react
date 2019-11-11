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
    // if (prefixedMoves.length) {
    const jsxEl = utils.pgn.getNotationJSX(prefixedMoves, onMoveClick, props.notationStyle)
    setElement(jsxEl);
    // If more than 5 lines, scroll to bottom
    if (props.notationStyle !== 'simple' && moves.length >= 9) {
      scrollToBottom()
    }
    const moveElements = document.getElementsByTagName('td');
    for (let i = 0; i < moveElements.length; i++) {
      if (i === props.currentMove - 1) {
        moveElements[i].style.background = 'black';
        moveElements[i].style.color = 'white';
      } else {
        moveElements[i].style.background = '';
        moveElements[i].style.color = 'black';
      }
    }
    // const currentMoveEl = moveElements[props.currentMove];
    // if (currentMoveEl) {
    //   currentMoveEl.style.background = 'black';
    //   currentMoveEl.style.color = 'white';
    // }
    // }
  }, [props.history, props.sideToMove, props.notationStyle])
  function onMoveClick(moveIndex) {
    props.onMoveClick && props.onMoveClick(moveIndex)
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