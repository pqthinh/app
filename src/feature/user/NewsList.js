import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Feather } from "react-native-vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const ListEmpty = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
      <Text>Chưa có hoạt động được ghi lại</Text>
      <Image
        source={{
          uri: "https://s22908.pcdn.co/internet-privacy/wp-content/uploads/sites/2/2015/05/no-activity.png",
        }}
        style={{
          width: "100%",
          flex: 1,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

const ListNotifyTabComponent = (props) => {
  const { navigation, listNotify, route } = props;

  return (
    <View style={styles.container}>
      {listNotify.length > 0 ? (
        <ScrollView style={{ width: "100%" }}>
          {listNotify.map(
            (notify, index) =>
              notify && (
                <TouchableOpacity
                  key={index}
                  style={styles.notifyCard}
                  onPress={() => {
                    navigation.navigate("DetailsNotify", {
                      screen: "DetailsNotify",
                      notify: notify,
                    });
                  }}
                >
                  <Image
                    style={styles.notifyImage}
                    source={{
                      uri: notify.image || "https://picsum.photos/200",
                    }}
                  />
                  <View style={styles.notifyCardRight}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {notify.title || "Thông báo"}
                    </Text>
                    <Text>{notify.content || "Chi tiết tin đăng"}</Text>
                  </View>
                  <Text style={styles.time}>
                    {notify.create_at || new Date().toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              )
          )}
          <View style={{ height: 50 }}></View>
        </ScrollView>
      ) : (
        <ListEmpty />
      )}
    </View>
  );
};

const ListProductManagement = (props) => {
  const { navigation } = props;
  const [listNotify, setListNotify] = useState([]);
  const [listNews, setListNews] = useState([]);

  useEffect(() => {
    setListNotify(fakeNotify);
    setListNews([]);
  }, [fakeNotify]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>
          Quản lý sản phẩm
        </Text>
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
            name="list"
            size={24}
            style={styles.IconWrapper}
            onPress={() => Alert.alert("Change view")}
            color="#fff"
          />
          <Feather
            name="more-vertical"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              Alert.alert("Thông báo", "Đánh dấu đọc tất cả", [
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
                    alert("read all");
                  },
                },
              ]);
            }}
            color="#fff"
          />
        </View>
      ),
    });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Thông báo"
        children={() => (
          <ListNotifyTabComponent
            listNotify={listNotify}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="Tin tức"
        children={() => (
          <ListNotifyTabComponent
            listNotify={listNews}
            navigation={navigation}
          />
        )}
      />
    </Tab.Navigator>
  );
};

export default ListProductManagement;

const styles = StyleSheet.create({
  IconWrapper: {
    flexDirection: "row",
    marginHorizontal: 5,
    color: "#fff",
  },
  notifyCard: {
    flex: 1,
    marginVertical: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  notifyImage: {
    height: 150,
    width: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
    width: "100%",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
  userCard: {
    backgroundColor: "#fafafa",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userCardRight: {
    paddingHorizontal: 10,
  },
  time: {
    color: "blue",
    textAlign: "right",
  },
});

const fakeNotify = [
  {
    image: "https://picsum.photos/200",
    title: "Hoạt động",
    content: "Thịnh đã thích tin đăng của bạn",
    create_at: new Date().toLocaleDateString(),
  },
  {
    image: "https://picsum.photos/200",
    title: "Tin máy khoan giá rẻ",
    content: "Thịnh đã thích tin đăng của bạn",
    create_at: new Date().toLocaleDateString(),
  },
  {
    image: "https://picsum.photos/200",
    title: "Tin máy khoan giá rẻ",
    content: "Thịnh đã thích đăng bình luận và đánh giá về sản phẩm của bạn",
    create_at: new Date().toLocaleDateString(),
  },
];
