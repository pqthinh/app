import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DetailProduct from "./screen/detailProduct";
import PostNewsScreen from "./screen/postNews";
import DetailsNewsScreen from "./screen/detailsNews";
import { View, Text } from "react-native";
import { Feather } from "react-native-vector-icons";

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
        <Stack.Screen name="PreviewNews" component={DetailProduct} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
