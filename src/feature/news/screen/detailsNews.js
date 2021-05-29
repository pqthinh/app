import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Avatar, Card, Divider } from "react-native-paper";
import { Feather } from "react-native-vector-icons";
import CommentComponent from "../../../component/CommentComponent/comment";
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
    star: "4",
    phone: "0866564502",
    avatar_url: "https://picsum.photos/200",
  },
  mieuta: `Cấu hình : SURFACE LAPTOP 3 I5/ RAM 8GB/ SSD 256GB 13INCH NEW
-CPU: Intel® Core™ Core i5
-GPU: Intel Iris Plus Graphics
-RAM: 8GB 3733MHz DDR4
-Ổ lưu trữ: 256GB removable SSD
-Kích thước: 308.1 x 223.27 x 14.48 mm
-Trọng lượng: 1283g
-Hệ điều hành: Widows 10`,
};

const DetailsNewsScreen = ({ navigation, route }) => {
  const [news, setNews] = useState(fakeNews);
  const [comment, setComment] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={styles.title}>{news.ten}</Text>,
      headerRight: () => (
        <View style={styles.IconWrapper}>
          <Feather
            name="phone-call"
            size={24}
            style={styles.IconWrapper}
            onPress={() =>
              Linking.openURL(`tel: ${news.user.phone || "0866564502"}`)
            }
          />
          <Feather
            name="more-vertical"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              console.log("more");
            }}
          />
        </View>
      ),
      // headerLeft: (props) => <View>

      // </View>,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ width: "100%", height: 150 }}>
          <SliderBox
            images={news.anh}
            autoplay
            circleLoop
            sliderBoxHeight={220}
            resizeMethod={"resize"}
            resizeMode={"cover"}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
          />
        </View>

        <View style={styles.blockName}>
          <Text style={styles.title}>{news.ten}</Text>
          <Text style={styles.money}>
            Giá bán:{" "}
            {" " + currencyFormatter.format(news.giaban, { code: "VND" })}
          </Text>
          <Text style={styles.time}>
            Ngày đăng tin: {" " + new Date().toLocaleDateString("vi-VN")}
          </Text>
          <Text> Địa chỉ: {" " + news.diadiem}</Text>
          <View style={styles.function}>
            <View style={styles.IconWrapper}>
              <Feather
                name="shopping-cart"
                size={24}
                style={styles.IconWrapper}
                onPress={() => {
                  console.log("more");
                }}
              />
            </View>
            <View>
              <Feather
                name="heart"
                size={24}
                style={styles.IconWrapper}
                onPress={() => {
                  console.log("more");
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <Divider />
          <View style={styles.blockUser}>
            <Card.Title
              title={news.user.name}
              subtitle={news.user.star + " sao"}
              left={(props) => (
                <Avatar.Image
                  size={50}
                  source={{ uri: news.user.avatar_url }}
                />
              )}
              right={(props) => (
                <TouchableOpacity
                  onPress={() => Alert.alert("Xem trang ca nhan")}
                  style={styles.moreInfoUser}
                >
                  <Text style={{ color: "#fe9900" }}>Trang cá nhân</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <Divider />
        </View>

        <View style={styles.description}>
          <Text>{news.mieuta}</Text>
        </View>

        <View>
          <CommentComponent />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 40,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#aed581",
            paddingHorizontal: 10,
            alignItems: "center",
            paddingVertical: 10,
          }}
          onPress={() => Linking.openURL(`tel: ${news.user.phone}`)}
        >
          <Ionicons
            name="ios-call"
            style={{ paddingRight: 10 }}
            size={24}
            color="#000"
          />
          <Text style={{ color: "#000" }}>Gọi điện</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            color: "#aed581",
            paddingHorizontal: 10,
            alignItems: "center",
            paddingVertical: 10,
          }}
          onPress={() => Linking.openURL(`sms: ${news.user.phone}`)}
        >
          <FontAwesome5
            name="sms"
            size={24}
            color="#aed581"
            style={{ paddingRight: 10 }}
          />
          <Text style={{ color: "black" }}>Nhắn tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#aed581",
            paddingHorizontal: 10,
            alignItems: "center",
            paddingVertical: 10,
          }}
          onPress={() => {
            alert("Chat online");
            navigation.navigate("ChatDetails", {
              title: `${news.user.name}`,
              phone: `${news.user.phone}`,
              id: news.id,
            });
          }}
        >
          <AntDesign
            name="wechat"
            style={{ paddingRight: 10 }}
            size={24}
            color="#000"
          />
          <Text style={{ color: "#000" }}>Chat online</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsNewsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  IconWrapper: { flexDirection: "row", marginHorizontal: 5, color: "#000" },
  blockName: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: "relative",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
  },
  money: { color: "red" },
  function: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 10,
    right: 5,
  },
  moreInfoUser: {
    borderColor: "#fe9900",
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    width: 120,
    flexDirection: "row",
    paddingHorizontal: 2,
    justifyContent: "center",
    marginHorizontal: 5,
    fontSize: 10,
  },
  description: {
    padding: 10,
  },
  commentInput: {},
  listComment: {},
  userComment: { fontSize: 14 },
});
