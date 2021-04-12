/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Radio } from "semantic-ui-react";
import { fetchQuiz, addVote, fetchStats } from "../../reduxStore/quizes";
import Header from "./Header";

import StatsPage from "./StatsPage";

const QuizDisplay = ({ fetchQuiz, addVote, fetchStats, quiz, length }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [value, setValue] = useState(null);
  const [score, setScore] = useState(0);
  const [optionChoice, setOptionChoice] = useState([]);
  const [idList, setIdList] = useState([]);

  const handleChange = (event, { value }) => setValue(value);
  const testState = () => {
    // console.log("This button was used for debugging purposes");
    console.log(index);
  };
  const index = quiz[currentQuestion];

  useEffect(() => {
    if (length) {
      setIdList(quiz.map((a) => a._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  const startQuiz = async () => {
    await fetchQuiz();
    setCurrentQuestion(0);
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
            <img
              src={index.img}
              alt={index.question}
              style={{ "font-size": 100 }}
              id="question-image"
            />
          </div>
          <div className="ui raised segment">
            <h3 className="ui header">{index.question}</h3>
          </div>
          <div className="field">
            <div key={index}>
              {[0, 1, 2, 3].map((n) => (
                <div className="field">
                  <Radio
                    label={index.options[n]}
                    name="radioGroup"
                    value={index.options[n]}
                    checked={value === index.options[n]}
                    onChange={handleChange}
                    className={`ui fluid button ${
                      value === index.options[n] ? "primary" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
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
      <Header startQuiz={startQuiz} />
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
)(QuizDisplay);
