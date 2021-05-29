import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  View,
  Platform,
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import { Feather, Octicons, MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { connect } from "react-redux";
import Helpers from "../../../utils/Constants/index";

const WIDTH = Dimensions.get("window").width;

const PostNewsScreen = (props) => {
  const { navigation, user } = props;
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState([]);

  //  Thông tin cần post leen server //

  const [theloai, setTheloai] = useState("Cần bán");
  const [danhmuc, setDanhmuc] = useState("Bất động sản");

  // const [tenMatHang, setTenMatHang] = useState('')
  const [tinh, setTinh] = useState("Hà Nội");
  const [huyen, setHuyen] = useState("Nam Từ Liêm");
  const [xa, setXa] = useState("Mễ Trì Hạ");
  // Địa điểm khi post thì concat ---- tinh/ huyen / xa ---- //

  const [giaban, setGiaban] = useState(null);
  const [tieude, setTieude] = useState(null);
  const [mieuta, setMieuta] = useState(null);

  const news = {
    idnguoiban: user.id || 5,
    loaitin: theloai,
    tendanhmuc: danhmuc,
    diadiem: xa + ", " + huyen + ", " + tinh,
    giaban: giaban,
    ten: tieude,
    mieuta: mieuta,
    anh: img,
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.cancelled) {
      setImage([...image, result]);
    }
  };
  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  };

  const storageFireBase = async (images) => {
    images &&
      images?.map((image) => {
        setIsLoading(true);
        if (Platform.OS == "android") {
          let name = image.uri.split("/").pop();
          uploadImage(image.uri, name)
            .then(() => {
              Alert.alert("Success, upload image");
              getURL(name);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  };

  const getURL = (name) => {
    console.log(name, "name image");
    firebase
      .storage()
      .ref()
      .child("images/" + name)
      .getDownloadURL()
      .then((url) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        setImg([...img, url]);
        console.log(url, "link img");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _renderPicker = useCallback(() => {
    const { CATEGORY } = Helpers;
    return (
      <TouchableOpacity
        style={[styles.row, styles.touchInput, styles.singleline]}
      >
        <Text>Chọn danh mục tin: </Text>
        <Picker
          selectedValue={danhmuc}
          onValueChange={(itemValue, itemIndex) => setDanhmuc(itemValue)}
          style={{ height: 40, width: "60%", fontSize: 12 }}
        >
          {CATEGORY.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </TouchableOpacity>
    );
  }, []);

  const _renderImage = useCallback(
    (image) => {
      return (
        <View style={styles.imagePost}>
          {image?.map((x, index) => (
            <View style={{ position: "relative" }} key={index}>
              <Image
                key={x.id}
                source={{ uri: x.uri }}
                style={{
                  width: (WIDTH - 100) / 2,
                  height: (WIDTH - 100) / 2,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              />
              <Feather
                name="x-circle"
                size={24}
                color="red"
                style={{ position: "absolute", top: 0, right: 0 }}
                onPress={() => removeImage(index)}
              />
            </View>
          ))}
        </View>
      );
    },
    [image]
  );

  const removeImage = useCallback(
    (index) => {
      let images = image;
      images.splice(index, 1);
      setImage(images);
    },
    [image]
  );

  const uploadNews = useCallback(async () => {
    await storageFireBase(image);
    if (img?.length > 0) {
      console.log(news);
      // storage to mysql
    }
  }, [news]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={{ fontWeight: "bold", color: "#fff" }}>
          Tạo tin đăng bán
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
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <TouchableOpacity
            style={[styles.row, styles.touchInput, styles.singleline]}
          >
            <Text>Loại tin đăng: </Text>
            <Picker
              selectedValue={theloai}
              onValueChange={(itemValue) => setTheloai(itemValue)}
              style={{ height: 40, width: "60%", fontSize: 12 }}
            >
              <Picker.Item label="Cần bán" value="Cần bán" />
              <Picker.Item label="Cần mua" value="Cần mua" />
            </Picker>
          </TouchableOpacity>

          {_renderPicker()}

          <TextInput
            label="Thành phố /Tỉnh: "
            value={tinh}
            style={[styles.singleline, styles.row]}
            onChangeText={(text) => setTinh(text)}
          />
          <TextInput
            label="Quận /Huyện: "
            value={huyen}
            style={[styles.singleline, styles.row]}
            onChangeText={(text) => setHuyen(text)}
          />
          <TextInput
            label="Phường /Xã: "
            value={xa}
            style={[styles.singleline, styles.row]}
            onChangeText={(text) => setXa(text)}
          />

          <View style={styles.uploadimage}>
            <Text style={{ margin: 10 }}>Chọn ảnh mẫu:</Text>
            <MaterialIcons
              onPress={() => {
                pickImage();
              }}
              name="add-a-photo"
              size={60}
              color="black"
              style={{ margin: 10 }}
            />
            {_renderImage(image)}
          </View>

          <TextInput
            label="Chọn tiêu đề: "
            value={tieude}
            style={[styles.singleline, styles.row]}
            onChangeText={(text) => setTieude(text)}
            underlineColorAndroid={"transparent"}
          />

          <TextInput
            label="Định giá tin đăng: "
            value={giaban}
            style={[styles.singleline, styles.row]}
            onChangeText={(text) => setGiaban(text)}
            underlineColorAndroid={"transparent"}
          />
          <TextInput
            multiline
            style={[styles.multiline, styles.row]}
            value={mieuta}
            onChangeText={(text) => setMieuta(text)}
            label={"Miêu tả nội dung: "}
            numberOfLines={10}
          />

          <View style={styles.row}>
            <TouchableOpacity onPress={() => {}} style={styles.submit}>
              <Text>Đăng tin</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default connect(
  (state) => ({
    user: state.userReducer.user,
  }),
  {}
)(PostNewsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginVertical: 10,
  },
  touchInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginHorizontal: 20,
  },
  option: {
    width: "90%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    backgroundColor: "red",
  },
  row: {
    marginVertical: 20,
    color: "red",
    borderColor: "#52c7b8",
    width: "90%",
    marginHorizontal: 20,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  multiline: {
    height: 150,
  },
  singleline: {
    height: 50,
  },
  submit: {
    backgroundColor: "#aed581",
    alignItems: "center",
    padding: 10,
  },
  uploadimage: {
    justifyContent: "center",
    flex: 0.5,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
    width: "90%",
    marginHorizontal: 20,
  },
  imagePost: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  IconWrapper: {
    justifyContent: "center",
  },
});
