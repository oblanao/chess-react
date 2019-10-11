import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import App from './App';
import SampleDiagram from './Diagram/SampleDiagram';
import Quiz from './Quiz';

import PgnImport from "./PgnImport";

export default function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/sample-diagram">
          <SampleDiagram />
        </Route>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="/pgn-import">
          <PgnImport />
        </Route>
        <Route path="*">
          <p>404 - Not Found</p>
        </Route>
      </Switch>
    </Router>
  );
}
