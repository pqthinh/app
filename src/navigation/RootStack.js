import * as React from 'react';
import { Text, StatusBar, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import SafeAreaView from 'react-native-safe-area-view';

import LoginScreen from '../feature/authentication/LoginScreen/login'
import RegisterScreen from '../feature/authentication/SignUp'
import MainApp from '../MainApp'
import HomeStack from './HomeStack';
import BottomTab from '../tab/BottomTab';

const Stack = createStackNavigator();

export default function RootApp() {
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> */}
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainApp" component={BottomTab} />
        </Stack.Navigator>
      {/* </NavigationContainer> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});