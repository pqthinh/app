import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Feather } from "react-native-vector-icons";
import Item from "../../component/item";
import ItemFlex from "../../component/item-flex";

const CardScreen = ({ navigation }) => {
  const [listProduct, setListProduct] = useState([]);
  const [typeShow, setTypeShow] = useState(false);
  const [place, setPlace] = useState("");

  const getSummary = useCallback(() => {
    if (listProduct && listProduct.length > 0) {
      const temp = listProduct.map((item) => {
        return 1 * item.giaban;
      });
      return temp.reduce((total, num) => {
        return total * 1 + 1 * num;
      }, 0);
    }
    return 0;
  }, [listProduct]);

  const _renderListItem = useCallback(() => {
    return (
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {listProduct &&
          listProduct.map((news, index) => {
            return (
              <View
                style={typeShow ? { width: "100%" } : { width: "50%" }}
                key={index}
              >
                {typeShow && (
                  <ItemFlex news={news} key={index} navigation={navigation} />
                )}
                {!typeShow && (
                  <Item news={news} key={index} navigation={navigation} />
                )}
                <Feather
                  name="x-circle"
                  size={24}
                  color="red"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  onPress={() => removeProduct(index)}
                />
              </View>
            );
          })}
      </View>
    );
  }, [listProduct, typeShow]);

  const removeProduct = useCallback(
    (index) => {
      if (index == 0) return setListProduct([...listProduct.slice(1)]);
      return setListProduct([
        ...listProduct.splice(0, index),
        ...listProduct.splice(index),
      ]);
    },
    [listProduct]
  );

  useEffect(() => {
    setListProduct(fakeListProduct);
  }, [fakeListProduct]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>
          Giỏ hàng ({listProduct.length})
        </Text>
      ),
      headerRight: () => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name={typeShow ? "list" : "grid"}
            size={24}
            style={styles.IconWrapper}
            onPress={() => setTypeShow(!typeShow)}
            color="#fff"
          />
          <Feather
            name="more-vertical"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              Alert.alert("Giỏ hàng", "Làm trống giỏ hàng", [
                {
                  text: "Hủy",
                  onPress: () => {
                    return;
                  },
                  style: "cancel",
                },
                {
                  text: "Xác nhận",
                  onPress: () => {
                    alert("clear data");
                  },
                },
              ]);
            }}
            color="#fff"
          />
        </View>
      ),
    });
  }, [listProduct, typeShow]);

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 5,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>
      <Text
        style={{ fontWeight: "700", marginVertical: 20, marginHorizontal: 10 }}
      >
        Địa chỉ giao dịch: {"\n"}
        <Text>{place || "Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội"}</Text>
      </Text>

      <ScrollView style={{ height: 400 }}>{_renderListItem()}</ScrollView>

      <Text
        style={{ fontWeight: "700", marginVertical: 10, marginHorizontal: 10 }}
      >
        Tổng tiền: {getSummary()} VNĐ
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("", "Đi xem thêm sản phẩm", [
              {
                text: "Hủy",
                onPress: () => {
                  return;
                },
                style: "cancel",
              },
              {
                text: "Xác nhận",
                onPress: () => {
                  navigation.navigate("Home");
                },
              },
            ]);
          }}
          style={styles.submit}
        >
          <Text>Xem thêm sản phẩm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => Alert.alert("Liên hệ với người bán ...")}
          style={styles.submit}
        >
          <Text>Liên hệ người bán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  IconWrapper: {
    flexDirection: "row",
    marginHorizontal: 5,
    color: "#fff",
  },
  row: {
    marginVertical: 10,
    borderColor: "#52c7b8",
    width: "90%",
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 5,
  },
  submit: {
    backgroundColor: "#aed581",
    alignItems: "center",
    padding: 10,
  },
});

const fakeNews = {
  anh: [
    "https://picsum.photos/700",
    "https://picsum.photos/700",
    "https://picsum.photos/700",
  ],
  giaban: 1000000,
  ten: "Test product",
  diadiem: "Ha noi, Me tri ha",
  ngaydangtin: new Date(),
  ngaycapnhat: new Date(),
  user: {
    name: "thinh",
    place: "Thai Binh",
    star: "4",
    phone: "0866564502",
    avatar_url: "https://picsum.photos/200",
  },
  mieuta: `Cấu hình : SURFACE LAPTOP 3 I5/ RAM 8GB/ SSD 256GB 13INCH NEW
-CPU: Intel® Core™ Core i5
-GPU: Intel Iris Plus Graphics
-RAM: 8GB 3733MHz DDR4
-Ổ lưu trữ: 256GB removable SSD
-Kích thước: 308.1 x 223.27 x 14.48 mm
-Trọng lượng: 1283g
-Hệ điều hành: Widows 10`,
};

const fakeListProduct = [fakeNews, fakeNews, fakeNews];
