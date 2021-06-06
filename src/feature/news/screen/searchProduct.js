import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { withEmpty } from "exp-value";
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
import { Feather } from "react-native-vector-icons";
import RangeSlider from "react-native-range-slider-expo";
import EmptyScreen from "../../../component/EmptyScreen";
import Item from "../../../component/item";
import ItemFlex from "../../../component/item-flex";
import PickerCity from "../../../component/PickerCity";
import SearchComponent from "../../../component/SearchComponent";
import { BASE_URL } from "../../../config/url";
import Helpers from "../../../utils/Constants/index";

var currencyFormatter = require("currency-formatter");
const API = axios.create({
  baseURL: BASE_URL,

  timeout: 1000,

  headers: {
    "X-CSRF-Token": "Beaer thinh_faketoken",
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
  const tensp = withEmpty("params.dataQuery", route);

  const [search, setSearch] = useState("");

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

  const [loading, setLoading] = useState(false);

  const loadPost = async () => {
    setLoading(true);
    // const news = await axios.get({
    //   url: `/search?type=${danhmuc}&tensp=${tensp}`,
    //   timeout: 1000,
    //   baseURL: BASE_URL,
    // });
    // await setNewsposted(news.data);
    setLoading(false);
  };

  const handleFilter = async () => {
    setLoading(true);
    const news = await axios.get(
      `${BASE_URL}/search?type=${danhmuc}&tensp=${tensp}&min_price=${fromValue}&max_price=${toValue}&address=${khuVuc}&sort=${sort}&loaitin=${type}`,
      { API }
    );

    await setNewsposted(news.data);
    setLoading(false);
  };

  const handleCancel = useCallback(() => {
    setModalVisible(false);
    setKhuVuc("");
    setDanhmuc("");
    setFromValue(0);
    setToValue(10000000000);
    setSort(null);
    setLoading(false);
    setType(null);
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

            <View>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
              />
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
              />
            </View>

            <View>
              <Checkbox.Item label="Item" status="checked" />
            </View>

            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
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
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </TouchableOpacity>
    );
  }, [type]);

  const renderPrice = useCallback(() => {
    if (!modalVisible) return;
    return (
      <View>
        <Text>
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
  }, [fromValue, toValue, modalVisible]);

  useEffect(() => {
    setListNews(fakeData);
  }, [fakeData]);

  // fetch form search
  useEffect(() => {
    loadPost();
  }, []);

  useEffect(() => {
    // handleFilter();
  }, [type, fromValue, toValue, khuVuc, danhmuc, sort]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity>
          <SearchComponent
            value={search}
            onChangeData={setSearch}
            navigation={navigation}
            children={<Feather name={"bookmark"} size={24} />}
          />
        </TouchableOpacity>
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
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: 0 }}>
      {/* Filter */}
      {modalVisible && ModalFilter()}

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
        <TouchableOpacity>
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

      {/* Result */}
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
});
