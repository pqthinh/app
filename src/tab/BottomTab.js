import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import CardScreen from "../feature/card/CardScreen";
import StackCard from "../feature/card/CardStack";
import StackNews from "../feature/news/StackNews";
import StackNotify from "../feature/Notification/StackNotify";
import StackUser from "../feature/user/StackUser";
import HomeStack from "../navigation/HomeStack";

const Tab = createBottomTabNavigator();

const IconPostNews = ({ color }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: -10,
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
        component={StackNotify}
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
        component={StackCard}
        options={{
          tabBarLabel: "Giỏ hàng",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={StackUser}
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
