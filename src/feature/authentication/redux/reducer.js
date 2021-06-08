import produce from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

import * as types from "./actionType";

const persistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["accessToken", "user"],
};

const initialState = {
  requesting: false,
  loading: false,
  loadingImageUser: false,
  changeLoading: false,
  userLoading: false,
  messages: [],
  errors: [],
  user: {},
  accessToken: "",
  isLoggedIn: false,
};

const reducer = (state = initialState, action) =>
  produce(state, (newState) => {
    switch (action.type) {
      case types.SIGNUP_REQUEST:
        newState.loading = true;
        break;
      case types.SIGNUP_SUCCESS:
        newState.user = action.response.data;
        newState.isLoggedIn = true;
        newState.loading = false;
        break;
      case types.LOGIN_REQUEST:
        newState.loading = true;
        break;
      case types.LOGINFB_REQUEST:
        newState.loading = true;
        break;
      case types.LOGINGG_REQUEST:
        newState.loading = true;
        break;
      case types.LOGIN_SUCCESS:
        newState.user = action.response.data;
        newState.isLoggedIn = true;
        // newState.accessToken = action.response.request._headers.token;
        newState.loading = false;
        break;
      case types.LOGIN_FAILED:
        newState.loading = false;
        newState.isLoggedIn = false;
        newState.user = {};
        break;

      case types.LOGOUT_REQUEST:
        newState.loading = true;
        break;
      case types.LOGOUT_SUCCESS:
        newState.user = null;
        newState.isLoggedIn = false;
        newState.accessToken = null;
        newState = {};
        break;
    }
  });

export default persistReducer(persistConfig, reducer);
