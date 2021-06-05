import { EvilIcons, Fontisto, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
  ngaydangtin: new Date("01/06/2021"),
  ngaycapnhat: new Date("01/06/2021"),
  user: {
    name: "thinh",
    place: "Thai Binh",
  },
};

export default function Item({ navigation, newsPost, danhmuc }) {
  const news = newsPost || fakeNews;
  const handleImage = (anh) => {
    if (anh.length == 0) return "https://picsum.photos/300";
    return anh[0];
  };

  const handleNavigateToDetail = () => {
    navigation.navigate("Detail", { news });
  };

  return (
    <TouchableOpacity onPress={() => handleNavigateToDetail()}>
      <View
        style={[
          styles.news,
          {
            marginHorizontal: 10,
            marginVertical: 10,
            backgroundColor: "#f0f0f0",
            flex: 1,
            justifyContent: "center",
          },
        ]}
      >
        <Image
          style={[styles.image, { resizeMode: "cover", width: "95%" }]}
          source={{ uri: handleImage(news.anh) }}
          title={news.ten}
        />
        <View style={{ margin: 5 }}>
          <Text style={styles.titleOfImage}>
            {news.ten.length > 15
              ? Platform.OS == "web"
                ? news.ten.slice(0, 18)
                : news.ten.slice(0, 15)
              : news.ten}
          </Text>
          <Text style={{ fontSize: 16, color: "red" }}>
            {currencyFormatter.format(news.giaban, { code: "VND" })}
          </Text>
          <Text style={{ fontSize: 12, marginVertical: 2 }}>
            <EvilIcons name="user" size={16} color="black" />
            {"  " + news.user.name}
          </Text>
          <Text style={{ fontSize: 12 }}>
            <MaterialIcons name="place" size={16} color="black" />{" "}
            {news.diadiem.length > 18
              ? news.diadiem.slice(0, 18) + "..."
              : news.diadiem}
          </Text>
          <Text style={{ fontSize: 12 }}>
            <Fontisto name="date" size={16} color="black" />
            {"  "}
            <TimeAgo time={news.ngaycapnhat} />
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
