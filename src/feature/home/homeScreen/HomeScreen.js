import React from "react";
import { View, Text, ScrollView , Button } from "react-native";
import { connect } from "react-redux";
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
  const { user, navigation } = props
  return (
    <ScrollView>
      
      <Banner />
      <Stories navigation={navigation}/>
      <CategoryComponent navigation={navigation}/>
      <ListProduct navigation={navigation}/>
      <ListProductlexDirection navigation={navigation}/>
      <Button title="Go to chat" onPress={()=> navigation.navigate("Chat")}/>
      <Button title="Go to update profile" onPress={()=> navigation.navigate("Profile")}/>
      <Text>{JSON.stringify(user)}</Text>
      <View style={{height: 100}}></View>
    </ScrollView>
  );
};

export default connect(
  (state) => ({
    user: state.userReducer.user,
    isLoggedIn: !state.userReducer.userLoading,
  }),
  {}
)(HomeScreen);
