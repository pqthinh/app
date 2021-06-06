import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Feather } from "react-native-vector-icons";
import { Picker } from "@react-native-picker/picker";
import PickerCity from "../../../component/PickerCity";
import SearchComponent from "../../../component/SearchComponent";
import Helpers from "../../../utils/Constants/index";

const SearchProductScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showType, setShowType] = useState(false);
  const [listNews, setListNews] = useState([]);
  const [khuVuc, setKhuVuc] = useState("");
  const [danhmuc, setDanhmuc] = useState("");

  const handleCancel = useCallback(() => {
    console.log("huy loc");
  }, []);

  const ModalFilter = useCallback(() => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 10,
              backgroundColor: "#fff",
              justifyContent: "flex-start",
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
                  margin: 10,
                }}
                onPress={() => handleCancel()}
              >
                Bỏ lọc
              </Text>
            </View>

            <Text>hihi </Text>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }, [modalVisible]);

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

  const _renderPicker = useCallback(() => {
    const { CATEGORY } = Helpers;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          height: 40,
          width: 100,
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
            width: 100,
            fontSize: 12,
          }}
        >
          {CATEGORY.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </TouchableOpacity>
    );
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: () => {
        <SearchComponent
          value={search}
          onChangeData={setSearch}
          navigation={navigation}
          children={<Text>thinh</Text>}
        />;
      },
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

      <View style={{ flex: 1, flexDirection: "row", flexBasis: 30 }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#fff",
            width: 40,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "#000",
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: "#000", fontSize: 16 }}>
            Lọc <Feather name={"filter"} size={14} color={"#000"} />
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1, flexDirection: "row" }}>{_renderPicker()}</View>
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
