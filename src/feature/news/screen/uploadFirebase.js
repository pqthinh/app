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

const clearImg = (imgs) => {
  setImage([]);
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

      // log url
      console.log(url, "link img");
      setImg([...img, url]);
    })
    .catch((error) => {
      console.log(error);
    });
};
