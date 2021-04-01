import { combineReducers } from "redux";
import authentication from "../feature/authentication/redux/reducer";

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    userReducer: authentication,
  });

  return rootReducer;
}
