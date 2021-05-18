import React from "react";
import { View, StyleSheet, Linking, Alert } from "react-native";
import ChatComponent from "../../../component/chat/ChatComponent";
import { Feather } from "react-native-vector-icons";

const DetailChat = (props) => {
  const { user, navigation, route } = props;
  const { phone, title } = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title || "Tạo mới cuộc trò chuyện",
      headerRight: () => (
        <View style={styles.IconWrapper}>
          <Feather
            name="phone-call"
            size={24}
            style={styles.IconWrapper}
            onPress={() => Linking.openURL(`tel: ${phone}`)}
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
  }, [route]);

  return (
    <View style={styles.container}>
      <ChatComponent navigation={navigation} user={user} style={styles.chat} />
    </View>
  );
};
export default DetailChat;

const styles = StyleSheet.create({
  container: { flex: 1, height: "100%", justifyContent: "center" },
  chat: { flex: 1 },
  IconWrapper: { flexDirection: "row", marginHorizontal: 5, color: "#fff" },
});
