import {put, delay, call} from "redux-saga/effects"
import { Alert } from 'react-native'
import * as authAction from '../redux/action'
import auth from './api'


export function* fetchLoginFB(payload) {
    // yield put(authAction.enableLoader());
    const response = yield call(auth.loginFacebook, payload);
    yield delay(2000);
    console.log(response, "respon")
    if (response.data) {
        yield put(authAction.onLoginResponse(response));
        // yield put(authAction.disableLoader({}));
    } else {
        yield put(authAction.loginFailed(response));
        // yield put(authAction.disableLoader({}));
        const messages = response.errors;
        setTimeout(() => {
            Alert.alert("Facebook login error", messages);
        }, 200);
    }
}
  
export function* fetchLoginGG(payload) {
    // yield put(authAction.enableLoader());
    const response = yield call(auth.loginGoogle, payload);
    yield delay(2000);
    if (response.data) {
        yield put(authAction.onLoginResponse(response));
        // yield put(authAction.disableLoader({}));
    } else {
        yield put(authAction.loginFailed(response));
        // yield put(authAction.disableLoader({}));
        const messages = response.errors;
        setTimeout(() => {
            Alert.alert("Google login error", messages);
        }, 200);
    }
}
  