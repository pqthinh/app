import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DetailProduct from "./screen/detailProduct";
import PostNewsScreen from "./screen/postNews";

const Stack = createStackNavigator();

export default function StackNews() {
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
        <Stack.Screen name="Details" component={DetailProduct} />
        <Stack.Screen name="PostNews" component={PostNewsScreen} />
        <Stack.Screen name="PreviewNews" component={DetailProduct} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
