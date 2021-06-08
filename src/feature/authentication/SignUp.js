import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { connect } from "react-redux";
import LoadingScreen from "../../component/modalLoading";
import { requestSignup } from "./redux/action";
import styles from "./styleTypes";

const RegisterScreen = (props) => {
  const { navigation, user, isLoggedIn, requestSignup, loading } = props;

  const [data, setData] = useState({
    email: "",
    phone: "",
    place: "",
    displayName: "",
    password: "",
    repassword: "",
  });

  const handleChange = (field) => (value) => {
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

  const handleSubmitForm = () => {
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

    const regPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!data.phone) {
      Alert.alert("Bạn chưa nhập số điện thoại!");
      return;
    }
    if (!regPhone.test(String(data.phone).toLowerCase())) {
      Alert.alert("Bạn nhập sđt không đúng định dạng!");
      return;
    }

    if (data.password.length < 6 || data.password.length > 30) {
      Alert.alert("Kiểm tra lại đọ dài mật khẩu");
      return;
    }
    if (data.repassword != data.repassword) {
      Alert.alert("Mật khẩu nhập không khớp");
      return;
    }

    if (!data.place) {
      Alert.alert("Bạn chưa nhập địa chỉ");
      return;
    }

    requestSignup(data);
  };

  const _loading = useCallback(() => {
    return <LoadingScreen loading={loading} />;
  }, [loading]);

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
    <ScrollView>
      {_loading()}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            <View style={styles.Logo}>
              <Image
                source={require("../../../assets/logo_lg.png")}
                style={[styles.imageLogo, { transform: [{ scale: 1 }] }]}
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
                onChangeText={handleChange("email")}
              ></TextInput>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type your displayname"
                value={data.displayName}
                onChangeText={handleChange("displayName")}
              ></TextInput>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={data.password}
                onChangeText={handleChange("password")}
              ></TextInput>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Retype your password"
                secureTextEntry={true}
                value={data.repassword}
                onChangeText={handleChange("repassword")}
              ></TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your phone number"
                autoCapitalize="none"
                value={data.phone}
                onChangeText={handleChange("phone")}
              ></TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your address"
                autoCapitalize="none"
                value={data.place}
                onChangeText={handleChange("place")}
              ></TextInput>
            </View>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => {
                handleSubmitForm();
              }}
            >
              <Text style={styles.loginButtonTitle}>SIGNUP</Text>
            </TouchableOpacity>
            <View style={styles.clearBoth}></View>
            <Divider style={styles.divider}></Divider>

            <Text
              style={styles.goToLogin}
              onPress={() => navigation.navigate("Login")}
            >
              Switch to Login Screen
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default connect(
  (state) => ({
    user: state.userReducer.user,
    isLoggedIn: !state.userReducer.userLoading,
    loading: state.userReducer.loading,
  }),
  { requestSignup }
)(RegisterScreen);
