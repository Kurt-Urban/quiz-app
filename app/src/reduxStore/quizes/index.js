import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "QUIZ_";

const INITAL_STATE = [];

export const fetchedQuiz = createAction(`${base}FETCHED_QUIZ`);
export const createNewQuestion = createAction(`${base}CREATE_QUESTION`);
export const addedVote = createAction(`${base}ADDED_VOTE`);

export const fetchQuiz = () => async (dispatch) => {
  const response = await axios.get("/quizes");
  console.log(response.data);
  dispatch(fetchedQuiz(response.data));
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
    [fetchedQuiz]: (state, { payload }) => [...state, ...payload],
    [createNewQuestion]: () => ({ ...INITAL_STATE }),
  },
  INITAL_STATE
);
