import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Rating, Input } from "react-native-elements";
import { Card, Avatar } from "react-native-paper";
import Dialog, { DialogContent } from "react-native-popup-dialog";

const CommentComponent = ({ title, comment, setComment, ...others }) => {
  const [star, setStar] = useState(5);
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View>
        <Dialog
          visible={visible}
          onTouchOutside={() => {
            setVisible(true);
          }}
        >
          <DialogContent>
            <Rating
              showRating
              fractions="{1}"
              startingValue="{3}"
              onFinishRating={(e) => Alert.alert(e.toString())}
              style={{ paddingVertical: 10 }}
            />
          </DialogContent>
        </Dialog>
      </View>

      <View style={styles.commentInput}>
        <Avatar
          rounded
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />

        <View>
          <Text>Thinhpq</Text>
          <Input
            placeholder="Comment"
            leftIcon={{ type: "feather", name: "message-circle" }}
            style={styles.textInput}
            onChangeText={(value) => setComment(value)}
            value={comment}
          />
        </View>
      </View>
      <View style={styles.listComment}>
        <View style={styles.commentInput}>
          <Card.Title
            left={(props) => (
              <Avatar.Image
                size={40}
                source={{ uri: "https://picsum.photos/700" }}
              />
            )}
            title={() => <Text style={styles.userComment}>"Thinhpq"</Text>}
            subtitle={() => <Text>"Sản phẩm rất tốt ạ"</Text>}
          />
        </View>
      </View>
    </View>
  );
};

// export default CommentComponent;

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    flex: 1,
    margin: "auto",
  },
  button: {
    backgroundColor: "#add681",
    borderRadius: 5,
    padding: 5,
  },
  textInput: { color: "red" },
  userComment: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 10,
  },
  commentInput: {
    flex: 1,
    flexDirection: "row",
  },
  listComment: {
    flex: 1,
  },
});
