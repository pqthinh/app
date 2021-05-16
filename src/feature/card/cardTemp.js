import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
  Button
} from "react-native";
import { Icon } from "react-native-vector-icons";
import { ListItem, Left, Right, Radio, Content } from "native-base";
import styles from "./styles";
// import HomeScreen from '../home/homeScreen/HomeScreen';

const CardScreen = ({ navigation }) => {

  const [cart, setCart] = useState([
    {
      id: "PID000101",
      name: "Wired Mouse",
      company: "Logitech",
      img: "https://assets.logitech.com/assets/65019/3/mouton-boat-m90-refresh-gallery-image.png",
      quantity: 1,
      price: 299,
      perPrice: 299,
    },
    {
      id: "PID000106",
      name: "Airpods",
      company: "Apple",
      img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005",
      quantity: 1,
      price: 13999,
      perPrice: 13999,
    },
  ]);
  const [shippingMethod, setShippingMethod] = useState("Normal");

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              paddingRight: 10,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon
              name="angle-left"
              type="font-awesome"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.paymentTitle}>Payment</Text>
        <View style={styles.cartContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cartTitleView}>
              <Icon name="shopping-cart" type="font-awesome-5" />
              <Text style={styles.cartTitle}>My Cart</Text>
            </View>

            {cart.length > 0 ? (
              <View>
                {cart
                  .sort((a, b) => a.name > b.name)
                  .map((product) => (
                    <View style={styles.productView}>
                      <Image
                        style={styles.productImage}
                        source={{
                          uri: product.img,
                        }}
                      />
                      <View style={styles.productMiddleView}>
                        <Text style={styles.productTitle}>{product.name}</Text>
                        <Text style={styles.productCompanyTitle}>
                          {product.company}
                        </Text>
                      </View>
                      <View style={styles.productRightView}>
                        <Text
                          style={styles.productPriceText}
                        >{`₹${product.price}`}</Text>
                        <View style={styles.productItemCounterView}>
                          <TouchableOpacity
                            onPress={() => {
                              if (product.quantity === 1) {
                                return Alert.alert(
                                  `Remove ${product.name}?`,
                                  "",
                                  [
                                    { text: "Cancel" },
                                    {
                                      text: "Remove",
                                      onPress: () => {
                                        const newCart = cart.filter(
                                          (p) => p.id !== product.id
                                        );
                                        setCart(newCart);
                                      },
                                    },
                                  ]
                                );
                              }
                              const newProd = {
                                ...product,
                                quantity: product.quantity - 1,
                                price: product.price - product.perPrice,
                              };
                              const restProds = cart.filter(
                                (p) => p.id !== product.id
                              );
                              setCart([...restProds, newProd]);
                            }}
                          >
                            <Icon
                              style={styles.toggleCounterButton}
                              name="minus-circle"
                              type="font-awesome"
                            />
                          </TouchableOpacity>
                          <Text style={styles.counterValue}>
                            {product.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              const newProd = {
                                ...product,
                                quantity: product.quantity + 1,
                                price: product.price + product.perPrice,
                              };
                              const restProds = cart.filter(
                                (p) => p.id !== product.id
                              );
                              setCart([...restProds, newProd]);
                            }}
                          >
                            <Icon
                              style={styles.toggleCounterButton}
                              name="plus-circle"
                              type="font-awesome"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                <View style={styles.couponInputView}>
                  <TextInput
                    placeholder="Coupon Code"
                    style={styles.couponInput}
                  />
                  <TouchableOpacity style={styles.couponButton}>
                    <Text style={styles.couponButtonText}>Apply Coupon</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.subtotalView}>
                  <Text style={styles.subtotalText}>Subtotal -</Text>
                  <Text style={styles.subtotalPrice}>
                    ₹{cart.reduce((acc, val) => val.price + acc, 0)}
                  </Text>
                </View>
                <View style={styles.shippingView}>
                  <Text style={styles.shippingText}>Shipping -</Text>
                  <View style={styles.shippingItemsView}>
                    <TouchableOpacity
                      style={styles.shippingItem}
                      onPress={() => {
                        setShippingMethod("Normal");
                      }}
                    >
                      <Text style={styles.shippingItemText}>Normal (Free)</Text>
                      <Radio selected={shippingMethod === "Normal"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.shippingItem}
                      onPress={() => {
                        setShippingMethod("Express");
                      }}
                    >
                      <Text style={styles.shippingItemText}>Express (₹60)</Text>
                      <Radio selected={shippingMethod === "Express"} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.totalView}>
                  <Text style={styles.totalText}>Total -</Text>
                  {shippingMethod === "Normal" ? (
                    <Text style={styles.totalPrice}>
                      ₹{cart.reduce((acc, val) => val.price + acc, 0)}
                    </Text>
                  ) : (
                    <Text style={styles.totalPrice}>
                      ₹{cart.reduce((acc, val) => val.price + acc, 0) + 60}
                    </Text>
                  )}
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                  <Text style={styles.checkoutButtonText}>
                    Proceed to Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emptyCartView}>
                <Text style={styles.emptyCartViewText}>
                  Your cart is empty.
                </Text>
              </View>
            )}

            <View style={{ height: 100 }}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CardScreen;
