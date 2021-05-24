import { takeEvery, takeLatest } from "redux-saga/effects";
import * as types from "../redux/actionType";
import * as auth from "./saga";

export const authSagas = [
  takeEvery(types.SIGNUP_REQUEST, auth.fetchSignup),
  takeEvery(types.LOGIN_REQUEST, auth.fetchLogin),
  takeEvery(types.LOGINFB_REQUEST, auth.fetchLoginFB),
  takeEvery(types.LOGINGG_REQUEST, auth.fetchLoginGG),
  takeEvery(types.LOGOUT_SUCCESS, auth.logout),
];
