import React from "react";
import { connect } from "react-redux";
import { createQuestion } from "../../reduxStore/quizes";
import QuizForm from "../reusable/QuizForm";

const CreateQuiz = ({ createQuestion }) => {
  const onSubmit = (formValues) => {
    createQuestion(formValues);
  };
  return (
    <div>
      <h3>Create New Quiz Question</h3>
      <QuizForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { createQuestion })(CreateQuiz);
