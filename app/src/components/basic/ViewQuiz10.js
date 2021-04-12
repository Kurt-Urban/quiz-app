import React from "react";
import { connect } from "react-redux";
import Header from "../reusable/Header";

import QuizDisplay from "../reusable/QuizDisplay";

const ViewQuiz10 = () => {
  return (
    <div>
      <Header />
      <QuizDisplay />
    </div>
  );
};

export default connect((state) => {})(ViewQuiz10);
