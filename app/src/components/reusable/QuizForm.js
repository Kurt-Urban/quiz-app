import React from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

const QuizForm = (props) => {
  const renderInput = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
      </div>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form className="ui form error" onSubmit={handleSubmit}>
          <Field
            name="question"
            component={renderInput}
            label="Enter Question"
          />
          <Field name="options" component={renderInput} label="Enter Options" />
          <Field
            name="answer"
            component={renderInput}
            label="Enter the answer identical to it as it is in the options"
          />
          <Field name="img" component={renderInput} label="Enter image URL" />
          <div className="ui basic right aligned segment">
            <Link to="/" className="ui button">
              Cancel
            </Link>
            <button className="ui button primary">Submit</button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default QuizForm;
