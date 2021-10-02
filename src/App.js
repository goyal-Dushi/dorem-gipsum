import React from "react";
import Cover from "./components/cover.js";
import LoremSection from "./components/loremSection.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router basename={"/"}>
      <Switch>
        <Route path='/' exact={true}>
          <Cover />
        </Route>
        <Router path='/lorem' exact={true}>
          <LoremSection />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
