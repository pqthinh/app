import * as React from "react";
import { Text, StatusBar, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "../feature/home/homeScreen/HomeScreen";
import RegisterScreen from "../feature/authentication/SignUp";
import MainApp from "../MainApp";
import ChatComponent from "../component/chat/GitfChat";
import ChatTest from "../component/chat/network";
import UpdateInfoUser from "../feature/user/UpdateInfoUser";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> headerMode="none"*/}
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
        {/* <Stack.Screen name="Chat" component={ChatTest} /> */}
        <Stack.Screen name="Chat" component={ChatComponent} />
        <Stack.Screen name="Profile" component={UpdateInfoUser} />
        <Stack.Screen name="Detail" component={UpdateInfoUser} />
        <Stack.Screen name="PostNews" component={UpdateInfoUser} />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
