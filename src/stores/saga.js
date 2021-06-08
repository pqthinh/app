import { all } from "redux-saga/effects";
import { authSagas } from "../feature/authentication/saga";
import { newsSagas } from "../feature/home/saga";

export default function* rootSaga() {
  yield all([...authSagas]);
  yield all([...newsSagas]);
}
