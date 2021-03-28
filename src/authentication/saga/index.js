import { takeEvery, takeLatest } from "redux-saga/effects";
import * as types from "../redux/actionType";
import * as auth from "./saga";

export const authSagas = [
  takeEvery(types.LOGINFB_REQUEST, auth.fetchLoginFB),
  takeEvery(types.LOGINGG_REQUEST, auth.fetchLoginGG),
];
