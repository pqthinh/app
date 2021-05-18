import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Feather } from "react-native-vector-icons";
import styles from "./styles";

const UpdateInfoUser = (props) => {
  const { navigation } = props;
  const [data, setData] = useState({
    email: "",
    dateofbirth: "",
    name: "",
    password: "",
    gender: "",
    avatar: "",
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

  useEffect(() => {
    (async () => {})();
  }, []);

  const Divider = (props) => {
    return (
      <View {...props}>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
      </View>
    );
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            <Image
              source={{
                uri: "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.15752-9/167274302_468639401019563_7861387796358691871_n.png?_nc_cat=111&ccb=1-3&_nc_sid=58c789&_nc_ohc=aJJHOeKZ9vIAX_mRS02&_nc_ht=scontent.fhan2-2.fna&oh=4f59c8753225bfff847b2a5b6b827ab5&oe=60888C38",
              }}
              style={styles.Logo}
            />
            <View>
              <Feather name="photo" size={30} />
            </View>
          </View>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Tên"
                value={data.name}
                onChangeText={handleChange("name")}
              />
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType="emailAddress"
                keyboardType="email-address"
                placeholder="Email"
                autoCapitalize="none"
                value={data.email}
                onChangeText={handleChange("email")}
              />
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Giới tính"
                secureTextEntry={true}
                value={data.gender}
                onChangeText={handleChange("gender")}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Ngày sinh"
                autoCapitalize="none"
                value={data.dateofbirth}
                onChangeText={handleChange("dateofbirth")}
              />
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={data.password}
                onChangeText={handleChange("password")}
              />
            </View>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                Alert.alert("Đã gửi yêu cầu tcập nhật thông tin");
              }}
            >
              <Text style={styles.loginButtonTitle}>Cập nhật</Text>
            </TouchableOpacity>
            <View style={styles.clearBoth}></View>
            <Divider style={styles.divider}></Divider>

            <Text style={styles.goToLogin} onPress={() => navigation.goBack()}>
              Hủy
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default UpdateInfoUser;
