import React from "react";

import { View, Text, Button } from "react-native";

export default function HeaderTop(props) {
  const { left, mid, right } = props;
  left = (
    <View>
      <Button title="back"></Button>
    </View>
  );
  return (
    <View>
      <View>{left}</View>
      <View>{mid}</View>
      <View>{right}</View>
    </View>
  );
}
