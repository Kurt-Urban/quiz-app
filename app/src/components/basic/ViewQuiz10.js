import React from "react";
import { connect } from "react-redux";
import { fetchQuiz } from "../../reduxStore/quizes";
import Header from "../reusable/Header";

import QuizDisplay from "../reusable/QuizDisplay";

const ViewQuiz10 = ({ length, fetchQuiz }) => {
  const startQuiz = async () => {
    await fetchQuiz(10);
  };

  const testButton = () => {
    console.log("Debugging button");
  };

  const displayQuiz = () => {
    if (length) {
      return (
        <div>
          <QuizDisplay currentQ={0} totalQ={10} />
        </div>
      );
    }
    return (
      <div className="ui container">
        <div className="ui basic padded segment"></div>
        <div className="ui basic padded segment"></div>
        <button className="ui fluid massive primary button" onClick={startQuiz}>
          Start!
        </button>
      </div>
    );
  };
  return (
    <div>
      <Header testButton={testButton} />
      <div>{displayQuiz()}</div>
    </div>
  );
};

export default connect(
  (state) => {
    return { length: state.quiz.length };
  },
  { fetchQuiz }
)(ViewQuiz10);
