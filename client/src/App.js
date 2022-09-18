import React from "react";
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Projects from "./components/Projects";
import CreateProject from "./components/CreateProject";

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/">
          <Projects />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/projects/new">
          <CreateProject />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
