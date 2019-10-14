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
        <Route path="*">
          <p>404 - Not Found</p>
        </Route>
      </Switch>
    </Router>
  );
}
