import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import CreateQuiz from "./basic/CreateQuiz";
import Home from "./basic/Home";
import history from "../history";
import ViewQuiz10 from "./basic/ViewQuiz10";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/10" exact component={ViewQuiz10} />
          <Route path="/new" exact component={CreateQuiz} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
