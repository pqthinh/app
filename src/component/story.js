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
    "https://source.unsplash.com/collection/190727/1600x900",
    "https://picsum.photos/200",
    "https://source.unsplash.com/assets/grid-likes-17d8c9c95aa04afeb7128e2f52893dc46f7e3dc087fa9e2ff37fc8f5a8bafc67.png",
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
    if (anh?.length == 0)
      return "https://source.unsplash.com/assets/grid-likes-17d8c9c95aa04afeb7128e2f52893dc46f7e3dc087fa9e2ff37fc8f5a8bafc67.png";
    return (
      anh?.[0] ||
      "https://th.bing.com/th/id/OIP.Vx-xhHQvVoW6ImOmInz-4gHaIa?w=140&h=180&c=7&o=5&pid=1.7"
    );
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
              uri: "https://source.unsplash.com/assets/grid-likes-17d8c9c95aa04afeb7128e2f52893dc46f7e3dc087fa9e2ff37fc8f5a8bafc67.png",
            }}
          />
        </View>

        <Text style={styles.auth}>{withEmpty("user.name", news)}</Text>
      </View>
    </TouchableOpacity>
  );
}
