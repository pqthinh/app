import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";
import { styles } from "./styles";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const CustomSidebarMenu = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/logo_lg.png")}
        style={styles.sideMenuProfileIcon}
      />
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
              uri:
                "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png",
            }}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView>
      <Text style={{ fontSize: 16, textAlign: "center", color: "grey" }}>
        https://github.com/pqthinh/app
      </Text>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;
