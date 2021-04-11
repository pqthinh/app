import React, { useEffect, useState } from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";

const currencyFormatter = require("currency-formatter");

const heightImage =
  Platform.OS == "android" ? 150 : Platform.OS == "ios" ? 120 : 180;

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

export default function Item({ navigation, newspost, danhmuc }) {
  // const [newsposted, setNewsposted] = useState(newspost || fakeNews)
  const news = fakeNews;
  const handleImage = (anh) => {
    // var imgs = anh.trim().split(",")
    let imgs = anh;
    if (imgs.length == 0 || anh.length == 0)
      return "https://image.shutterstock.com/image-vector/merchandise-line-icons-signs-set-600w-1371727865.jpg";
    return imgs[0];
  };
  return (
    <TouchableOpacity onPress={() => console.log("Details", { news })}>
      <View style={styles.news}>
        <Image
          style={styles.image}
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

const styles = StyleSheet.create({
  image: {
    width: heightImage,
    height: heightImage,
    overflow: "hidden",
    padding: 5,
    margin: 5,
  },
  titleOfImage: {
    fontWeight: "400",
    color: "#000",
    fontSize: 14,
  },
  viewNewsPosted: {
    alignContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  DivTitle: {
    fontSize: 16,
    marginLeft: Platform.OS == "web" ? 20 : 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "600",
  },
  news: {
    borderWidth: 0.25,
    borderColor: "#e0e0e0",
    marginRight: 5,
    marginTop: 5,
    width: heightImage + 10,
  },
});
