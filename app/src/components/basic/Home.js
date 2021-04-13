import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../reusable/Header";

const Home = () => {
  const testButton = () => {
    console.log("Debugging button");
  };
  return (
    <div>
      <Header testButton={testButton} />
      <div className="ui container">
        <div className="ui basic padded segment"></div>
        <div className="ui four column centered vertically padded grid">
          <div className="ui container">
            <div className="ui raised padded segment">
              <h1>Welcome to the Quiz App!</h1>
            </div>
            <div className="ui basic segment">
              <div className="ui basic segment">
                <h3>Start a Quiz!</h3>
              </div>
              <div className="ui basic segment">
                <div className="ui two column very relaxed grid">
                  <div className="column">
                    <Link to="/5" className="ui huge button">
                      5 Question Quiz
                    </Link>
                  </div>

                  <div className="column">
                    <Link to="/10" className="ui huge button">
                      10 Question Quiz
                    </Link>
                  </div>
                </div>
                <div className="ui vertical divider">OR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null)(Home);
