import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TopTab from "./TopTab";

const Tab = createBottomTabNavigator();
import PostNewsScreen from "../feature/news/screen/postNews";
import HomeStack from "../navigation/HomeStack";
import CardScreen from "../feature/card/CardScreen";

const SettingsScreen = (props) => {
  const { navigation } = props;
  return (
    <View>
      <CardScreen navigation={navigation} />
    </View>
  );
};

const IconPostNews = ({ color }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: -10, // space from bottombar
        height: 60,
        width: 60,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
      }}
    >
      <MaterialCommunityIcons
        name="dolly"
        color={color || "#000"}
        size={50}
        style={{ flex: 1, alignItems: "center" }}
      />
    </View>
  );
};

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#8BC34A",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notify"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostNewsScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <IconPostNews color={color} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={TopTab}
        options={{
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Trang cá nhân",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
