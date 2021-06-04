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
import axios from "axios";

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
                  onPress={() => {}}
                >
                  <Image
                    style={styles.notifyImage}
                    source={{ uri: notify.picture?.large }}
                  />
                  <View style={styles.notifyCardRight}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {"thong bao"}
                    </Text>
                    <Text>{`chi tiet`}</Text>
                  </View>
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

const ListNotify = (props) => {
  const { navigation } = props;
  const [listNotify, setListNotify] = useState([]);
  const [listNews, setListNews] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>Thông báo</Text>
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

export default ListNotify;

const styles = StyleSheet.create({
  IconWrapper: {
    flexDirection: "row",
    marginHorizontal: 5,
    color: "#fff",
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
});

const fakeNotify = [
  {
    image: "",
    title: "",
    content: "",
    create_at: new Date(),
  },
];
