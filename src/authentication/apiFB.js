import { Alert } from 'react-native';
import * as Facebook from 'expo-facebook';

const LoginAPI = {
    async logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '292225215843171',
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });

            if (type === 'success') {
                // const credential = firebase.auth.FacebookAuthProvider.credential(token);

                // // Sign in with credential from the Facebook user.
                // firebase
                // .auth()
                // .signInWithCredential(credential)
                // .catch(error => {
                //     // Handle Errors here.
                // });
                
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=birthday,email,hometown,picture,link,education,name&access_token=${token}`);
                const res =  await response.json();
                res.token = token
                Alert.alert('Logged in with facebook!');
                let user = await this.getUserAsync()
                console.log(user, "user facebook", res)
                // ${JSON.stringify(res)}
                return res;
            } else {
                // type === 'cancel'
                Alert.alert('Loggin with facebook has error!');
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
        return null;
    },
    async getUserAsync() {
        const res = await this.requestAsync('me');
        // console.log(res)
        return res
    },

    // Learn more https://developers.facebook.com/docs/graph-api/using-graph-api/
    async requestAsync(path, token) {
        let resolvedToken = token;
        if (!token) {
            const auth = await Facebook.getAuthenticationCredentialAsync();
            if (!auth) {
                throw new Error(
                'User is not authenticated. Ensure `logInWithReadPermissionsAsync` has successfully resolved before attempting to use the FBSDK Graph API.'
                );
            }
            resolvedToken = auth.token;
        }
        const response = await fetch(
        `https://graph.facebook.com/${path}?access_token=${encodeURIComponent(resolvedToken)}`
        );
        const body = await response.json();
        return body;
    }
}

export default LoginAPI