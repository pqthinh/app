import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-elements";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { Feather } from "react-native-vector-icons";

const fakeComment = [
  {
    user: {
      name: "user 1",
      avatar_url: "https://picsum.photos/200",
    },
    comment: "Sản phẩm chất lượng",
    star: 5,
    create_at: new Date(),
  },
  {
    user: {
      name: "user 2",
      avatar_url: "https://picsum.photos/200",
    },
    comment: "Sản phẩm chất lượng, đẹp",
    star: 5,
    create_at: new Date(),
  },
  {
    user: {
      name: "user 3",
      avatar_url: "https://picsum.photos/200",
    },
    comment: "Sản phẩm chất lượng",
    star: 5,
    create_at: new Date(),
  },
];
const fakeUser = {
  name: "pham quang thinh",
  avatar_url: "https://picsum.photos/200",
};

const CommentComponent = ({ ...others }) => {
  const [star, setStar] = useState(5);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState(fakeComment);
  const [comment, setComment] = useState("");

  const handleSubmitComment = useCallback(() => {
    setVisible(true);
  }, [comment]);

  const handleVoteStar = useCallback(
    (e) => {
      setStar(e);
    },
    [star]
  );

  const addComment = useCallback(() => {
    const data = {
      user: fakeUser,
      comment: comment,
      create_at: new Date(),
      star: star,
    };
    setComments([data, ...comments]);
    setComment("");
  }, [comment, star]);

  const renderComment = useCallback(
    (comments) => {
      return (
        <>
          {comments.map((comment) => {
            return (
              <View style={styles.commentRow}>
                <Image
                  source={{ uri: comment.user.avatar_url }}
                  style={styles.avatar}
                />
                <View style={styles.contentComment}>
                  <View style={styles.row}>
                    <Text style={styles.bold}> {comment.user.name} </Text>
                    <Text>
                      {`( ${comment.star}`}{" "}
                      <Feather name="star" size={12} color={"yellow"} /> )
                    </Text>
                  </View>
                  <Text>{comment.comment}</Text>
                </View>
              </View>
            );
          })}
        </>
      );
    },
    [comments]
  );

  return (
    <View style={styles.container}>
      <View>
        <Dialog
          visible={visible}
          onTouchOutside={() => {
            setVisible(false);
          }}
        >
          <DialogContent>
            <Rating
              showRating
              startingValue="{3}"
              onFinishRating={(e) => {
                Alert.alert(`Bạn đã vote ${e} sao cho tin đăng này`);
                handleVoteStar(e);
                addComment();
              }}
              style={{ paddingVertical: 10 }}
            />
          </DialogContent>
        </Dialog>
      </View>

      <View style={styles.formComment}>
        <View style={styles.row}>
          <Feather
            name="camera"
            size={24}
            color="#000"
            style={{ paddingHorizontal: 10 }}
          />
          <TextInput
            style={styles.inputComment}
            value={comment}
            onChangeText={(value) => setComment(value)}
            placeholder="Nhập bình luận ..."
          />
          <TouchableOpacity onPress={() => handleSubmitComment()}>
            <Feather name="send" size={24} color="#01579B" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listComment}>{renderComment(comments)}</View>
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
  },
  formComment: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "95%",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  inputComment: {
    width: "80%",
    paddingHorizontal: 5,
  },
  listComment: {
    flex: 1,
    width: "95%",
    justifyContent: "center",
    marginHorizontal: 10,

    marginVertical: 10,
  },
  commentRow: {
    flex: 1,
    flexDirection: "row",
    flexBasis: 1,
    paddingHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#fff",
    paddingVertical: 5,
    borderRadius: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  contentComment: {
    marginHorizontal: 10,
  },
  row: {
    flexDirection: "row",
  },
  bold: {
    fontWeight: "600",
  },
});
