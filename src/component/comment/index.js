import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Rating, Input } from "react-native-elements";
import { Card, Avatar } from "react-native-paper";

const CommentComponent = ({ title, comment, setComment, ...others }) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Rating
          showRating
          fractions="{1}"
          startingValue="{3.3}"
          onFinishRating={(e) => Alert.alert(e.toString())}
          style={{ paddingVertical: 10 }}
        />
      </View>

      <View style={styles.commentInput}>
        <Card.Title
          left={(props) => (
            <Avatar.Image
              size={40}
              source={{ uri: "https://picsum.photos/700" }}
            />
          )}
          title={
            <View
              style={{
                width: 200,
                height: 50,
                borderWidth: 1,
                borderColor: "#000",
                backgroundColor: "#fff",
                borderRadius: 5,
              }}
            >
              <Input
                placeholder="Comment"
                leftIcon={{ type: "feather", name: "message-circle" }}
                style={styles.textInput}
                onChangeText={(value) => setComment(value)}
                value={comment}
                errorStyle={{ color: "red" }}
                errorMessage="Nội dung bạn nhập không đúng"
              />
            </View>
          }
        />
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
            title={<Text style={styles.userComment}>"Thinhpq"</Text>}
            subtitle={<Text>"Sản phẩm rất tốt ạ"</Text>}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(CommentComponent);

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
});
