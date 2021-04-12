import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../reusable/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="ui container">
        <div className="ui basic padded segment"></div>
        <div className="ui four column centered vertically padded grid">
          <div className="ui raised padded segment">
            <h1>Welcome to the Quiz App!</h1>
          </div>
          <div>
            <Link to="" className="ui large button">
              Start 5 Question Quiz
            </Link>
            <Link to="" className="ui large button">
              Start 10 Question Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null)(Home);
