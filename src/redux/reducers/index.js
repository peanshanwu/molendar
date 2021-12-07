import { combineReducers } from "redux";
import currentUserInfo from "./currentUserInfo";
import isLogin from "./isLogin";

const rootReducers = combineReducers({
  currentUserInfo,
  isLogin
});

export default rootReducers;
