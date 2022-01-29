import React, { lazy, Suspense } from "react";
import Loader from "./components/Loader.jsx";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
const Cover = lazy(() => import("./components/cover"));
const LoremSection = lazy(() => import("./components/loremSection"));

function App() {
  return (
    <Router basename={"/"}>
      <Switch>
        <Route path='/' exact={true}>
          <Suspense fallback={<Loader />}>
            <Cover />
          </Suspense>
        </Route>
        <Router path='/lorem' exact={true}>
          <Suspense fallback={<Loader />}>
            <LoremSection />
          </Suspense>
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
