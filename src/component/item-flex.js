import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";

var currencyFormatter = require("currency-formatter");

const heightImage = 120;

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
  user: {
    name: "thinh",
    place: "Thai Binh",
  },
};

export default function ItemFlex({ news }) {
  news = news || fakeNews;
  const handleImage = (anh) => {
    // var imgs = anh.trim().split(",");
    let imgs = anh;
    if (imgs.length == 0 || anh.length == 0)
      return "https://image.shutterstock.com/image-vector/merchandise-line-icons-signs-set-600w-1371727865.jpg";
    return imgs[0];
  };
  return (
    <View style={styles.containerNewsPost}>
      <View>
        <Image
          style={styles.image}
          source={{ uri: handleImage(news.anh) }}
          title={news.ten}
        />
        <View style={styles.count}>
          <ImageBackground
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm5Tlh0NeiDGXb3Ya7mQ8Y07qq6IMYR6ggNw&usqp=CAU" }}
            style={styles.countImg}
          >
            <Text style={styles.numImg}>
              {news.anh.length}
            </Text>
          </ImageBackground>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.titlePost}>
          {news.ten.length > 15
            ? Platform.OS == "web"
              ? news.ten.slice(0, 18)
              : news.ten.slice(0, 15)
            : news.ten}
        </Text>
        <Text style={{ fontSize: 18, color: "red" }}>
          {currencyFormatter.format(news.giaban, { code: "VND" })}
        </Text>
        <Text>{""}</Text>
        <Text style={{ fontSize: 14 }}>
          <EvilIcons name="user" size={14} color="black" />
          {"  " + news.user.name}
        </Text>
        <Text style={{ fontSize: 14 }}>
          <MaterialIcons name="place" size={14} color="black" />
          {"  "}
          {news.diadiem.length > 18
            ? news.diadiem.slice(0, 18) + "..."
            : news.diadiem}
        </Text>
        <Text style={{ fontSize: 14 }}>
          <Fontisto name="date" size={14} color="black" />
          {"  "}
          <TimeAgo time={news.ngaycapnhat} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: heightImage,
    height: heightImage,
    padding: 5,
    margin: 5,
  },
  count: {
    position: "absolute",
    right: 5,
    top: 5,
    width: 30,
    height: 30
  },
  countImg: {
    width: 30,
    height: 25,
    borderRadius: 5,
    backgroundColor: "transparent"
  },
  numImg: {
    textAlign: 'center',
    color: "#fff",
    marginVertical: 4,
    backgroundColor: '#000',
    position: 'absolute',
    paddingHorizontal: 5,
    top: 2,
    right: 0,
    borderRadius: 5
  },
  titlePost: {
    fontWeight: "400",
    color: "#000",
    fontSize: 18,
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
  containerNewsPost: {
    borderWidth: 0.25,
    borderColor: "#e0e0e0",
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
    width: "90%",
  },
  details: {
    marginHorizontal: 10
  }
});
