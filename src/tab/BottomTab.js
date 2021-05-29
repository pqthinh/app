import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TopTab from "./TopTab";

const Tab = createBottomTabNavigator();
import PostNewsScreen from "../feature/news/screen/postNews";
import HomeStack from "../navigation/HomeStack";
import CardScreen from "../feature/card/CardScreen";
import StackNews from "../feature/news/StackNews";
import ProfileScreen from "../feature/user/ProfileScreen";

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

function BottomTab(props) {
  const { user, navigation } = props;

  React.useEffect(() => {
    if (!user.accessToken || !user) navigation.navigate("Login");
  }, [user]);

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
        component={StackNews}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <IconPostNews color={color} />,
        }}
      />
      <Tab.Screen
        name="Card"
        component={TopTab}
        options={{
          tabBarLabel: "Giỏ hàng",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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

export default connect(
  (state) => ({
    user: state.userReducer.user,
    isLoggedIn: !state.userReducer.userLoading,
  }),
  {}
)(BottomTab);
