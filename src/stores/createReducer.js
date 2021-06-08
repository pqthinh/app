import { combineReducers } from "redux";
import authentication from "../feature/authentication/redux/reducer";
import news from "../feature/home/redux/reducer";

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    userReducer: authentication,
    newsReducer: news,
  });

  return rootReducer;
}
