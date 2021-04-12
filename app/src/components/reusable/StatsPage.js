import React from "react";
import { connect } from "react-redux";
import {} from "../../reduxStore/quizes";

const StatsPage = ({ score, totalQuestions, quiz }) => {
  return (
    <div>
      <div className="ui basic padded segment">
        <h1>
          You Scored {score}/{totalQuestions}
        </h1>
      </div>
      <div>
        {quiz.map((q, index) => (
          <div key={index} className="ui padded segment">
            <h3 className="ui header">{q.question}</h3>
            {[0, 1, 2, 3].map((n) => (
              <div
                className={
                  q.options[n] === q.answer
                    ? "ui inverted green segment"
                    : "ui segment"
                }
              >
                <div className="ui two column very relaxed grid">
                  <div className="middle aligned column">
                    <div className="ui header">{q.options[n]}</div>
                  </div>
                  <div className="middle aligned column">
                    <b className="ui red header">
                      {Math.floor(
                        (q.votes[n] / q.votes.reduce((a, b) => a + b, 0)) *
                          10000
                      ) / 100}
                      %
                    </b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect((state) => {
  return { quiz: state.quiz };
}, {})(StatsPage);
