import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";
import DetailNotify from "./DetailsNotify";
import ListNotify from "./ListNotify";

const Stack = createStackNavigator();

export default function StackNotify({ navigation }) {
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
        <Stack.Screen name="ListNotify" component={ListNotify} />
        <Stack.Screen name="DetailsNotify" component={DetailNotify} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
