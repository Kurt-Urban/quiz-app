import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import CreateQuiz from "../components/dbs/CreateQuiz";
import MongoDatabase from "../components/dbs/MongoDatabase";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={MongoDatabase} />
          <Route path="/new" exact component={CreateQuiz} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
