import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Radio } from "semantic-ui-react";
import { fetchQuiz, addVote, addedVote } from "../../reduxStore/quizes";

const MongoDatabase = ({ fetchQuiz, addVote, quiz, length }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [value, setValue] = useState(null);
  const [score, setScore] = useState(0);
  const [optionChoice, setOptionChoice] = useState([]);

  useEffect(() => {
    if (length) {
      setCurrentQuestion(0);
    }
  }, [length]);

  const handleChange = (event, { value }) => setValue(value);

  const index = quiz[currentQuestion];

  const testState = () => {
    console.log(currentQuestion);
  };

  const nextClick = () => {
    if (!value) {
      return;
    }
    setOptionChoice([index._id, index.options.indexOf(value)]);
    setCurrentQuestion(currentQuestion + 1);
    addVote(optionChoice);
    console.log(optionChoice);
    if (value[0] === index.answer) {
      setScore(score + 1);
    }
    setValue(null);
  };

  const renderQuestion = () => {
    if (currentQuestion === null) {
      return <div></div>;
    }
    if (currentQuestion === 10) {
      addedVote(optionChoice);
      return (
        <div className="ui container">
          <h1 className="header">You Scored {score}/10</h1>
        </div>
      );
    }
    return (
      <div className="ui form container">
        <div className="ui top aligned centered big rounded image">
          <img src={index.img} alt={index.question} />
        </div>
        <div>
          <h3>{index.question}</h3>
        </div>
        <div className="field">
          <Radio
            label={index.options[0]}
            name="radioGroup"
            value={index.options[0]}
            checked={value === index.options[0]}
            onChange={handleChange}
            className={`ui fluid button ${
              value === index.options[0] ? "primary" : ""
            }`}
          />
        </div>
        <div className="field">
          <Radio
            label={index.options[1]}
            name="radioGroup"
            value={index.options[1]}
            checked={value === index.options[1]}
            onChange={handleChange}
            className={`ui fluid button ${
              value === index.options[1] ? "primary" : ""
            }`}
          />
        </div>
        <div className="field">
          <Radio
            label={index.options[2]}
            name="radioGroup"
            value={index.options[2]}
            checked={value === index.options[2]}
            onChange={handleChange}
            className={`ui fluid button ${
              value === index.options[2] ? "primary" : ""
            }`}
          />
        </div>
        <div className="field">
          <Radio
            label={index.options[3]}
            name="radioGroup"
            value={index.options[3]}
            checked={value === index.options[3]}
            onChange={handleChange}
            className={`ui fluid button ${
              value === index.options[3] ? "primary" : ""
            }`}
          />
        </div>
        <button className="ui right floated button primary" onClick={nextClick}>
          {currentQuestion === 9 ? "Finish" : "Next"}
        </button>
      </div>
    );
  };

  return (
    <div>
      <div>
        <button className="ui button primary" onClick={fetchQuiz}>
          Start New Quiz
        </button>
        <button className="ui button" onClick={testState}>
          Test
        </button>
        <Link to="new" className="ui button">
          Add Question
        </Link>
      </div>
      <div className="ui two column centered vertically padded grid">
        {renderQuestion()}
      </div>
    </div>
  );
};

export default connect(
  (state) => {
    return { quiz: state.quiz, length: state.quiz.length };
  },
  { fetchQuiz, addVote }
)(MongoDatabase);
