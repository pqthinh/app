import React, { useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
} from "react-native";
// import { Avatar } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import styles from './styles'

const UpdateInfoUser = ({ props }) => {
    const [data, setData] = useState({
        email: "",
        dateofbirth: "",
        name: "",
        password: "",
        gender: "",
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
            {/* { <View style={styles.Logo}> */}
              {/* <Avatar.Image source={{uri: "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.15752-9/167274302_468639401019563_7861387796358691871_n.png?_nc_cat=111&ccb=1-3&_nc_sid=58c789&_nc_ohc=aJJHOeKZ9vIAX_mRS02&_nc_ht=scontent.fhan2-2.fna&oh=4f59c8753225bfff847b2a5b6b827ab5&oe=60888C38"}} />             */}
            <Avatar
              size="xlarge"
              rounded
              title="ok"
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
            {/* </View> */}
            

           </View>
          <View style={styles.down}>

          <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Tên"
                value={data.name}
                onChangeText={handleChange("name")}
              ></TextInput>
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
              ></TextInput>
            </View>

            

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Giới tính"
                secureTextEntry={true}
                value={data.gender}
                onChangeText={handleChange("gender")}
              ></TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Ngày sinh"
                autoCapitalize="none"
                value={data.dateofbirth}
                onChangeText={handleChange("dateofbirth")}
              ></TextInput>
            </View>          
            
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={data.password}
                onChangeText={handleChange("password")}
              ></TextInput>
            </View>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                requestSignup(data);
              }}
            >
              <Text style={styles.loginButtonTitle}>Cập nhật</Text>
            </TouchableOpacity>
            <View style={styles.clearBoth}></View>
            <Divider style={styles.divider}></Divider>

            <Text
              style={styles.goToLogin}
              onPress={() => navigation.navigate("Login")}
            >
              Hủy
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default UpdateInfoUser;
