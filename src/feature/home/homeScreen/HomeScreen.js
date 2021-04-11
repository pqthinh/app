import React from "react";
import { View, Text, ScrollView } from "react-native";
import Banner from "../../../component/banner";
import CategoryComponent from "../../../component/category";
import Item from "../../../component/item";
import ItemFlex from "../../../component/item-flex";

const ListProduct = (props) => {
  return (
    <View>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </View>
  );
};

const ListProductlexDirection = (props) => {
  return (
    <View>
      <ItemFlex />
      <ItemFlex />
      <ItemFlex />
      <ItemFlex />
    </View>
  );
};

const HomeScreen = (props) => {
  return (
    <ScrollView>
      <Banner />
      <CategoryComponent />
      <ListProduct />
      <ListProductlexDirection />
    </ScrollView>
  );
};

export default HomeScreen;
