import React, { useState } from "react";
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
import postNews from "../feature/news/screen/postNews";
import DetailsNewsScreen from "../feature/news/screen/detailsNews";
import StackUser from "../feature/user/StackUser";
import StackNews from "../feature/news/StackNews";
import StackCard from "../feature/card/CardStack";

const Stack = createStackNavigator();

export default function HomeStack(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("News", {
                    screen: "Search",
                    params: { search: search },
                  });
                  setSearch("");
                }}
              >
                <SearchComponent
                  value={search}
                  onChangeData={setSearch}
                  navigation={navigation}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.IconWrapper}>
                <Feather
                  name="shopping-cart"
                  size={24}
                  style={styles.IconWrapper}
                  onPress={() => {
                    navigation.navigate("Card");
                  }}
                />
                <Feather
                  name="message-circle"
                  size={24}
                  style={styles.IconWrapper}
                  onPress={() => {
                    navigation.navigate("ChatStack", { screen: "ListContact" });
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Card"
          component={StackCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="News"
          component={StackNews}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={StackUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailsNewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostNews"
          component={StackNews}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  IconWrapper: { flexDirection: "row", marginHorizontal: 5, color: "#fff" },
});
