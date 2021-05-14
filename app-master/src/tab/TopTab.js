import React from 'react'
import {View , Text } from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const HomeScreen1 = () => {
  return (
    <View style={{ color: "red" }}>
      <Text>Home</Text>
    </View>
  );
};

const SettingsScreen1 = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

function TopTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen1} />
      <Tab.Screen name="Settings" component={SettingsScreen1} />
    </Tab.Navigator>
  );
}

export default TopTab;
