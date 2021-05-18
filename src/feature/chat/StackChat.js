import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ListChat from "./screen/ListChat";
import DetailChat from "./screen/DetailChat";

const Stack = createStackNavigator();

export default function StackChat() {
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
        <Stack.Screen name="ListContact" component={ListChat} />
        <Stack.Screen name="ChatDetail" component={DetailChat} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
