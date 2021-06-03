import React from "react";
import { View, Text, ScrollView } from "react-native";

const SearchProductScreen = ({ navigation }) => {
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
