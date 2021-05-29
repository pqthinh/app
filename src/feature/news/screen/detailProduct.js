import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import Constants from "expo-constants";
import { Feather as Icon, FontAwesome as FAIcon } from "@expo/vector-icons";

const Rating = ({ rating, maxRating }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array(rating)
        .fill(1)
        .map((el) => (
          <FAIcon name="star" size={20} color="#2e2e2e" key={el} />
        ))}
      {Array(maxRating - rating)
        .fill(1)
        .map((el) => (
          <FAIcon name="star-o" size={20} color="#2e2e2e" key={el} />
        ))}
    </View>
  );
};

export default function DetailProduct() {
  const [isFavorite, setFavorite] = useState(false);
  const [size] = useState([
    { id: 1, label: "S" },
    { id: 1, label: "M" },
    { id: 1, label: "L" },
    { id: 1, label: "XL" },
  ]);

  const [selectedSize, setSelectedSize] = useState("M");

  const [productDescription] = useState(`test .`.repeat(200));

  const [seeFullDescription, setSeeFullDescription] = useState(false);

  const [moreProducts] = useState([
    {
      productName: "Black Printed Tshirt",
      productPrice: 19.49,
      productImage:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60",
    },
    {
      productName: "Black Printed Top (Women)",
      productPrice: 19.49,
      productImage:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=90",
    },
    {
      productName: "White Solid Tshirt",
      productPrice: 34.99,
      productImage:
        "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60",
    },
    {
      productName: "Black Solid Tshirt",
      productPrice: 34.99,
      productImage:
        "https://images.unsplash.com/photo-1512327428889-607eeb19efe8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60",
    },
    {
      productName: "Red Top (Women)",
      productPrice: 44.85,
      productImage:
        "https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60",
    },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Icon name="menu" size={30} />
        <Text style={styles.headerTitle}>Shop</Text>
        <Icon name="shopping-bag" size={26} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    borderBottomColor: "#dfe4fe",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
  },
  detailsView: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  productTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 24,
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPriceText: { fontSize: 20 },
  actualPriceText: {
    color: "#222",
    marginLeft: 10,
    textDecorationLine: "line-through",
    fontSize: 18,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#111",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#111",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  tag: {
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabel: {
    color: "#333",
  },
  tagSelected: {
    backgroundColor: "#333",
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabelSelected: {
    color: "#FFF",
  },
  productDescriptionHeader: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#dfe4fe",
  },
  moreProductImageView: {
    flex: 1,
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 4,
    overflow: "hidden",
  },
  moreProductName: {
    fontSize: 16,
  },
  moreProductPriceView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  moreProductPrice: {
    fontSize: 16,
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductBuyButton: {
    backgroundColor: "#111",
    marginTop: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  moreProductBuyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
