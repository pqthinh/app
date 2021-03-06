import { put, delay, call } from "redux-saga/effects";
import { Alert } from "react-native";
import * as authAction from "../redux/action";
import auth from "./api";

export function* fetchSignup(payload) {
  const response = yield call(auth.signup, payload);
  yield delay(500);
  console.log(JSON.stringify(response), "response signup");

  if (response.data) {
    yield put(authAction.reponseSignup(response));
  } else {
    yield put(authAction.loginFailed(response));
    const messages = response.errors;
    setTimeout(() => {
      Alert.alert("Login error", messages);
    }, 200);
  }
}

export function* fetchLogin(payload) {
  const response = yield call(auth.login, payload);
  yield delay(500);

  if (response.data) {
    yield put(authAction.onLoginResponse(response));
  } else {
    yield put(authAction.loginFailed(response));
    const messages = response.errors;
    setTimeout(() => {
      Alert.alert("Login error", messages);
    }, 200);
  }
}

export function* fetchLoginFB(payload) {
  const response = yield call(auth.loginFacebook, payload);
  yield delay(500);
  if (response.data) {
    yield put(authAction.onLoginResponse(response));
  } else {
    yield put(authAction.loginFailed(response));
    const messages = response.errors;
    setTimeout(() => {
      Alert.alert("Facebook login error", messages);
    }, 200);
  }
}

export function* fetchLoginGG(payload) {
  const response = yield call(auth.loginGoogle, payload);
  yield delay(500);
  if (response.data) {
    yield put(authAction.onLoginResponse(response));
  } else {
    yield put(authAction.loginFailed(response));
    const messages = response.errors;
    setTimeout(() => {
      Alert.alert("Google login error", messages);
    }, 200);
  }
}

export function* logout(payload) {
  const response = yield call(auth.logout, payload);
  yield delay(500);

  yield put(authAction.logout());
}
