import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ListChat from "./screen/ListChat";
import DetailChat from "./screen/DetailChat";

const Stack = createStackNavigator();

export default function StackChat() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ListContact" component={ListChat} />
        <Stack.Screen
          name="ChatDetail"
          component={DetailChat}
          options={({ navigation, route }) => ({
            title: route.params.title,
            headerRight: () => (
              <View style={styles.IconWrapper}>
                  {console.log(route)}
                <Feather
                  name="phone-call"
                  size={24}
                  style={styles.IconWrapper}
                  onPress={() => {
                    console.log(route);
                  }}
                />
                <Feather
                  name="more-vertical"
                  size={24}
                  style={styles.IconWrapper}
                  onPress={() => {
                    console.log("more");
                  }}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
