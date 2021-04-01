import * as types from './actionType'

export function requestLogin({email, password}) {
    return {type: types.LOGIN_REQUEST, email, password}
}

export function loginFailed(errors) {
    return {type: types.LOGIN_FAILED, errors}
}

export function onLoginResponse(response) {
    return {type: types.LOGIN_SUCCESS, response};
}

export function requestLogout(accessToken) {
    return {type: types.LOGOUT_REQUEST, accessToken};
}
export function logout() {
    return {type: types.LOGOUT_SUCCESS};
}


// export function requestRegister(payload) {
//     return {
//       type: types.REGISTER_REQUEST,
//       payload,
//     };
// }

export function requestLoginFB(payload) {
    return {type: types.LOGINFB_REQUEST, payload};
}

export function requestLoginGG(payload) {
    return {type: types.LOGINGG_REQUEST, payload};
}
