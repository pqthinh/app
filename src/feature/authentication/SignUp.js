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
                    <Image source={{uri: "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.15752-9/167274302_468639401019563_7861387796358691871_n.png?_nc_cat=111&ccb=1-3&_nc_sid=58c789&_nc_ohc=aJJHOeKZ9vIAX_mRS02&_nc_ht=scontent.fhan2-2.fna&oh=4f59c8753225bfff847b2a5b6b827ab5&oe=60888C38"}}
                        style={[styles.imageLogo, { transform: [{ scale: 1.5 }]}]}/>
                    <Text style={styles.title}>Wellcome to Fchotot</Text>
                </View>
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
            
                <TouchableOpacity style={styles.signupButton}>
                    <Text style={styles.loginButtonTitle}>LOG IN</Text>
                </TouchableOpacity>
                <View style={styles.clearBoth}></View>
                <Divider style={styles.divider}></Divider>
                
                <Text style={styles.goToLogin} onPress={()=> navigation.navigate("Login")}>Switch to Login Screen</Text>

                
            </View>
            </View>
        </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default RegisterScreen;
