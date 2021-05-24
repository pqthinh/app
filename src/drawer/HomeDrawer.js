import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import DetailNews from "../feature/news/screen/detailsNews";
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
        <Drawer.Screen name="Thông báo" component={DetailNews} />
        <Drawer.Screen name="Trang cá nhân" component={RootApp} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default HomeDrawer;
