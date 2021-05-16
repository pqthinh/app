import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";
import styles from "./styles";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Feather";
import { Avatar } from "react-native-paper";

const CustomSidebarMenu = (props) => {
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
            <Icon name="git-branch" color={color} size={size} />
          )}
          label="github.com/pqthinh/app"
        />

        <DrawerItem
          style={styles.footerDrawer}
          icon={({ color, size }) => (
            <Icon name="log-out" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            // signOut();
            console.log("sign out");
          }}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;

{
  /* <Avatar.Image size={50} source={require("../../assets/logo_lg.png")} /> */
}
{
  /* <Image
  source={require("../../assets/logo_lg.png")}
  style={styles.sideMenuProfileIcon}
/> */
}
