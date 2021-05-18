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
        console.log(e);
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
                  source={{
                    uri: "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.15752-9/167274302_468639401019563_7861387796358691871_n.png?_nc_cat=111&ccb=1-3&_nc_sid=58c789&_nc_ohc=aJJHOeKZ9vIAX_mRS02&_nc_ht=scontent.fhan2-2.fna&oh=4f59c8753225bfff847b2a5b6b827ab5&oe=60888C38",
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
