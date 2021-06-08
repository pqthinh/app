import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { withEmpty, withNumber } from "exp-value";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import RangeSlider from "react-native-range-slider-expo";
import { Feather } from "react-native-vector-icons";
import EmptyScreen from "../../../component/EmptyScreen";
import Item from "../../../component/item";
import ItemFlex from "../../../component/item-flex";
import LoadingScreen from "../../../component/modalLoading";
import PickerCity from "../../../component/PickerCity";
import SearchComponent from "../../../component/SearchComponent";
import BASE_URL from "../../../config/url";
import useDebounce from "../../../hooks/useDebounce";
import Helpers from "../../../utils/Constants/index";

var currencyFormatter = require("currency-formatter");

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

const SearchProductScreen = ({ navigation, route }) => {
  const ctg = withEmpty("params.category", route);
  const tensp = withEmpty("params.search", route);

  const [search, setSearch] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [showType, setShowType] = useState(false);
  const [listNews, setListNews] = useState([]);
  const [khuVuc, setKhuVuc] = useState("");
  const [danhmuc, setDanhmuc] = useState(ctg);

  const [fromValue, setFromValue] = useState(1000);
  const [toValue, setToValue] = useState(10000000000);

  const [sort, setSort] = useState(null);
  const [type, setType] = useState(null);

  const [checked, setChecked] = useState("first");

  const debounceValue = useDebounce(search, 3000);

  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    setSearch(e);
  };

  const _loading = useCallback(() => {
    return <LoadingScreen loading={loading} />;
  }, [loading]);

  const cleanImage = useCallback((anh) => {
    if (!anh) return ["https://picsum.photos/700"];
    return anh.split(",");
  }, []);

  const handleCleanData = useCallback((news) => {
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
    setListNews(data);
  }, []);

  const loadPost = async () => {
    setLoading(true);
    try {
      const news = await axios.get(
        `${BASE_URL.BASE_URL}/search?type=${danhmuc}&tensp=${debounceValue}`
      );
      await handleCleanData(news.data);
    } catch (e) {
      Alert.alert("Lỗi call API search");
    }

    setLoading(false);
  };

  const handleFilter = useCallback(() => {
    setLoading(true);

    setTimeout(async () => {
      setLoading(false);
      try {
        const news = await axios.get(
          `${BASE_URL.BASE_URL}/search?type=${danhmuc}&tensp=${
            debounceValue || tensp
          }&min_price=${fromValue}&max_price=${toValue}&address=${khuVuc}&sort=${sort}&loaitin=${type}`
        );
        if (withNumber("data.length", news)) await handleCleanData(news.data);
        else setListNews([]);
      } catch (e) {
        Alert.alert("Lỗi call API search");
      }
    }, 500);
  }, [type, fromValue, toValue, khuVuc, danhmuc, sort, debounceValue]);

  const handleCancel = useCallback(() => {
    setModalVisible(false);
    setKhuVuc("");
    setDanhmuc("");
    setFromValue(0);
    setToValue(10000000000);
    setSort("");
    setLoading(false);
    setType("");
  }, []);

  const ModalFilter = useCallback(() => {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              marginTop: 0,
              backgroundColor: "#fff",
            }}
          >
            <View style={styles.topFilter}>
              <Feather
                name={"x"}
                size={30}
                color={"#000"}
                onPress={() => setModalVisible(false)}
              />
              <Text>Lọc tin đăng</Text>
              <Text
                style={{
                  backgroundColor: "#e0ffb1",
                  color: "#000",
                  padding: 10,
                  borderRadius: 5,
                  marginHorizontal: 20,
                }}
                onPress={() => handleCancel()}
              >
                Bỏ lọc
              </Text>
            </View>

            {renderPrice()}

            {renderPickerType()}

            <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
              <View
                style={[
                  styles.itemRowFilter,
                  { marginVertical: 10, marginHorizontal: 0 },
                ]}
              >
                <Text> Đồ cho tặng, miễn phí</Text>
                <Checkbox.Item label="" status="" />
              </View>

              <Text style={styles.blockFilter}>Sắp xếp theo:</Text>

              <View style={styles.itemRowFilter}>
                <Text> Tin mới trước</Text>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                />
              </View>
              <View style={styles.itemRowFilter}>
                <Text> Giá rẻ trước</Text>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonClose,
                { marginVertical: 100, marginHorizontal: 40 },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Đóng</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
      </View>
    );
  }, [modalVisible]);

  const _renderGroupItem = useCallback(() => {
    if (loading) return <EmptyScreen />;
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
  }, [listNews, showType, loading]);

  const _renderPicker = useCallback(() => {
    const { CATEGORY } = Helpers;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          height: 40,
          width: 200,
          alignItems: "center",
          margin: 10,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: "#000",
          backgroundColor: "#fff",
        }}
      >
        <Picker
          selectedValue={danhmuc}
          onValueChange={(itemValue, itemIndex) => setDanhmuc(itemValue)}
          style={{
            height: 40,
            width: 200,
            fontSize: 12,
            marginHorizontal: 10,
          }}
        >
          {CATEGORY.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </TouchableOpacity>
    );
  }, []);

  const renderPickerType = useCallback(() => {
    if (!modalVisible) return;
    const TYPE = [
      { label: "Cần mua", value: "Cần mua" },
      { label: "Cần bán", value: "Cần bán" },
    ];

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: 20,
          marginTop: -20,
        }}
      >
        <Text>Loại tin đăng: </Text>
        <TouchableOpacity
          style={{
            margin: 10,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "#000",
          }}
        >
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            style={{
              height: 40,
              width: 200,
              fontSize: 12,
              marginHorizontal: 10,
            }}
          >
            {TYPE.map((item, index) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              );
            })}
          </Picker>
        </TouchableOpacity>
      </View>
    );
  }, [type, modalVisible]);

  const renderPrice = useCallback(() => {
    if (!modalVisible) return;
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginVertical: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "500", marginHorizontal: 10 }}>
          {`Giá từ: ${currencyFormatter.format(fromValue, {
            code: "VND",
          })} đến ${currencyFormatter.format(toValue, { code: "VND" })}`}
        </Text>
        <RangeSlider
          min={0}
          max={1000000000}
          step={10000000}
          styleSize="small"
          fromValueOnChange={(value) => setFromValue(value)}
          toValueOnChange={(value) => setToValue(value)}
          initialFromValue={100000}
          showValueLabels={false}
          showRangeLabels={false}
        />
      </View>
    );
  }, [modalVisible]);

  useEffect(() => {
    if (withNumber("length", listNews) <= 0) setListNews(fakeData);
  }, [fakeData]);

  useEffect(() => {
    handleFilter();
  }, [type, debounceValue, fromValue, toValue, khuVuc, danhmuc, sort]);

  const renderSearch = useCallback(() => {
    return (
      <TouchableOpacity>
        <SearchComponent
          placeholder={tensp}
          value={search}
          onChangeText={(e) => handleSearch(e)}
          navigation={navigation}
          children={<Feather name={"bookmark"} size={24} />}
        />
      </TouchableOpacity>
    );
  }, [search]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => renderSearch(),
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
            name="home"
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              Alert.alert("Xác nhận chuyển trang", "Bạn muốn hủy tìm kiếm", [
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
            color={"#fff"}
          />
        </View>
      ),
    });
  }, [search]);

  return (
    <ScrollView style={{ paddingHorizontal: 0 }}>
      {/* Filter */}
      {modalVisible && ModalFilter()}
      {_loading()}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          height: 40,
          width: "100%",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Feather name={"map-pin"} size={24} style={{ marginHorizontal: 10 }} />
        <Text>Khu vực: </Text>
        <PickerCity
          khuVuc={khuVuc}
          setKhuVuc={setKhuVuc}
          style={{
            height: 40,
            backgroundColor: "#fff",
            width: 200,
            marginHorizontal: 10,
            borderRadius: 5,
          }}
        />
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: "#fff",
            width: 60,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "#000",
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 5,
            paddingHorizontal: 0,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 16,
              flex: 1,
              flexDirection: "row",
            }}
          >
            Lọc <Feather name={"filter"} size={14} color={"#000"} />
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1, flexDirection: "row", width: 200 }}>
          {_renderPicker()}
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text
            style={{
              flex: 1,
              backgroundColor: "#fff",
              width: 60,
              fontSize: 16,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#000",
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}
          >
            Giá +
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ backgroundColor: "#fff", marginVertical: 10 }}>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: "500" }}>
              Kết quả tìm kiếm
            </Text>
            {_renderGroupItem()}
          </View>
          <Feather
            name={showType ? "list" : "grid"}
            size={24}
            style={[
              styles.IconWrapper,
              { position: "absolute", top: 20, right: 0, color: "#000" },
            ]}
            onPress={() => setShowType(!showType)}
            color="#000"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchProductScreen;

const styles = StyleSheet.create({
  IconWrapper: {
    flexDirection: "row",
    marginHorizontal: 5,
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "baseline",
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  ListProduct: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: "center",
  },
  topFilter: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  itemRowFilter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blockFilter: {
    textTransform: "uppercase",
    fontWeight: "700",
    color: "#000",
    marginVertical: 15,
  },
});
