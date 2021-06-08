import { put, delay, call } from "redux-saga/effects";
import { Alert } from "react-native";
import * as newsAction from "../redux/action";
import news from "./api";

export function* fetchSignup(payload) {
  const response = yield call(news.signup, payload);
  yield delay(2000);
  console.log(JSON.stringify(response), "response signup");

  if (response.data) {
    yield put(newsAction.reponseSignup(response));
  } else {
    yield put(newsAction.loginFailed(response));
    const messages = response.errors;
    setTimeout(() => {
      Alert.alert("Login error", messages);
    }, 100);
  }
}

export function* fetchLogin(payload) {
  const response = yield call(news.login, payload);
  yield delay(2000);

  if (response.data) {
    yield put(newsAction.onLoginResponse(response));
  } else {
    yield put(newsAction.loginFailed(response));
    const messages = response.errors;
    setTimeout(() => {
      Alert.alert("Login error", messages);
    }, 200);
  }
}
