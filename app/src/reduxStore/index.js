import { combineReducers } from "redux";
import quizReducer from "./quizes";

const rootReducer = combineReducers({ quiz: quizReducer });

export default rootReducer;
