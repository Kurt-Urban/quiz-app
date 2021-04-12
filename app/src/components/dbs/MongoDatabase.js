/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Radio } from "semantic-ui-react";
import { fetchQuiz, addVote, fetchStats } from "../../reduxStore/quizes";

import StatsPage from "../reusable/StatsPage";

const MongoDatabase = ({ fetchQuiz, addVote, fetchStats, quiz, length }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [value, setValue] = useState(null);
  const [score, setScore] = useState(0);
  const [optionChoice, setOptionChoice] = useState([]);
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    if (length) {
      setIdList(quiz.map((a) => a._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  const startQuiz = async () => {
    if (!length) {
      await fetchQuiz();
      setCurrentQuestion(0);
    }
  };

  const handleChange = (event, { value }) => setValue(value);

  const index = quiz[currentQuestion];

  const testState = () => {
    console.log("This button was used for debugging purposes");
  };

  const nextClick = () => {
    if (!value) {
      return;
    }
    setOptionChoice([index._id, index.options.indexOf(value)]);
    setCurrentQuestion(currentQuestion + 1);
    addVote(optionChoice);
    if (value === index.answer) {
      setScore(score + 1);
    }
    if (currentQuestion === 9) {
      fetchStats(idList);
      addVote(optionChoice);
    }
    setValue(null);
  };

  const renderQuestion = () => {
    if (currentQuestion === null) {
      return <div></div>;
    }
    if (currentQuestion === 10) {
      return (
        <div className="ui container">
          <StatsPage score={score} totalQuestions={length} />
        </div>
      );
    }
    return (
      <div className="ui form container">
        <div className="ui basic padded segment">
          <div className="ui top aligned centered big rounded image">
            <img src={index.img} alt={index.question} />
          </div>
          <div className="ui raised segment">
            <h3 className="ui header">{index.question}</h3>
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
          <button
            className="ui right floated button primary"
            onClick={nextClick}
          >
            {currentQuestion === 9 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="ui top fixed menu">
        <a className="ui item" onClick={startQuiz}>
          Start New Quiz
        </a>
        <a className="ui item" onClick={testState}>
          Test
        </a>
        <div className="ui right menu">
          <div className="ui item">
            <Link to="/new">Add New Question</Link>
          </div>
        </div>
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
  { fetchQuiz, addVote, fetchStats }
)(MongoDatabase);
