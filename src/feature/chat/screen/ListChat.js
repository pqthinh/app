import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Feather } from "react-native-vector-icons";
import axios from "axios";

const Tab = createMaterialTopTabNavigator();

const ListEmpty = () => {
  return (
    <Image
      source={{
        uri: "https://static.chotot.com/storage/chat/no-room-chat-bg.png",
      }}
      style={{
        width: "100%",
        flex: 1,
        resizeMode: "contain",
      }}
    />
  );
};

const ListContact = (props) => {
  const { navigation, listContact, route } = props;

  return (
    <View style={styles.container}>
      {listContact.length > 0 ? (
        <ScrollView style={{ width: "100%" }}>
          {listContact.map(
            (user, index) =>
              user && (
                <TouchableOpacity
                  key={index}
                  style={styles.userCard}
                  onPress={() => {
                    navigation.navigate("ChatDetail", {
                      title: `${user.name.first} ${user.name.last}`,
                      phone: user.phone,
                    });
                  }}
                >
                  <Image
                    style={styles.userImage}
                    source={{ uri: user.picture?.large }}
                  />
                  <View style={styles.userCardRight}>
                    <Text
                      style={{ fontSize: 18, fontWeight: "500" }}
                    >{`${user.name.first} ${user.name.last}`}</Text>
                    <Text>{`${user?.phone}`}</Text>
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

const ListChat = (props) => {
  const { navigation } = props;
  const [listContact, setlistContact] = useState([]);

  const getListChat = React.useCallback(async () => {
    await axios.get("https://randomuser.me/api/?results=5").then(({ data }) => {
      setlistContact(data.results);
    });
  }, [listContact.length]);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", false);
    getListChat();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Danh s??ch h???i tho???i",
      headerRight: () => <View></View>,
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
    <Tab.Navigator>
      <Tab.Screen
        name="T???t c???"
        children={() => (
          <ListContact listContact={listContact} navigation={navigation} />
        )}
      />
      <Tab.Screen
        name="Ng?????i mua"
        children={() => (
          <ListContact
            listContact={listContact.slice(0, 12)}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="Ng?????i b??n"
        children={() => (
          <ListContact
            listContact={listContact.slice(12)}
            navigation={navigation}
          />
        )}
      />
    </Tab.Navigator>
  );
};

export default ListChat;

const styles = StyleSheet.create({
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
  IconWrapper: { flexDirection: "row", marginHorizontal: 5, color: "#fff" },
});
