import React, { useState } from "react";
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
import { firebase } from "../../config";
import styles from "./styleTypes";

const ForgotPasswordScreen = (props) => {
  const { navigation } = props;

  const [email, setEmail] = useState("");

  const handleChangeData = (value) => {
    setEmail(value.toLowerCase());
  };

  const forgotPassword = React.useCallback((Email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(Email)
      .then(function (user) {
        console.log(user);
        Alert.alert("Thông báo", "Check your email and change password !");
      })
      .catch(function (e) {
        Alert.alert("Thông báo", JSON.stringify(e.message));
      });

    navigation.navigate("Login");
  }, []);

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
                  source={require("../../../assets/logo_lg.png")}
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
                  value={email}
                  onChangeText={(value) => handleChangeData(value)}
                ></TextInput>
              </View>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => {
                  forgotPassword(email);
                }}
              >
                <Text style={styles.loginButtonTitle}>SEND REQUEST</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.goToLogin}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={(styles.loginButtonTitle, { color: "#000" })}>
                  Go to Login
                </Text>
              </TouchableOpacity>
              <View style={{ height: 10 }}></View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
