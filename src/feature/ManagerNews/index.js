import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Overview from "./screen/Overview";

const Stack = createStackNavigator();

export default function StackManagerNews() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#aed581",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
            textAlign: "center",
          },
        }}
      >
        <Stack.Screen name="ManagerNews" component={Overview} />
        <Stack.Screen name="Detail" component={Overview} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
