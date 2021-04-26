import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TopTab from "./TopTab";

const Tab = createBottomTabNavigator();
import HomeScreen from '../feature/home/homeScreen/HomeScreen'
import PostNewsScreen from "../feature/news/screen/postNews";
import HomeStack from "../navigation/HomeStack";

const SettingsScreen = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const IconPostNews = ({color}) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: -10, // space from bottombar
        height: 68,
        width: 68,
        borderRadius: 68,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0"
      }}
    >
      <MaterialCommunityIcons
        name="dolly"
        color={color|| "#000"}
        size={68}
      />
    </View>
  );
};

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Updates"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Updates",
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
          tabBarIcon: ({ color }) => (
          <IconPostNews color ={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={TopTab}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
