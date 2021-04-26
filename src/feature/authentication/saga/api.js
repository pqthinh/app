import { TIMEOUT, API_ENDPOINT } from "../../../config/url";
import axios from "axios";
import { firebase } from "../../../config";
import { Alert } from "react-native";

const auth = {
  async signup({ request }) {
    console.log(request, "payload signup");
    const { email, password, displayName, phone, place } = request;
    let res = {};
    try {
      // email, phoneNumber, photoURL, displayName, api key, auth domain
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          credential.user
            .updateProfile({
              displayName: displayName,
              phoneNumber: phone,
              place: place,
            })
            .then(async () => {
            //   console.log(credential, "sign up saga credential");
              let temp = credential.user || {}
              let accessToken = "ya29.a0AfH6SMC_6YGJ6nIu3Iwpn4quI1Uxksvzknnr6-IxyToppCNfrl9n58Y2S-mawe9HAvVgIBgZhnSWEju2fkvuatbDNJjbMlFtOE-szefpGNPSlYPOv1U4LUe1eexAGADq12q9OuAmrdLQjBFTiCGBBJ9oIEgG";
              res.data = temp;
              res.data.accessToken = accessToken
              console.log(res, "res");
              return res;
            });
        });
    } catch (e) {
      Alert.alert(e);
    }
    return res;
  },

  async login(request) {
    const { email, password } = request;
    console.log(request, "payload login");

    try {
        const userCredential = await firebase.auth()
        .signInWithEmailAndPassword(email, password);
        console.log(userCredential, "use")
    }
    catch(e) {
        Alert.alert(e)
    }

    

    // let res = {};
    // res.data = {
    //   accessToken:
    //     "ya29.a0AfH6SMC_6YGJ6nIu3Iwpn4quI1Uxksvzknnr6-IxyToppCNfrl9n58Y2S-mawe9HAvVgIBgZhnSWEju2fkvuatbDNJjbMlFtOE-szefpGNPSlYPOv1U4LUe1eexAGADq12q9OuAmrdLQjBFTiCGBBJ9oIEgG",
    //   email: "abc",
    //   familyName: "Thịnh pq sdwqhdbqw login dm no",
    //   givenName: "Phạm Quang",
    //   id: "116212769007021476799",
    //   name: "Phạm Quang Thịnh login thuong",
    //   photoUrl:
    //     "https://lh3.googleusercontent.com/a-/AOh14GhMV6KwkNik1FXEixSp-jQ7mjUe8GodLzZKhJj_=s96-c",
    // };
    // return res;
  },

  async loginFacebook(request) {
    const { payload } = request;
    console.log(payload, "payload");
    // const deviceToken = await AsyncStorage.getItem("fcmToken");

    // const res = await axios({
    //     method: "post",
    //     url: API_ENDPOINT + "facebook/auth",
    //     headers: {
    //         // "Device-Id-Token": deviceToken,
    //         // "Client-Type": Platform.OS,
    // },
    // data: {
    //     facebook_token: payload,
    // },
    // timeout: TIMEOUT,
    // })
    // .then((res) => {
    //     // const user = getUserInfo(res.data.token, deviceToken);

    //     return {};
    // })
    // .catch((error) => {
    //     console.log(error)
    //     return error.response.data;
    // });
    let res = {};
    res.data = {
      accessToken:
        "ya29.a0AfH6SMC_6YGJ6nIu3Iwpn4quI1Uxksvzknnr6-IxyToppCNfrl9n58Y2S-mawe9HAvVgIBgZhnSWEju2fkvuatbDNJjbMlFtOE-szefpGNPSlYPOv1U4LUe1eexAGADq12q9OuAmrdLQjBFTiCGBBJ9oIEgG",
      email: "phamquangquang2008@gmail.com",
      familyName: "Thịnh pq",
      givenName: "Phạm Quang",
      id: "116212769007021476799",
      name: "Phạm Quang Thịnh",
      photoUrl:
        "https://lh3.googleusercontent.com/a-/AOh14GhMV6KwkNik1FXEixSp-jQ7mjUe8GodLzZKhJj_=s96-c",
    };
    return res;
  },

  async loginGoogle(request) {
    const { payload } = request;
    // const deviceToken = await AsyncStorage.getItem("fcmToken");

    // const res = await axios({
    //     method: "post",
    //     url: API_ENDPOINT + "facebook/auth",
    //     headers: {
    //         // "Device-Id-Token": deviceToken,
    //         // "Client-Type": Platform.OS,
    //     },
    //     data: {
    //         token_gg: payload,
    //     },
    //     timeout: TIMEOUT,
    //     })
    //     .then((res) => {
    //         // const user = getUserInfo(res.data.token, deviceToken);
    //         const user = {
    //             "accessToken": "ya29.a0AfH6SMC_6YGJ6nIu3Iwpn4quI1Uxksvzknnr6-IxyToppCNfrl9n58Y2S-mawe9HAvVgIBgZhnSWEju2fkvuatbDNJjbMlFtOE-szefpGNPSlYPOv1U4LUe1eexAGADq12q9OuAmrdLQjBFTiCGBBJ9oIEgG",
    //             "email": "phamquangquang2008@gmail.com",
    //             "familyName": "Thịnh",
    //             "givenName": "Phạm Quang",
    //             "id": "116212769007021476799",
    //             "name": "Phạm Quang Thịnh",
    //             "photoUrl": "https://lh3.googleusercontent.com/a-/AOh14GhMV6KwkNik1FXEixSp-jQ7mjUe8GodLzZKhJj_=s96-c",
    //         }
    //         return user;
    //     })
    //     .catch((error) => {
    //         return error.response.data;
    //     });

    // return res;
    let res = {};
    res.data = {
      accessToken:
        "ya29.a0AfH6SMC_6YGJ6nIu3Iwpn4quI1Uxksvzknnr6-IxyToppCNfrl9n58Y2S-mawe9HAvVgIBgZhnSWEju2fkvuatbDNJjbMlFtOE-szefpGNPSlYPOv1U4LUe1eexAGADq12q9OuAmrdLQjBFTiCGBBJ9oIEgG",
      email: "phamquangquang2008@gmail.com",
      familyName: "Thịnh fakegg login",
      givenName: "Phạm Quang",
      id: "116212769007021476799",
      name: "Phạm Quang Thịnh",
      photoUrl:
        "https://lh3.googleusercontent.com/a-/AOh14GhMV6KwkNik1FXEixSp-jQ7mjUe8GodLzZKhJj_=s96-c",
    };
    return res;
  },
  async logout() {
    let res = {};
    res.data = {
      message: "success",
    };
    return res;
  },
};

const getUserInfo = (accessToken, deviceToken) => {
  const user = axios({
    method: "get",
    url: API_ENDPOINT + "users/info",
    headers: {
      token: accessToken,
    },
    timeout: TIMEOUT,
  }).catch((e) => {
    return e.response.data;
  });

  return user;
};

export default auth;
