import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet , Image , Linking , Alert} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';
// import ImageSlider from 'react-native-image-slider';
// import { Divider  , Avatar, Card } from 'react-native-paper';
// import { FontAwesome5 } from '@expo/vector-icons';
// import TimeAgo from 'react-native-timeago';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import AsyncStorage from '@react-native-community/async-storage';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Fontisto } from '@expo/vector-icons';
// var currencyFormatter = require('currency-formatter')

const DetailsNewsScreen = ({navigation, route}) => {
  return (
    <Text>Hello !</Text>
  )
};

export default DetailsNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header :{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: "bold",
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    flex: 0.1
  },
  banner: {
    flex: 0.5
  },
  customImage: {
    width: 360 ,
    height: 250,
    alignItems: 'center',
    resizeMode: 'cover',
  },
  namePost: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10 
  },
  giaBan: {
    color: 'red'
  },
});