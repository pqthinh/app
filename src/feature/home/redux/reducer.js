import produce from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

import * as types from "./actionType";
import { withArray } from "exp-value";

const persistConfig = {
  key: "news",
  storage: AsyncStorage,
  whitelist: ["accessToken", "news", "user"],
};

const initialState = {
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
        newState.news = withArray("response.data", action);
        newState.stories = withArray("response.data", action);
        newState.loading = false;
        break;
      case types.GET_STORY_LIST:
        newState.news = withArray("response.data", action);
        newState.stories = withArray("response.data", action);
        newState.loading = false;
        break;
    }
  });

export default persistReducer(persistConfig, reducer);
