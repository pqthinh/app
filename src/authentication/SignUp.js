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
                    <Image source={{uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/166316698_2852341458428066_2798285478842766296_n.png?_nc_cat=107&ccb=1-3&_nc_sid=f79d6e&_nc_ohc=wp0AFSwoAGcAX_pP1qp&_nc_oc=AQkz4pcBaY_zAZ42Ub-P4MWS425k9dgT-HdcJEWdmLprj7O6gJx_8G-bFCD7p1w0E0gOQfcosQfpUr004HtccCxK&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=fb3a8bbfd8948fbcb3dc799a46045340&oe=6087C02C"}} style={styles.imageLogo}/>
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
