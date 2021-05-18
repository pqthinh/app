import { TIMEOUT, API_ENDPOINT } from "../../../config/url";
import axios from "axios";
import { firebase } from "../../../config";
import { Alert } from "react-native";

const auth = {
  async signup({ request }) {
    const { email, password, displayName, phone, place } = request;
    let res = {};
    async function writeUserData(userId, name, email, phone, place, imageUrl) {
      firebase
        .database()
        .ref("users/" + userId)
        .set({
          username: name,
          email: email,
          profile_picture:
            imageUrl ||
            "https://scontent.fpnh22-1.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=7206a8&_nc_ohc=DEXPSxIBk7AAX8Go6tL&_nc_ht=scontent.fpnh22-1.fna&tp=27&oh=d8fde1e55bfdee8015bdabfbb5a9fea5&oe=60AC7F84",
          phoneNumber: phone,
          place: place,
        });
    }
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
              let temp = credential.user || {};
              let accessToken =
                "ya29.a0AfH6SMC_6YGJ6nIu3Iwpn4quI1Uxksvzknnr6-IxyToppCNfrl9n58Y2S-mawe9HAvVgIBgZhnSWEju2fkvuatbDNJjbMlFtOE-szefpGNPSlYPOv1U4LUe1eexAGADq12q9OuAmrdLQjBFTiCGBBJ9oIEgG";
              res.data = temp;
              res.data.accessToken = accessToken;

              await writeUserData(temp.uid, displayName, email, phone, place);
              return res;
            });
        });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        Alert.alert("That email address is invalid!");
      }

      Alert.alert("Email này đã được sử dụng");
    }
    return res;
  },

  async login(request) {
    const { email, password } = request;

    let res = {};
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      res.data = userCredential;
    } catch (e) {
      console.log(e);
      Alert.alert("Bạn nhập sai email hoặc mật khẩu");
      res.data = {};
    }

    return res;
  },

  async loginFacebook(request) {
    const { payload } = request;
    const deviceToken = await AsyncStorage.getItem("fcmToken");

    const res = await axios({
      method: "post",
      url: API_ENDPOINT + "facebook/auth",
      headers: {
        "Device-Id-Token": deviceToken,
        "Client-Type": Platform.OS,
      },
      data: {
        facebook_token: payload,
      },
      timeout: TIMEOUT,
    })
      .then((res) => {
        const user = getUserInfo(res.data.token, deviceToken);

        return user;
      })
      .catch((error) => {
        return error.response.data;
      });
  },

  async loginGoogle(request) {
    const { payload } = request;
    // const deviceToken = await AsyncStorage.getItem("fcmToken");

    const res = await axios({
      method: "post",
      url: API_ENDPOINT + "facebook/auth",
      headers: {
        // "Device-Id-Token": deviceToken,
        // "Client-Type": Platform.OS,
      },
      data: {
        token_gg: payload,
      },
      timeout: TIMEOUT,
    })
      .then((res) => {
        // const user = getUserInfo(res.data.token, deviceToken);
        const user = {
          accessToken:
            "ya29.a0AfH6SMC_6YGJ6nIu3Iwpn4quI1Uxksvzknnr6-IxyToppCNfrl9n58Y2S-mawe9HAvVgIBgZhnSWEju2fkvuatbDNJjbMlFtOE-szefpGNPSlYPOv1U4LUe1eexAGADq12q9OuAmrdLQjBFTiCGBBJ9oIEgG",
          email: "phamquangquang2008@gmail.com",
          familyName: "Thịnh",
          givenName: "Phạm Quang",
          id: "116212769007021476799",
          name: "Phạm Quang Thịnh",
          photoUrl:
            "https://lh3.googleusercontent.com/a-/AOh14GhMV6KwkNik1FXEixSp-jQ7mjUe8GodLzZKhJj_=s96-c",
        };
        return user;
      })
      .catch((error) => {
        return error.response.data;
      });

    return res;
  },
  async logout(props) {
    let StorageKey = "@MyApp:Auth";

    const { accessToken } = props || {};

    if (accessToken) {
      try {
        firebase.auth().signOut();

        await AppAuth.revokeAsync(config, {
          token: accessToken,
          isClientIdProvided: true,
        });
        await AsyncStorage.removeItem(StorageKey);
        requestLogout(accessToken);
        return null;
      } catch (e) {
        alert(`Failed to revoke token: ${e.message}`);
      }
    }

    try {
      await AsyncStorage.removeItem(StorageKey);
    } catch (e) {
      alert(`Failed to revoke token: ${e.message}`);
    }

    let res = {};
    res.data = {
      message: "success",
    };
    return res;
  },
};

const getUserInfo = (accessToken, deviceToken, idUser) => {
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

// let res = {};
// res.data = {
//   accessToken:
//     "ya29.a0AfH6SMC_6YGJ6nIu3Iwpn4quI1Uxksvzknnr6-IxyToppCNfrl9n58Y2S-mawe9HAvVgIBgZhnSWEju2fkvuatbDNJjbMlFtOE-szefpGNPSlYPOv1U4LUe1eexAGADq12q9OuAmrdLQjBFTiCGBBJ9oIEgG",
//   email: "phamquangquang2008@gmail.com",
//   familyName: "Thịnh pq",
//   givenName: "Phạm Quang",
//   id: "116212769007021476799",
//   name: "Phạm Quang Thịnh",
//   photoUrl:
//     "https://lh3.googleusercontent.com/a-/AOh14GhMV6KwkNik1FXEixSp-jQ7mjUe8GodLzZKhJj_=s96-c",
// };
// return res;

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
