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

const HomeScreen = ({ user, navigation, getProduct, getStory, news }) => {
  const [listNews, setListNews] = useState([]);
  const [showType, setShowType] = useState(false);
  const [listStory, setListStory] = useState([]);

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

  useEffect(() => {
    getProduct();
  }, [news]);

  useEffect(() => {
    setListNews(fakeData);
  }, [fakeData]);

  return (
    <ScrollView>
      <Banner />
      <Stories navigation={navigation} listStory={listStory.slice(0, 10)} />
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
    isLoggedIn: !state.userReducer.userLoading,
    news: state.newsReducer.news,
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
