/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({}) => {
  return (
    <div className="ui top fixed menu">
      <Link to="10" className="ui item" onClick="">
        Start New Quiz
      </Link>
      <div className="ui item">Test</div>
      <Link to="/new" className="ui right item">
        Add New Question
      </Link>
    </div>
  );
};

export default connect(null)(Header);
