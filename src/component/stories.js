import React from "react";
import { View, Animated } from "react-native";
import StickyItemFlatList from "@gorhom/sticky-item";

// dummy data
const data = [...Array(20)]
  .fill(0)
  .map((_, index) => ({ id: `item-${index}` }));

// configs
const ITEM_WIDTH = 90;
const ITEM_HEIGHT = 150;
const STICKY_ITEM_WIDTH = 24;
const STICKY_ITEM_HEIGHT = 24;
const STICKY_ITEM_BACKGROUNDS = ["#222", "#000"];
const SEPARATOR_SIZE = 8;
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
    // here you add your custom interactive animation
    // based on the animated value `x`
  };

  return <Animated.View style={amazingAnimation} />;
};

const Stories = () => {
  // methods
  const handleStickyItemPress = () => Alert.alert("Sticky Item Pressed");

  // render
  const renderItem = ({ item, index }) => (
    <View
      key={`item-${index}`}
      style={{
        backgroundColor: "#f0f0f0",
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
      }}
    />
  );
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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
