import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
const baseURL =
  "https://firebasestorage.googleapis.com/v0/b/reactnative-firebase0.appspot.com/o/";
export default function PostNewsScreen() {
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState([]);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.cancelled) {
      setImage([...image, result]);
      console.log(image, "list image");
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
              // setImg([...img, `${baseURL + "images/" + name}`]);
              // console.log(img);
              // var gsReference = firebase.storage().refFromURL(`gs://bucket/images/${name}`);
              // console.log(gsReference);
              getURL(name)
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  };

  const clearImg = (imgs) => {
    setImage([]);
  };

  const getURL = (name) => {
    console.log(name, "name imagesewjqnfo")
    firebase.storage().ref()
      .child("images/" + name)
      .getDownloadURL()
      .then((url) => {

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element
        // var img = document.getElementById("myimg");
        console.log(url, "link img")
      })
      .catch((error) => {
        // Handle any errors
      });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image &&
        image?.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img.uri }}
            style={{ width: 200, height: 200 }}
          />
        ))}

      <Button
        title="Storage to fire base"
        onPress={() => storageFireBase(image)}
      />
      <Button title="Clear cache" onPress={() => clearImg(image)} />
    </View>
  );
}
