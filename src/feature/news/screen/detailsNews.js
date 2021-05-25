import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "react-native-vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import { Divider, Avatar, Card } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-elements";
import CommentComponent from "../../../component/comment";

const DetailsNewsScreen = ({ navigation, route }) => {
  const fake = [
    "https://picsum.photos/700",
    "https://picsum.photos/700",
    "https://picsum.photos/700",
    "https://picsum.photos/700",
  ];
  const [comment, setComment] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={styles.title}>Máy khoan đẹp giá rẻ</Text>,
      headerRight: () => (
        <View style={styles.IconWrapper}>
          <Feather
            name="phone-call"
            size={24}
            style={styles.IconWrapper}
            onPress={() => Linking.openURL(`tel: ${phone || "0866564502"}`)}
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
    });
  }, []);

  return (
    <ScrollView>
      <View style={{ width: "100%", height: 150 }}>
        <SliderBox
          images={fake}
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
        <Text style={styles.title}>{"Máy khoan tốt giả rẻ"}</Text>
        <Text style={styles.money}>{4000000}</Text>
        <Text style={styles.time}>
          {new Date().toLocaleDateString("vi-VN")}
        </Text>
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
            title={"Pham quang thinh"}
            subtitle="4,5 sao"
            left={(props) => (
              <Avatar.Image
                size={50}
                source={{ uri: "https://picsum.photos/700" }}
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
        <Text>{"         Discription\n".repeat(8)}</Text>
      </View>

      <View>
        <CommentComponent comment={comment} setComent={setComment} />
        <Text>comment wrapper</Text>
      </View>
    </ScrollView>
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
    fontWeight: "600",
    fontSize: 16,
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
