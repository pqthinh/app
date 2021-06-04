import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import DetailNews from "../feature/news/screen/detailsNews";
import StackNotify from "../feature/Notification/StackNotify";
import StackUser from "../feature/user/StackUser";
import RootApp from "../navigation/RootStack";
import CustomSidebarMenu from "./CustomDrawer";

const Drawer = createDrawerNavigator();

const HomeDrawer = (props) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen icon="home" name="Trang chủ" component={RootApp} />
        <Drawer.Screen name="Thông báo" component={StackNotify} />
        <Drawer.Screen name="Trang cá nhân" component={StackUser} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default HomeDrawer;
