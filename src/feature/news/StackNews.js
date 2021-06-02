import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";
import DetailsNewsScreen from "./screen/detailsNews";
import PostNewsScreen from "./screen/postNews";
import PreviewScreen from "./screen/preview";

const Stack = createStackNavigator();

export default function StackNews({ navigation }) {
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
        <Stack.Screen name="PostNews" component={PostNewsScreen} />
        <Stack.Screen name="Details" component={DetailsNewsScreen} />
        <Stack.Screen name="PreviewNews" component={PreviewScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
