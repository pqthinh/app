import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  Avatar,
  Caption,
  Divider,
  List,
  Paragraph,
  Title,
} from "react-native-paper";
import { Feather } from "react-native-vector-icons";
import { connect } from "react-redux";
import EmptyScreen from "../../component/EmptyScreen";
import ItemFlex from "../../component/item-flex";
import { BASE_URL } from "../../config/url";

const ProfileScreen = ({ navigation, user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>Trang cá nhân</Text>
      ),
      headerRight: () => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name="heart"
            size={24}
            style={styles.IconWrapper}
            onPress={() =>
              Alert.alert("", "Theo dõi người này", [
                {
                  text: "Hủy",
                  onPress: () => {
                    return;
                  },
                  style: "cancel",
                },
                {
                  text: "Xác nhận",
                  onPress: () => {
                    Alert.alert("Đã theo dõi");
                  },
                },
              ])
            }
            color="#fff"
          />
          <Feather
            name="more-vertical"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              console.log("more");
            }}
            color="#fff"
          />
        </View>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: currentUser.avatar || "https://picsum.photos/200",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{currentUser.name}</Title>
                <Caption style={styles.caption}>{currentUser.email}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {currentUser.following || 20}
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {currentUser.follower || 10}
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", marginHorizontal: 10 },
              ]}
            >
              <Text
                style={styles.buttontext}
                onPress={() =>
                  navigation.navigate("UpdateProfile", {
                    user: currentUser,
                  })
                }
              >
                Chỉnh sửa thông tin
              </Text>
              <Feather
                name="more-vertical"
                size={24}
                color="black"
                style={{ marginLeft: 100 }}
              />
            </View>
          </View>
        </List.Section>
        <Divider />

        <List.Section>
          <List.Subheader>Tin đang bán</List.Subheader>
          <TinDangBan />
        </List.Section>
      </ScrollView>
    </View>
  );
};

const TinDangBan = ({ navigation }) => {
  const [newsposted, setNewsposted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // fetch data tin da lưu
  useEffect(() => {
    if (!newsposted) setNewsposted([]);

    if (typeof newsposted.length === "undefined" || !newsposted.length) {
      loadPost();
    }
  }, [currentUser]);

  const loadPost = async () => {
    setLoading(true);

    if (
      currentUser &&
      typeof currentUser !== "undefined" &&
      typeof currentUser.id !== "undefined"
    ) {
      const news = await axios.get(
        `${BASE_URL}/search?owner=${currentUser ? currentUser.id : 5}&state=2`
      );
      setNewsposted(news.data);
      console.log("Tin đang bán: " + news.data.length);
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: "bold", margin: 10 }}>
        Tất cả các tin đã đăng bán
      </Text>
      {loading ? (
        <EmptyScreen />
      ) : (
        <ScrollView>
          <View style={{ marginHorizontal: 10 }}>
            {newsposted === "undefined" ||
            newsposted.length == 0 ||
            typeof newsposted.length === "undefined" ? (
              <Text>Danh mục trống</Text>
            ) : (
              newsposted?.map((x) => (
                <TouchableOpacity
                  key={x.id}
                  onPress={() => navigation.navigate("Details", { news: x })}
                >
                  <ItemFlex news={x} />
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default connect(
  (state) => ({
    user: state.userReducer.user,
  }),
  {}
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#009387",
    textAlignVertical: "center",
  },
  user: {
    fontSize: 24,
    fontWeight: "500",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  edit: {
    color: "red",
    textAlign: "center",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  buttontext: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#05375a",
  },
});
