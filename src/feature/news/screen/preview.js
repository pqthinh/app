import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Feather } from "react-native-vector-icons";

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

const PreviewScreen = ({ navigation, route }) => {
  const product = route.params?.news || fakeNews;

  const [news, setNews] = useState(product);
  const _handleUploadNews = useCallback(() => {}, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>
          Xác nhận đăng tin
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
            name="shopping-bag"
            size={24}
            style={styles.IconWrapper}
            onPress={() => Alert.alert("preview news")}
            color="#fff"
          />
          <Feather
            name="more-vertical"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              console.log("more");
            }}
            color="#fff"
          />
        </View>
      ),
      headerLeft: () => (
        <View style={{ marginHorizontal: 5 }}>
          <Feather
            name="arrow-left"
            size={24}
            color="#fff"
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginRight: 0 }}
          />
        </View>
      ),
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.title}> Ảnh tin đăng: </Text>
        <View style={styles.content}>
          <View style={{ width: "100%", height: 150 }}>
            <SliderBox
              images={news.anh}
              autoplay
              circleLoop
              sliderBoxHeight={220}
              resizeMethod={"resize"}
              resizeMode={"cover"}
              paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10,
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.title}> Tiêu đề tin: </Text>
        <View style={styles.content}>
          <Text style={styles.textContent}>{news.ten}</Text>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.title}> Định giá tin: </Text>
        <View style={styles.content}>
          <Text style={styles.textContent}>{news.giaban}</Text>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.title}> Địa chỉ giao dịch: </Text>
        <View style={styles.content}>
          <Text style={styles.textContent}>{news.diadiem}</Text>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.title}> Miêu tả: </Text>
        <View style={styles.content}>
          <Text style={styles.textContent}>{news.mieuta}</Text>
        </View>
      </View>

      <View style={styles.block}>
        <TouchableOpacity
          onPress={() => _handleUploadNews(news)}
          style={styles.submit}
        >
          <Text>Đăng tin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.block}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancel}
        >
          <Text>Hủy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.space}></View>
    </ScrollView>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  block: {
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontWeight: "500",
    borderColor: "#000",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  content: {
    paddingVertical: 10,
  },
  textContent: {
    fontWeight: "700",
  },
  submit: {
    backgroundColor: "#aed581",
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
  },
  space: {
    height: 60,
  },
  cancel: {
    paddingVertical: 40,
    borderTopWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    alignItems: "center",
  },
});
