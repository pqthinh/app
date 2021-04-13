const uploadTask = uploadImage(image.uri, name);
uploadTask.on(
  "state_changed",
  (snapshot) => {
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log("Upload is paused");
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log("Upload is running");
        break;
    }
  },
  (error) => {
    console.log(error, "error");
  },
  () => {
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log("File available at", downloadURL);
    });
  }
);
