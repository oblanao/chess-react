import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Diagram from './Diagram';
import Quiz from './Quiz';
import FileImport from "./FileImport";
import diagrams from './diagrams';
import App from './App';

export default function MainApp() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/diagram">
          <Diagram
            time={15}
            onCorrect={(timeLeft) => { alert(`complete solution in ${15 - timeLeft} seconds`); window.location.reload(); }}
            onTimeout={() => { alert('timeout') }}
            text="Win some material"
            // position="rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1"
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
        </Route>
        <Route path="/quiz">
          <App />
        </Route>
        <Route path="/pgn-import">
          <FileImport />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return(
    <div className="home-container">
      <a href="/diagram">Diagram</a>
      <br/>
      <a href="/quiz">Quiz</a>
      <br/>
      <a href="/pgn-import">PGN Import</a>
      <br/>
    </div>
  )
}