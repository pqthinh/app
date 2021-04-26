import React from "react";
import { View, Text, ScrollView , Button } from "react-native";
import Banner from "../../../component/banner";
import CategoryComponent from "../../../component/category";
import Item from "../../../component/item";
import ItemFlex from "../../../component/item-flex";
import Stories from "../../../component/stories";
import styles from "../style";

const ListProduct = (props) => {
  return (
    <View style={styles.ListProduct}>
      <Item style={styles.ItemProduct}/>
      <Item style={styles.ItemProduct}/>
      <Item style={styles.ItemProduct}/>
      <Item style={styles.ItemProduct}/>
      <Item style={styles.ItemProduct}/>
    </View>
  );
};

const ListProductlexDirection = (props) => {
  return (
    <View style={styles.ItemFlex}>
      <ItemFlex />
      <ItemFlex />
      <ItemFlex />
      <ItemFlex />
    </View>
  );
};

const HomeScreen = (props) => {
  const { navigation } = props
  return (
    <ScrollView>
      <Banner />
      <Stories />
      <CategoryComponent />
      <ListProduct />
      <ListProductlexDirection />
      <Button title="Go to chat" onPress={()=> navigation.navigate("Chat")}/>
    </ScrollView>
  );
};

export default HomeScreen;
