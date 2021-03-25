import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as AppAuth from 'expo-app-auth';
import * as Google from 'expo-google-app-auth';

import LoginAPI  from '../apiFB'
import GGAPI from '../apiGG'
import styles from '../styleTypes'

const LoginScreen = ({ navigation }) => {
    let [authState, setAuthState] = useState(null);

    useEffect(() => {
        (async () => {
            let cachedAuth = await getCachedAuthAsync();
            if (cachedAuth && !authState) {
                setAuthState(cachedAuth);
                // navigation.navigate("MainApp", {user: authState})
            }
        }) ();
    }, []);

    useEffect(()=>{
        if(authState) {
            navigation.navigate("MainApp", {user: authState})
        }
    },[authState])



    const Divider = (props) => {
        return <View {...props}>
          <View style={styles.line}></View>
          <Text style={styles.textOR}>OR</Text>
          <View style={styles.line}></View>
        </View>
    }
    
    return (
      //Do not dismiss Keyboard when click outside of TextInput
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            <View style={styles.Logo}>
                <Image source={{uri: "https://scontent.fhan2-6.fna.fbcdn.net/v/t1.15752-9/162699239_708338426504147_5623015091643881846_n.png?_nc_cat=103&ccb=1-3&_nc_sid=ae9488&_nc_ohc=e7Sttbf0VBkAX--xhOr&_nc_oc=AQksMKGt0dKon1QXfFSWIoN6N4H2ksmoyOtLKwpsWpRuyUwlujO5pydP8WhGBvDtqkc&_nc_ht=scontent.fhan2-6.fna&oh=b31bb7639a7b920129fa44f7ea73d758&oe=6082F742"}} style={styles.imageLogo}/>
            </View>
            <Text style={styles.title}>
                Wellcome to Fchotot
            </Text>
          </View>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType='emailAddress'
                keyboardType='email-address'
                placeholder="Enter your email"
                autoCapitalize='none'
                onChangeText={()=>{}}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                secureTextEntry={true}
                    onChangeText={()=>{}}
              >
              </TextInput>
            </View>
            <TouchableOpacity style={styles.signupButton}
              >
              <Text style={styles.loginButtonTitle}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goToLogin} onPress={()=> navigation.navigate("Register")}>
              <Text style={styles.loginButtonTitle}>Go to RegisterScreen</Text>
            </TouchableOpacity>

            <Divider style={styles.divider}></Divider>

            <FontAwesome.Button
                style={styles.facebookButton}
                name="facebook"
                backgroundColor="blue"
                onPress={ async() => {
                    const _authState = await LoginAPI.logIn()
                    setAuthState(_authState);
                }}
            >
                <Text style={styles.loginButtonTitle}>Continue with Facebook</Text>
            </FontAwesome.Button>
            <View style={styles.clearBoth}></View>
            <FontAwesome.Button
                style={styles.facebookButton}
                name="google"
                backgroundColor="red"
                onPress={async () => {
                    const _authState = await GGAPI.signInAsync();
                    setAuthState(_authState);
                  }}
                >
                <Text style={styles.loginButtonTitle}>Continue with Google</Text>
            </FontAwesome.Button>
            
          
          </View>
        </View>
      </TouchableWithoutFeedback>

    )
}

export default LoginScreen;


let config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile'],
    /* This is the CLIENT_ID generated from a Firebase project 
    603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com
    */
    // clientId: '35828778416-kodktvuttg9qnanqlis0ndi2nuu05765.apps.googleusercontent.com',
    clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com'
};

let StorageKey = '@GoogleOAuth';

export async function signInAsync() {
    // First- obtain access token from Expo's Google API
    const { type, accessToken, user } = await Google.logInAsync(config);
    
    if (type === 'success') {

        let currentUser = user?  user : {
            "email": "thinhpq@its-global.vn",
            "familyName": "Thịnh",
            "givenName": "Phạm  Quang ",
            "id": "101515449108053546199",
            "name": "Phạm Quang Thịnh",
            "photoUrl": "https://lh4.googleusercontent.com/--3fWxbHJoaI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmfmUxjD2s-iSLGS2ULwUX_jKOyyg/s96-c/photo.jpg",
        }
       
        currentUser.accessToken = accessToken
        await cacheAuthAsync(currentUser);
        // navigation.navigate("MainApp", {user: currentUser})

        return currentUser

        // Then you can use the Google REST API
        // let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        //     headers: { Authorization: `Bearer ${accessToken}` },
        // });
        // console.log(JSON.stringify(userInfoResponse), "respon")
    }
   
    // let authState = await AppAuth.authAsync(config);
    // // await cacheAuthAsync(authState);
    // console.log('signInAsync', authState);
    // console.log(authState, "cache")
    // return authState;
  }
  
  async function cacheAuthAsync(authState) {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  }
  
  export async function getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);

    console.log('getCachedAuthAsync', authState);

    if (authState) {
      if (checkIfTokenExpired(authState)) {
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  }
  
  function checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
  }
  
  async function refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log('refreshAuth', authState);
    await cacheAuthAsync(authState);
    return authState;
  }
  
  export async function signOutAsync({ accessToken }) {
    try {
      await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true,
      });
      await AsyncStorage.removeItem(StorageKey);
      return null;
    } catch (e) {
      alert(`Failed to revoke token: ${e.message}`);
    }
  }
  