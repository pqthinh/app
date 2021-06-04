import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";
import ListProductManagement from "./NewsList";
import ProfileScreen from "./ProfileScreen";
import UpdateInfoUser from "./UpdateInfoUser";

const Stack = createStackNavigator();

export default function StackUser({ navigation }) {
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
                name="home"
                size={24}
                color="#fff"
                onPress={() => {
                  navigation.navigate("Home");
                }}
                style={{ marginRight: 0 }}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateInfoUser} />
        <Stack.Screen
          name="ProductManagement"
          component={ListProductManagement}
        />
        <Stack.Screen name="PickImage" component={UpdateInfoUser} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
