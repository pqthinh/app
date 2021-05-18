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
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { requestLogin, requestLoginFB, requestLoginGG } from "../redux/action";
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

  const [data, setData] = useState({ email: "", password: "" });

  const handleLoginWithFB = () => {
    LoginAPI.logIn().then((token) => {
      // console.log(token, "token fb");
      if (token) {
        requestLoginFB(token);
      }
    });
  };

  const handleLoginWithGG = () => {
    GGAPI.signInAsync().then((token) => {
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
    const regEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!data.email) {
      Alert.alert("Bạn chưa nhập email!");
      return;
    }
    if (!regEmail.test(String(data.email).toLowerCase())) {
      Alert.alert("Bạn nhập email không đúng định dạng!");
      return;
    }

    requestLogin(data);
  };

  useEffect(() => {
    console.log(user);
    if (user.accessToken || user.token) {
      navigation.navigate("MainApp", { user: user });
    }
  }, [user]);

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
                  source={require("../../../../assets/logo_lg.png")}
                  style={styles.imageLogo}
                />
                <Text style={styles.title}>Wellcome to Fchotot</Text>
              </View>
            </View>
            <View style={styles.down}>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  textContentType={"emailAddress"}
                  keyboardType={"email-address"}
                  placeholder={"Enter your email"}
                  autoCapitalize={"none"}
                  value={data.email}
                  onChangeText={_handleChangeData("email")}
                ></TextInput>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder={"Enter your password"}
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
              <View style={{ height: 10 }}></View>
              <TouchableOpacity
                style={styles.goToLogin}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={(styles.loginButtonTitle, { color: "#000" })}>
                  Go to RegisterScreen
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.goToLogin}
                onPress={() => navigation.navigate("FogotPassword")}
              >
                <Text style={(styles.loginButtonTitle, { color: "#000" })}>
                  Forgot password
                </Text>
              </TouchableOpacity>

              <Divider style={styles.divider}></Divider>

              <FontAwesome.Button
                style={styles.facebookButton}
                name={"facebook"}
                backgroundColor={"blue"}
                onPress={() => handleLoginWithFB()}
              >
                <Text style={styles.loginButtonTitle}>
                  Continue with Facebook
                </Text>
              </FontAwesome.Button>
              <View style={styles.clearBoth}></View>
              <FontAwesome.Button
                style={styles.facebookButton}
                name={"google"}
                backgroundColor={"red"}
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
