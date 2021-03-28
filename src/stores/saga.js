import { all } from "redux-saga/effects";
import { authSagas } from "../authentication/saga";

export default function* rootSaga() {
  yield all([...authSagas]);
}
