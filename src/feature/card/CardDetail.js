import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";

const CardDetail = (props) => {
  const { navigation } = props;
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

export default CardDetail;
