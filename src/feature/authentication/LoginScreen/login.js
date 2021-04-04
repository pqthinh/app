import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { requestLogin, requestLoginFB, requestLoginGG } from "../redux/action";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import LoginAPI from "../apiFB";
import GGAPI from "../apiGG";
import styles from "../styleTypes";

const LoginScreen = (props) => {
  const {
    navigation,
    requestLogin,
    requestLoginFB,
    requestLoginGG,
    user,
    isLoggedIn,
  } = props;
  // let [authState, setAuthState] = useState(null);
  const [data, setData] = useState({ email: "", password: "" });

  // useEffect(() => {
  // (async () => {
  //       let cachedAuth = await GGAPI.getCachedAuthAsync();
  //       if (cachedAuth && !authState) {
  //           setAuthState(cachedAuth);
  //           navigation.navigate("MainApp", {user: authState})
  //       }
  // }) ();
  // },[]);

  // useEffect(()=>{
  // if(authState) {
  //       navigation.navigate("MainApp", {user: authState})
  // }
  // },[authState])

  useEffect(() => {
    if (user && isLoggedIn) {
      navigation.navigate("MainApp", { user: user });
    }
  }, [user, isLoggedIn]);

  const handleLoginWithFB = () => {
    LoginAPI.logIn().then((token) => {
      console.log(token, "token fb");
      if (token) {
        requestLoginFB(token);
      }
    });
  };

  const handleLoginWithGG = () => {
    GGAPI.signInAsync().then((token) => {
      console.log(token, "token gg");
      if (token) {
        requestLoginGG(token);
      }
    });
  };

  const _handleChangeData = (field) => (value) => {
    if (field === "email") {
      setData({
        ...data,
        [field]: value.toLowerCase(),
      });
    } else {
      setData({
        ...data,
        [field]: value,
      });
    }
  };

  const handleLogin = () => {
    console.log(data, "info login");
    requestLogin(data);
  };

  const Divider = (props) => {
    return (
      <View {...props}>
        <View style={styles.line}></View>
        <Text style={styles.textOR}>OR</Text>
        <View style={styles.line}></View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.up}>
              <View style={styles.Logo}>
                <Image
                  source={{
                    uri:
                      "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.15752-9/167274302_468639401019563_7861387796358691871_n.png?_nc_cat=111&ccb=1-3&_nc_sid=58c789&_nc_ohc=aJJHOeKZ9vIAX_mRS02&_nc_ht=scontent.fhan2-2.fna&oh=4f59c8753225bfff847b2a5b6b827ab5&oe=60888C38",
                  }}
                  style={[
                    styles.imageLogo,
                    {
                      transform: [
                        {
                          scale: 1.5,
                        },
                      ],
                    },
                  ]}
                />
                <Text style={styles.title}>Wellcome to Fchotot</Text>
              </View>
            </View>
            <View style={styles.down}>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  value={data.email}
                  onChangeText={_handleChangeData("email")}
                ></TextInput>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  onChangeText={_handleChangeData("password")}
                  value={data.password}
                ></TextInput>
              </View>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => {
                  handleLogin();
                }}
              >
                <Text style={styles.loginButtonTitle}>LOG IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.goToLogin}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={(styles.loginButtonTitle, { color: "#000" })}>
                  Go to RegisterScreen
                </Text>
              </TouchableOpacity>

              <Divider style={styles.divider}></Divider>

              <FontAwesome.Button
                style={styles.facebookButton}
                name="facebook"
                backgroundColor="blue"
                onPress={() => handleLoginWithFB()}
              >
                <Text style={styles.loginButtonTitle}>
                  Continue with Facebook
                </Text>
              </FontAwesome.Button>
              <View style={styles.clearBoth}></View>
              <FontAwesome.Button
                style={styles.facebookButton}
                name="google"
                backgroundColor="red"
                onPress={() => handleLoginWithGG()}
              >
                <Text style={styles.loginButtonTitle}>
                  Continue with Google
                </Text>
              </FontAwesome.Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default connect(
  (state) => ({
    user: state.userReducer.user,
    isLoggedIn: !state.userReducer.userLoading,
  }),
  { requestLogin, requestLoginFB, requestLoginGG }
)(LoginScreen);
