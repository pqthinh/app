import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook'
import React, {useState, useEffect} from 'react'

import {FACEBOOK_APP_ID } from '../../config/FB'
import config from '../../config/firebase'

firebase.initializeApp(config);



async function loginWithFacebook() {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
            console.log('We are authenticated now!');
        }
    
        // Do other things
    });
    await Facebook.initializeAsync(FACEBOOK_APP_ID);

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
    });

    if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        // Sign in with credential from the Facebook user.
        firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
            // Handle Errors here.
        });
    }
}

export default loginWithFacebook;