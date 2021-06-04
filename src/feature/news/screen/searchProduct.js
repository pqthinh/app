import React from "react";
import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import { Feather } from "react-native-vector-icons";
import SearchComponent from "../../../component/SearchComponent";

const SearchProductScreen = ({ navigation, route }) => {
  console.log(route, "route -----------------");
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: () => {
        <SearchComponent
          value={search}
          onChangeData={setSearch}
          navigation={navigation}
          children={<Text>thinh</Text>}
        />;
      },
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
            name="home"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              Alert.alert("Xác nhận chuyển trang", "Bạn muốn hủy tìm kiếm", [
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
                    navigation.navigate("Home");
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
    <View>
      <Text> Search screen</Text>
      <ScrollView>
        <View>
          <Text>Filter</Text>
        </View>

        <View>
          <Text>Products</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchProductScreen;

const styles = StyleSheet.create({
  IconWrapper: {
    flexDirection: "row",
    marginHorizontal: 5,
    color: "#fff",
  },
});
