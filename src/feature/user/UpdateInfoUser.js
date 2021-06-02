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

const UpdateInfoUser = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    dateOfBirth: "",
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>
          Cập nhật thông tin
        </Text>
      ),
      headerLeft: () => (
        <View style={{ marginHorizontal: 5 }}>
          <Feather
            name="arrow-left"
            size={24}
            color="#fff"
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginRight: 0 }}
          />
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name="heart"
            size={24}
            style={styles.IconWrapper}
            onPress={() => Alert.alert("preview news")}
            color="#fff"
          />
          <Feather
            name="more-vertical"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              console.log("more");
            }}
            color="#fff"
          />
        </View>
      ),
    });
  }, []);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            <View
              style={{
                width: 100,
                height: 100,
                marginVertical: 20,
                backgroundColor: "red",
                borderRadius: 100,
              }}
            >
              <Image
                source={{
                  uri: "https://picsum.photos/200",
                }}
                style={[
                  styles.Logo,
                  {
                    justifyContent: "center",
                    borderRadius: 100,
                    width: "100%",
                  },
                ]}
              />
              <Feather
                name="add-a-photo"
                size={30}
                style={{ position: "absolute", bottom: 0, right: 0 }}
              />
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
                value={data.dateOfBirth}
                onChangeText={handleChange("dateOfBirth")}
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
                Alert.alert("Đã gửi yêu cầu cập nhật thông tin");
              }}
            >
              <Text style={styles.loginButtonTitle}>Cập nhật</Text>
            </TouchableOpacity>
            <View style={styles.clearBoth}></View>
            {/* <Divider /> */}

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
