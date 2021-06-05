import React, { useEffect, useState } from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";
import { Avatar } from "react-native-paper";
import styles from "./style";
import { withEmpty } from "exp-value";

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

export default function StoryItem({ navigation, newspost, danhmuc, item }) {
  const news = newspost || fakeNews;
  const handleImage = (anh) => {
    if (anh.length == 0)
      return "https://image.shutterstock.com/image-vector/merchandise-line-icons-signs-set-600w-1371727865.jpg";
    return anh[0];
  };
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { news })}>
      <View style={styles.news}>
        <Image
          style={styles.stickyItem}
          source={{ uri: handleImage(news.anh) }}
          title={news.ten}
        />
        <View style={styles.stickyAvatar}>
          <Avatar.Image
            size={40}
            source={{
              uri: "https://image.shutterstock.com/image-vector/merchandise-line-icons-signs-set-600w-1371727865.jpg",
            }}
          />
        </View>

        <Text style={styles.auth}>{withEmpty("user.name", news)}</Text>
      </View>
    </TouchableOpacity>
  );
}
