import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import RootApp from "../navigation/RootStack";
import DetailNews from "../feature/news/screen/detailsNews";
import CustomSidebarMenu from "./CustomDrawer";
import styles from "./styles";

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
