/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ testButton }) => {
  return (
    <div className="ui top fixed menu">
      <Link to="/" className="ui item">
        Start New Quiz
      </Link>
      <a className="ui item" onClick={testButton}>
        Test
      </a>
      <Link to="/new" className="ui right item">
        Add New Question
      </Link>
    </div>
  );
};

export default connect(null)(Header);
