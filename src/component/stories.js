import React from "react";
import { View, Animated, Alert, Text, StyleSheet } from "react-native";
import StickyItemFlatList from "@gorhom/sticky-item";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// dummy data
const data = [...Array(20)]
  .fill(0)
  .map((_, index) => ({ id: `item-${index}` }));

// configs
const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 120;
const STICKY_ITEM_WIDTH = 50;
const STICKY_ITEM_HEIGHT = 50;
const STICKY_ITEM_BACKGROUNDS = ["#01579B", "#9CCC65"];
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
    // here you add your custom interactive animation
    // based on the animated value `x`
    flex: 1,
    justifyContent: 'center',
    margin: 0
  };

  return (
    <Animated.View style={amazingAnimation}>
      <View style={styles.itemStichkey}>
        <Text>
          Add<MaterialCommunityIcons name="dolly" color={"#fff"} size={24} />
        </Text>
        
      </View>
    </Animated.View>
  );
};

const Stories = () => {
  // methods
  const handleStickyItemPress = () => Alert.alert("Sticky Item Pressed");

  // render
  const renderItem = ({ item, index }) => (
    <View
      key={`item-${index}`}
      style={{
        backgroundColor: "#CFFBBB",
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
      }}
      children={<Text>{index}</Text>}
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

const styles = StyleSheet.create({
  itemStichkey: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: STICKY_ITEM_BACKGROUNDS[1],
    height: 50,
    borderRadius: 50
  },
});
