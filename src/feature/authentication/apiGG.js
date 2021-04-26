import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppAuth from "expo-app-auth";
import * as Google from "expo-google-app-auth";
import { firebase } from "../../config";
import { requestLogout } from "./redux/action";

let config = {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile"],
    clientId:
        "603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com",
};

let StorageKey = "@MyApp:Auth";
// Facebook.initializeAsync(FACEBOOK_APP_ID);

const GGAPI = {
    async signInAsync() {
        const { type, accessToken, user } = await Google.logInAsync(config);

        if (type === "success") {
            let currentUser = user
                ? user
                : {
                    email: "thinhpq@its-global.vn",
                    familyName: "Thịnh test",
                    givenName: "Phạm  Quang ",
                    id: "101515449108053546199",
                    name: "Phạm Quang Thịnh",
                    photoUrl:
                        "https://lh4.googleusercontent.com/--3fWxbHJoaI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmfmUxjD2s-iSLGS2ULwUX_jKOyyg/s96-c/photo.jpg",
                };

            currentUser.accessToken = accessToken;
            await this.cacheAuthAsync(currentUser);
            return currentUser;
        }

        // let authState = await AppAuth.authAsync(config);
        // await cacheAuthAsync(authState);
        // console.log('signInAsync', authState);
        // return authState;
    },
    async cacheAuthAsync(authState) {
        return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
    },
    async getCachedAuthAsync() {
        let value = await AsyncStorage.getItem(StorageKey);
        let authState = JSON.parse(value);
        if (authState) {
            if (checkIfTokenExpired(authState)) {
                return refreshAuthAsync(authState);
            } else {
                return authState;
            }
        }
        return null;
    },
    checkIfTokenExpired({ accessTokenExpirationDate }) {
        return new Date(accessTokenExpirationDate) < new Date();
    },
    checkIfTokenExpired({ accessTokenExpirationDate }) {
        return new Date(accessTokenExpirationDate) < new Date();
    },
    async refreshAuthAsync({ refreshToken }) {
        let authState = await AppAuth.refreshAsync(config, refreshToken);
        console.log("refreshAuth", authState);
        await cacheAuthAsync(authState);
        return authState;
    },
    async signOutAsync(props) {
        const { accessToken } = props || {};

        if (accessToken) {
            try {
                firebase.auth().signOut();

                await AppAuth.revokeAsync(config, {
                    token: accessToken,
                    isClientIdProvided: true,
                });
                await AsyncStorage.removeItem(StorageKey);
                requestLogout(accessToken)
                return null;
            } catch (e) {
                alert(`Failed to revoke token: ${e.message}`);
            }
        } else {
            try {
                await AsyncStorage.removeItem(StorageKey);
            } catch (e) {
                alert(`Failed to revoke token: ${e.message}`);
            }
        }
    },
};

export default GGAPI;
