import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "../tab/BottomTab";
import RootApp from "../navigation/RootStack";
import DetailNews from "../feature/news/screen/detailsNews";
import GGAPI from '../feature/authentication/apiGG'
import DrawerContent from './DrawerContent'

function HomeScreen2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
      <Button onPress={ async ()=> {
                await GGAPI.signOutAsync()
                await navigation.navigate("Login");
            }} title="Signout"/>
    </View>
  );
}

function NotificationsScreen2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DetailNews />
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}



const Drawer = createDrawerNavigator();

export default function HomeDrawer(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" >
      {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}> */}
        <Drawer.Screen name="Home" component={RootApp} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen2} />
        <Drawer.Screen name="Thinh" component={HomeScreen2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
