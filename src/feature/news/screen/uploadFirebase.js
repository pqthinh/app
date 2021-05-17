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

// cloudinary
const handleUploadImage = (files) => {
  console.log(files);

  const images = [];
  const uploaders = files.map((file) => {
    let name = file.uri.split("/").slice(-1)[0];
    console.log(name);
    const formData = new FormData();
    formData.append("file", file.uri);
    formData.append("folder", "images");
    formData.append("upload_preset", "sg9vcerw");
    formData.append("api_key", "458657474175494");
    formData.append("timestamp", Date.now() / 1000 || 0);

    return axios
      .post(
        "https://api.cloudinary.com/v1_1/thinhpq-its-app/image/upload",
        formData
      )
      .then((response) => {
        const { data } = response;
        images.push(data.secure_url);
        console.log(images);
      });
    Promise.all(uploaders).then(() => {
      Alert.alert("Tải ảnh lên thành công");
    });
  });
};
