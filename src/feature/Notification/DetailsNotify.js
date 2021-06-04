import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "react-native-vector-icons";

const DetailNotify = ({ navigation, route }) => {
  const notify = route.params?.notify || fakeNotify;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>
          Chi tiết thông báo
        </Text>
      ),
      headerLeft: () => (
        <View style={{ marginHorizontal: 5 }}>
          <Feather
            name="arrow-left"
            size={24}
            color="#fff"
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginRight: 0 }}
          />
        </View>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", color: "green" }}>
      <TouchableOpacity style={styles.notifyCard}>
        <Image
          style={styles.notifyImage}
          source={{
            uri: notify.image || "https://picsum.photos/200",
          }}
        />
        <View style={styles.notifyCardRight}>
          <Text
            style={{ fontSize: 18, fontWeight: "500", paddingVertical: 10 }}
          >
            {notify.title || "Thông báo"}
          </Text>
          <Text>{notify.content || "Chi tiết tin đăng"}</Text>
        </View>
        <Text style={styles.time}>
          {notify.create_at || new Date().toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailNotify;
const styles = StyleSheet.create({
  IconWrapper: {
    flexDirection: "row",
    marginHorizontal: 5,
    color: "#fff",
  },
  notifyCard: {
    flex: 1,
  },
  notifyImage: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  time: {
    color: "blue",
    textAlign: "right",
  },
  notifyCardRight: {
    marginVertical: 20,
  },
});

const fakeNotify = {
  image: "https://picsum.photos/200",
  title: "Tin máy khoan giá rẻ",
  content: "Thịnh đã thích đăng bình luận và đánh giá về sản phẩm của bạn",
  create_at: new Date().toLocaleDateString(),
};
