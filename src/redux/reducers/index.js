import { combineReducers } from "redux";
import currentUserInfo from "./currentUserInfo";

const rootReducers = combineReducers({
  currentUserInfo,
});

export default rootReducers;
