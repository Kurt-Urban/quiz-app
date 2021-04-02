import { createAction, handleAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "QUIZ_";

const INITAL_STATE = {
  question: "",
  options: [],
  answer: "",
  votes: null,
};

export const fetchedQuizes = createAction(`${base}FETCHED_QUIZES`);
export const createNewQuiz = createAction(`${base}CREATE_QUIZ`);

export const fetchQuizes = () => async (dispatch) => {
  const response = await axios.get("/quizes");
  dispatch(fetchedQuizes(response.data[0]));
};

export const createQuiz = (formValues) => (dispatch) => {
  axios
    .post("/new", {
      question: formValues.question,
      options: formValues.options.split(","),
      answer: formValues.answer,
      votes: null,
    })
    .then((response) => {
      dispatch(createNewQuiz(response));
      history.push("/new");
    });
};

export default handleActions(
  {
    [fetchedQuizes]: (state, { payload }) => ({ ...state, ...payload }),
    [createNewQuiz]: () => ({ ...INITAL_STATE }),
  },
  INITAL_STATE
);
