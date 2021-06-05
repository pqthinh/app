import React from "react";
import { View, Animated, Alert, Text } from "react-native";
import StickyItemFlatList from "@gorhom/sticky-item";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style";
import StoryItem from "./story";

// dummy data
const data = [...Array(20)].map((_, index) => ({
  id: `item-${index}`,
  user: {
    name: "thinh",
    avatar:
      "https://image.shutterstock.com/image-vector/merchandise-line-icons-signs-set-600w-1371727865.jpg",
  },
  news: {
    img: "https://image.shutterstock.com/image-vector/merchandise-line-icons-signs-set-600w-1371727865.jpg",
    name: "bans buon",
  },
}));

// configs
const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 120;
const STICKY_ITEM_WIDTH = 50;
const STICKY_ITEM_HEIGHT = 50;
const STICKY_ITEM_BACKGROUNDS = ["#CFFBBB", "#9CCC65"];
const SEPARATOR_SIZE = 10;
const BORDER_RADIUS = 10;

const StickyItemView = ({
  x,
  threshold,
  itemWidth,
  itemHeight,
  stickyItemWidth,
  stickyItemHeight,
  separatorSize,
  isRTL,
}) => {
  const amazingAnimation = {
    flex: 1,
    justifyContent: "center",
    margin: 0,
  };

  return (
    <Animated.View style={amazingAnimation}>
      <View style={styles.itemSticky}>
        <Text>
          <MaterialCommunityIcons name="dolly" color={"#fff"} size={24} />
        </Text>
      </View>
    </Animated.View>
  );
};

const Stories = ({ navigation }) => {
  const handleStickyItemPress = () => {
    Alert.alert("Tạo tin đăng", "Đi đến trang đăng tin", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Go",
        onPress: () => {
          console.log("Sticky Item Pressed");
          navigation.navigate("PostNews");
        },
      },
    ]);
  };

  // render
  const renderItem = ({ item, index }) => (
    <View
      key={`item-${index}`}
      style={{
        backgroundColor: "#CFFBBB",
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
      }}
      children={<StoryItem item={item} navigation={navigation} />}
    />
  );
  return (
    <View style={{ flex: 1, justifyContent: "center", marginVertical: 10 }}>
      <StickyItemFlatList
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        separatorSize={SEPARATOR_SIZE}
        borderRadius={BORDER_RADIUS}
        stickyItemWidth={STICKY_ITEM_WIDTH}
        stickyItemHeight={STICKY_ITEM_HEIGHT}
        stickyItemBackgroundColors={STICKY_ITEM_BACKGROUNDS}
        stickyItemContent={StickyItemView}
        onStickyItemPress={handleStickyItemPress}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Stories;
