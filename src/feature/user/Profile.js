import React from "react";
import { View, Text } from "react-native";
import HeaderTop from "../../component/headerTop";

const ProfileScreen = (props) => {
  return (
    <View>
      <HeaderTop
        left={
          <View>
            <Text>Thinh</Text>
          </View>
        }
        mid={<Text>abc</Text>}
      />
    </View>
  );
};

export default ProfileScreen;
