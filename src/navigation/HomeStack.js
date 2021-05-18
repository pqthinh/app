import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather } from "react-native-vector-icons";

import HomeScreen from "../feature/home/homeScreen/HomeScreen";
import ChatComponent from "../component/chat/ChatComponent";
import ChatTest from "../component/chat/network";
import UpdateInfoUser from "../feature/user/UpdateInfoUser";
import SearchComponent from "../component/SearchComponent";
import StackChat from "../feature/chat/StackChat";

const Stack = createStackNavigator();

export default function HomeStack(props) {
  const { navigation } = props;
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <TouchableOpacity
                onPress={(() => navigation.navigate("Chat"))}
              >
                <SearchComponent />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.IconWrapper}>
                <Feather
                  name="shopping-cart"
                  size={24}
                  style={styles.IconWrapper}
                  onPress={() => {
                    navigation.navigate("ChatStack" ,  {screen: "ListContact"});
                  }}
                />
                <Feather
                  name="message-circle"
                  size={24}
                  style={styles.IconWrapper}
                  onPress={() => {
                    navigation.navigate("ChatStack" ,  {screen: "ListContact"});
                  }}
                />
              </View>
            ),
            headerLeft: () => (
              <View style={styles.IconWrapper}>
                <Feather
                  name="menu"
                  size={24}
                  color="#fff"
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  style={{ marginRight: 0 }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#aed581",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            },
          }}
        />

        <Stack.Screen
          name="ChatStack"
          component={StackChat}
          options={{headerShown: false}}
          // options={{
          //   headerBackTitle: <Feather name="arrow-left" size={24} />,
          //   headerStyle: {
          //     backgroundColor: "#aed581",
          //   },
          //   headerTintColor: "white",
          //   headerTitleStyle: {
          //     fontWeight: "bold",
          //     alignSelf: "center",
          //     textAlign: "center",
          //   },
          //   title: "Danh sách hội thoại"
          // }}
        />
        <Stack.Screen name="Profile" component={ChatTest} />
        <Stack.Screen name="Detail" component={ChatTest} />
        <Stack.Screen name="PostNews" component={UpdateInfoUser} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  IconWrapper: { flexDirection: "row", marginHorizontal: 5, color: "#fff" },
});
