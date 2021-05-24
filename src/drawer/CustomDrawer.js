import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Image, Linking, SafeAreaView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import GGAPI from "../feature/authentication/apiGG";
import styles from "./styles";

const CustomSidebarMenu = (props) => {
  const { navigation } = props;

  const logout = async () => {
    let StorageKey = "@MyApp:Auth";
    let userReducer = "auth";
    try {
      await GGAPI.signOutAsync();
      await AsyncStorage.removeItem(StorageKey);
      await AsyncStorage.removeItem(userReducer);
      await AsyncStorage.clear();
    } catch (e) {
      alert(`Failed to revoke token: ${e.message}`);
    } finally {
      navigation.navigate("Login");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../assets/logo_lg.png")}
          style={styles.sideMenuProfileIcon}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Giới thiệu"
          onPress={() => Linking.openURL("https://github.com/pqthinh/app")}
        />
        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL("https://github.com/pqthinh/app");
            }}
          >
            Đánh giá
          </Text>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png",
            }}
            style={styles.iconStyle}
          />
        </View>

        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="log-out" color={color} size={14} />
          )}
          label="Đăng xuất"
          onPress={() => logout()}
        />
      </DrawerContentScrollView>
      <View style={styles.footerDrawer}>
        <Icon
          name="git-branch"
          color={"#000"}
          size={12}
          style={{ marginLeft: 20, marginRight: 10 }}
        />
        <Text onPress={() => Linking.openURL("https://github.com/pqthinh/app")}>
          source code
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;
