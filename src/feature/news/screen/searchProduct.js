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
import SearchComponent from "../../../component/SearchComponent";

const SearchProductScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showType, setShowType] = useState(false);
  const [listNews, setListNews] = useState([]);

  const ModalFilter = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
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
  };

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
    <View style={{ paddingHorizontal: 0 }}>
      {/* Filter */}
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity>
      {modalVisible && <ModalFilter />}

      <View>
        <Text>Khu vực</Text>
        <Text>Render khu vuc</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text>
          Lọc <Feather name={"filter"} size={30} color={"#000"} />
        </Text>
        <Text>Danh mục</Text>

        <View>
          <Text style={{ backgroundColor: "#f0f0f0", padding: 10 }}>Giá +</Text>
        </View>
      </View>

      {/* Result */}
      <ScrollView>
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
      </ScrollView>
    </View>
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
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fff",
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
});
