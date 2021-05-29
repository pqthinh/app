import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  List,
  Avatar,
  Divider,
  Paragraph,
  Title,
  Caption,
} from "react-native-paper";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../../config/url";
import EmptyScreen from "../../component/EmptyScreen";
import ItemFlex from "../../component/item-flex";

const ProfileScreen = ({ navigation, user }) => {
  const [currentUser, setCurrentUser] = useState(user);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={24}
          color="black"
          onPress={() => {
            navigation.navigate("Explore");
          }}
        />
        <Text style={{ fontSize: 16 }}>{currentUser.name}</Text>
        <MaterialCommunityIcons
          size={24}
          name="backspace-outline"
          color="black"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>

      <ScrollView>
        <List.Section>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    currentUser.avatar ||
                    "https://api.adorable.io/avatars/50/abott@adorable.png",
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
                  {currentUser.following}
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {currentUser.follower}
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <Text
                style={styles.buttontext}
                onPress={() =>
                  navigation.navigate("EditInfor", {
                    id: currentUser.id,
                    password: currentUser.password,
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
