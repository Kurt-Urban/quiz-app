import React from "react";
import { connect } from "react-redux";
import { createQuiz } from "../../reduxStore/quizes";
import QuizForm from "../reusable/QuizForm";

const CreateQuiz = ({ createQuiz }) => {
  const onSubmit = (formValues) => {
    createQuiz(formValues);
  };
  return (
    <div>
      <h3>Create New Quiz Question</h3>
      <QuizForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { createQuiz })(CreateQuiz);
