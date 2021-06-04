import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Feather } from "react-native-vector-icons";

const SearchComponent = (props) => {
  const { navigation, value, onChangeData, children, ...other } = props;
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Feather name="search" size={24} color="#000" />
      </View>
      <TextInput
        placeholder="Tìm kiếm sản phẩm"
        placeholderTextColor="#000"
        style={styles.searchInput}
        onChangeText={(value) => onChangeData(value)}
        value={value}
      />
      {children}
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#e0ffb1",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginLeft: 0,
    borderRadius: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  searchInput: {
    fontSize: 14,
  },
});
