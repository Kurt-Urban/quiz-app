import React from "react";
import { connect } from "react-redux";
import { fetchQuizes } from "../../reduxStore/quizes";

const MongoDatabase = (props) => {
  return (
    <div>
      <button className="ui button primary" onClick={props.fetchQuizes}>
        Get Quizes
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, { fetchQuizes })(MongoDatabase);
