import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";
import CardDetail from "./CardDetail";
import CardScreen from "./CardScreen";
import CheckoutScreen from "./CheckoutScreen";

const Stack = createStackNavigator();

export default function StackCard({ navigation }) {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#aed581",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "normal",
            alignSelf: "center",
            textAlign: "center",
          },
          headerLeft: () => (
            <View style={{ marginHorizontal: 5 }}>
              <Feather
                name="arrow-left"
                size={24}
                color="#fff"
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ marginRight: 0 }}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen name="Card" component={CardScreen} />
        <Stack.Screen name="CardDetail" component={CardDetail} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
