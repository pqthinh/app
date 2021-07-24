import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "react-native-vector-icons";
import { connect } from "react-redux";
import { getProduct, getStory } from "../redux/action";
import Banner from "../../../component/banner";
import CategoryComponent from "../../../component/category";
import Item from "../../../component/item";
import ItemFlex from "../../../component/item-flex";
import Stories from "../../../component/stories";
import styles from "../style";
import CONFIG_URL from "../../../config/url";
import { Alert } from "react-native";
import { withArray, withEmpty, withNumber } from "exp-value";
import LoadingScreen from "../../../component/modalLoading";

const fakeNews = {
  anh: [
    "https://picsum.photos/700",
    "https://picsum.photos/700",
    "https://picsum.photos/700",
  ],
  giaban: 1000000,
  ten: "Test product",
  diadiem: "Ha noi, Me tri ha",
  ngaydangtin: "01/06/2021",
  user: {
    name: "thinh",
    place: "Thai Binh",
  },
  mieuta: "abc",
};

const fakeData = [fakeNews, fakeNews, fakeNews, fakeNews, fakeNews, fakeNews];

const HomeScreen = ({ user, navigation }) => {
  const { BASE_URL } = CONFIG_URL;
  const [listNews, setListNews] = useState([]);
  const [showType, setShowType] = useState(false);
  const [listStory, setListStory] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const _renderGroupItem = useCallback(() => {
    return (
      <View style={styles.ListProduct}>
        {listNews.length > 0 ? (
          listNews?.map((news, index) => {
            if (!showType)
              return (
                <Item key={index} newsPost={news} navigation={navigation} />
              );
            return (
              <ItemFlex key={index} newsPost={news} navigation={navigation} />
            );
          })
        ) : (
          <Text>Danh mục rỗng</Text>
        )}
      </View>
    );
  }, [listNews, showType]);

  const _loading = useCallback(() => {
    return <LoadingScreen loading={loading} />;
  }, [loading]);

  const cleanImage = useCallback((anh) => {
    if (!anh) return ["https://picsum.photos/700"];
    return anh.split(",");
  }, []);

  const handleCleanData = useCallback(
    (news) => {
      if (withNumber("length", news) <= 0) return [];

      const data = news.map((item, index) => {
        const user = {
          name: withEmpty("name", item),
          avatar_url: withEmpty("avatar", item),
          phone: withEmpty("mobile", item),
          star: "4",
          place: withEmpty("diadiem", item),
          follower: withEmpty("follower", item),
          following: withEmpty("following", item),
          email: withEmpty("email", item),
        };

        const anh = cleanImage(withEmpty("anh", item));
        return {
          anh: anh,
          giaban: withNumber("giaban", item),
          ten: withEmpty("ten", item),
          diadiem: withEmpty("diadiem", item),
          ngaydangtin: withEmpty("ngaydangtin", item),
          mieuta: withEmpty("describe", item),
          user: user,
        };
      });
      setNews(data);
    },
    [news]
  );

  const getProductList = async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${BASE_URL}/tindang`);

      if (data) handleCleanData(data.data);
    } catch (e) {
      Alert.alert("Lỗi call API lấy danh sách tin đăng mới");
    }

    setLoading(false);
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    if (withNumber("length", news) > 0) return setListNews(news);
    return setListNews(fakeData);
  }, [news, fakeData]);

  return (
    <ScrollView>
      {_loading()}
      <Banner />
      <Stories navigation={navigation} newspost={listNews.slice(0, 5)} />
      <CategoryComponent navigation={navigation} />

      <View style={stylesCustomize.container}>
        <View style={{ backgroundColor: "#fff", marginVertical: 10 }}>
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "500" }}>
            Tin đăng mới
          </Text>
          {_renderGroupItem()}
        </View>
        <Feather
          name={showType ? "list" : "grid"}
          size={24}
          style={stylesCustomize.IconWrapper}
          onPress={() => setShowType(!showType)}
          color="#000"
        />
      </View>

      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default connect(
  (state) => ({
    user: state.userReducer.user,
  }),
  { getProduct, getStory }
)(HomeScreen);

const stylesCustomize = StyleSheet.create({
  container: {
    flex: 1,
  },
  IconWrapper: {
    position: "absolute",
    top: 20,
    right: 10,
  },
});
