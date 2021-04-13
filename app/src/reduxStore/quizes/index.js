import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "QUIZ_";

const INITAL_STATE = [];

export const fetchedQuiz = createAction(`${base}FETCHED_QUIZ`);
export const fetchedStats = createAction(`${base}FETCHED_STATS`);
export const createNewQuestion = createAction(`${base}CREATE_QUESTION`);
export const addedVote = createAction(`${base}ADDED_VOTE`);
export const newQuiz = createAction(`${base}NEW_QUIZ`);

export const fetchQuiz = (input) => async (dispatch) => {
  const response = await axios.post("/quizes", { quizLength: input });
  dispatch(fetchedQuiz(response.data));
};

export const fetchStats = (input) => async (dispatch) => {
  const response = await axios.post("/stats", {
    id: input,
  });
  dispatch(fetchedStats(response.data));
};

export const createQuestion = (formValues) => (dispatch) => {
  axios
    .post("/new", {
      question: formValues.question,
      options: formValues.options.split(","),
      answer: formValues.answer,
      img: formValues.img,
      votes: [0, 0, 0, 0],
    })
    .then(() => {
      dispatch(createNewQuestion());
      history.push("/");
    });
};

export const addVote = (input) => (dispatch) => {
  if (input.length !== 0) {
    axios
      .post("/update", {
        id: input[0],
        voteIndex: input[1],
      })
      .then(() => {
        dispatch(addedVote());
      });
  }
  return;
};

export default handleActions(
  {
    [fetchedQuiz]: (state, { payload }) => [...INITAL_STATE, ...payload],
    [fetchedStats]: (state, { payload }) => [...INITAL_STATE, ...payload],
    [createNewQuestion]: () => ({ ...INITAL_STATE }),
    [newQuiz]: () => [...INITAL_STATE],
  },
  INITAL_STATE
);
