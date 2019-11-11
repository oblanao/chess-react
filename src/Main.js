import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import App from './App';
import SampleQuestion from './Question/SampleQuestion';
import Quiz from './Quiz';
import PgnImport from "./PgnImport";
import PositionSetup from "./PositionSetup";
import GameReplayer from './GameReplayer';
import QueenMate from './QueenMate';

import sampleGame from './sampleGame';
import DiagramViewer from "./DiagramViewer";

export default function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/sample-question">
          <SampleQuestion />
        </Route>
        <Route path="/sample-quiz">
          <Quiz />
        </Route>
        <Route path="/pgn-import">
          <PgnImport />
        </Route>
        <Route path="/position-setup">
          <PositionSetup />
        </Route>
        <Route path="/game-replayer">
          <GameReplayer game={sampleGame} />
        </Route>
        <Route path="/queen-mate">
          <QueenMate />
        </Route>
        <Route path="/diagram-viewer">
          <React.Fragment>
            <DiagramViewer pgn={"124czx 1245dbfyutg"} />
            <DiagramViewer pgn={"1.e4 e5"} />

          </React.Fragment>
        </Route>
        <Route path="*">
          <p>404 - Not Found</p>
        </Route>
      </Switch>
    </Router>
  );
}
