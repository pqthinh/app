import produce from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

import * as types from "./actionType";

const persistConfig = {
  key: "news",
  storage: AsyncStorage,
  whitelist: ["accessToken", "news"],
};

const initialState = {
  requesting: false,
  loading: false,
  messages: [],
  errors: [],
  news: [],
  stories: [],
};

const reducer = (state = initialState, action) =>
  produce(state, (newState) => {
    switch (action.type) {
      case types.FETCH_DATA:
        newState.loading = true;
        break;
      case types.GET_PRODUCT_lIST:
        newState.news = action.response.data;
        newState.loading = false;
        break;
      case types.GET_STORY_LIST:
        newState.news = action.response.data;
        newState.loading = false;
        break;
    }
  });

export default persistReducer(persistConfig, reducer);
