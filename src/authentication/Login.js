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
import firebaseConfig from '../config/firebase'
import FACEBOOK_APP_ID from '../config/FB'
import config from '../config/GGapi'
import styles from '../styleTypes'

// chuwa import ham login facebook gg

const LoginFBScreen = ({ navigation }) => {

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

    firebase.initializeApp(firebaseConfig);

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
        console.log('We are authenticated now!');
    }

    // Do other things
    });

    async function loginWithFacebook() {
        await Facebook.initializeAsync(FACEBOOK_APP_ID);

        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
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
                    const _authState = await loginWithFacebook()
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

export default LoginFBScreen;