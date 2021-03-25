import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import styles from './styleTypes'

const RegisterScreen = ({ navigation }) => {

    useEffect(() => {
        (async () => {
        
        })();
    }, []);

    const Divider = (props) => {
        return <View {...props}>
          <View style={styles.line}></View>
          <Text style={styles.textOR}>OR</Text>
          <View style={styles.line}></View>
        </View>
    }
    
    return (
      //Do not dismiss Keyboard when click outside of TextInput
      <ScrollView>
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
                <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    secureTextEntry={true}
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
                <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Re enter your password"
                    secureTextEntry={true}
                        onChangeText={()=>{}}
                >
                </TextInput>
                </View>
                <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    // textContentType='phone'
                    // keyboardType='telephoneNumber'
                    placeholder="Enter your phone number"
                    autoCapitalize='none'
                    onChangeText={()=>{}}
                >
                </TextInput>
                </View>
                <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    // textContentType='place'
                    placeholder="Enter your address"
                    autoCapitalize='none'
                    onChangeText={()=>{}}
                >
                </TextInput>
                </View>
            
                <TouchableOpacity style={styles.signupButton}
                >
                    <Text style={styles.loginButtonTitle}>LOG IN</Text>
                </TouchableOpacity>

                <Divider style={styles.divider}></Divider>
                
                <Text style={styles.goToLogin} onPress={()=> navigation.navigate("Login")}>Switch to Login Screen</Text>

                
            </View>
            </View>
        </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default RegisterScreen;
