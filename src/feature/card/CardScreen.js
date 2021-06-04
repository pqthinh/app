import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather } from "react-native-vector-icons";

const CardScreen = (props) => {
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>Giỏ hàng</Text>
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
            onPress={() => Alert.alert("preview news")}
            color="#fff"
          />
          <Feather
            name="more-vertical"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              Alert.alert("Giỏ hàng", "Làm trống giỏ hàng", [
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
                    alert("clear data");
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
    <View style={{ flex: 1, justifyContent: "center", color: "green" }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ backgroundColor: "red" }}>
          <Text>go back</Text>
        </View>
      </TouchableOpacity>
      <Text>Thinh</Text>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  IconWrapper: {
    flexDirection: "row",
    marginHorizontal: 5,
    color: "#fff",
  },
});
