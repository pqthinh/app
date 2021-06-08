import { put, delay, call } from "redux-saga/effects";
import { Alert } from "react-native";
import * as newsAction from "../redux/action";
import news from "./api";

export function* fetchNews(payload) {
  const response = yield call(news.getProduct, payload);
  yield delay(2000);
  console.log(JSON.stringify(response), "response signup");

  if (response.data) {
    yield put(newsAction.getProduct(response));
  } else {
    // yield put(newsAction.loginFailed(response));
    const messages = response.errors;
    setTimeout(() => {
      Alert.alert("Login error", messages);
    }, 100);
  }
}

export function* fetchStories(payload) {
  const response = yield call(news.getStory, payload);
  yield delay(2000);

  if (response.data) {
    yield put(newsAction.getStory(response));
  } else {
    // yield put(newsAction.loginFailed(response));
    const messages = response.errors;
    setTimeout(() => {
      Alert.alert("Login error", messages);
    }, 100);
  }
}
