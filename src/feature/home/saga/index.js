import { takeEvery, takeLatest } from "redux-saga/effects";
import * as types from "../redux/actionType";
import * as news from "./saga";

export const newsSagas = [
  takeEvery(types.FETCH_DATA, news.fetchNews),
  takeEvery(types.FETCH_DATA, news.fetchStories),
];
