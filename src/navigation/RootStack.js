import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LoginScreen from "../feature/authentication/LoginScreen/login";
import RegisterScreen from "../feature/authentication/SignUp";
import MainApp from "../MainApp";
import HomeStack from "./HomeStack";
import BottomTab from "../tab/BottomTab";
import ForgotPasswordScreen from "../feature/authentication/ForgotPassword";

const Stack = createStackNavigator();

export default function RootApp() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FogotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainApp" component={BottomTab} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
