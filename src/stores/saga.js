import { all } from "redux-saga/effects";
import { authSagas } from "../feature/authentication/saga";

export default function* rootSaga() {
  yield all([...authSagas]);
}
