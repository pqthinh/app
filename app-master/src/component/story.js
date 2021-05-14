import React, { useEffect, useState } from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";
import styles from "./style";

const currencyFormatter = require("currency-formatter");

const fakeNews = {
  anh: [
    "https://picsum.photos/700",
    "https://picsum.photos/700",
    "https://picsum.photos/700",
  ],
  giaban: 1000000,
  ten: "Test product",
  diadiem: "Ha noi, Me tri ha",
  ngaydangtin: new Date(),
  ngaycapnhat: new Date(),
  user: {
    name: "thinh",
    place: "Thai Binh",
  },
};

export default function StoryItem(props) {
  const { navigation, newspost, danhmuc, item } = props;
  const news = fakeNews;
  const handleImage = (anh) => {
    let imgs = anh;
    if (imgs.length == 0 || anh.length == 0)
      return "https://image.shutterstock.com/image-vector/merchandise-line-icons-signs-set-600w-1371727865.jpg";
    return imgs[0];
  };
  return (
    <TouchableOpacity onPress={() => console.log("Details", { news })}>
      <View style={styles.news}>
        <Image
          style={styles.stickyItem}
          source={{ uri: handleImage(news.anh) }}
          title={news.ten}
        />
        <View></View>
      </View>
    </TouchableOpacity>
  );
}
