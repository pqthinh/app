// @refresh reset
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";

const ChatComponent = (props) => {
  const { user, navigation } = props;

  const [currentUser, setCurrentUser] = useState({});
  const fakeuser = {
    _id: 2,
    uid: 2,
    name: "React Native",
    avatar: "https://placeimg.com/140/140/any",
  };

  const recive = {
    _id: 1,
    uid: 1,
    name: "React Native",
    avatar: "https://placeimg.com/140/140/any",
  };

  const [messages, setMessages] = useState(fakemess);

  useEffect(() => {
    setCurrentUser(fakeuser);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    console.log(messages, "list message");
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginVertical: 20}}>
      <GiftedChat
        messages={messages}
        // onSend={handleSend}
        onSend={onSend}
        user={currentUser}
      />
      </View>

      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
};

export default connect(
  (state) => ({
    user: state.userReducer.user,
  }),
  {}
)(ChatComponent);

const fakemess = [
  {
    _id: 9,
    text: "#awesome 3",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Developer",
    },
  },
  {
    _id: 8,
    text: "#awesome 2",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Developer",
    },
  },
  {
    _id: 7,
    text: "#awesome",
    createdAt: new Date(),
    user: {
      id: 1,
      name: "Developer",
    },
  },
  {
    _id: 6,
    text: "Paris",
    createdAt: new Date(),
    user: {
      uid: 3,
      name: "React Native",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/280px-Paris_-_Eiffelturm_und_Marsfeld2.jpg",
    sent: true,
    received: true,
  },
  {
    _id: 5,
    text: "Send me a picture!",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Developer",
    },
  },
  {
    _id: 4,
    text: "",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "React Native",
    },
    sent: true,
    received: true,
    location: {
      latitude: 48.864601,
      longitude: 2.398704,
    },
  },
  {
    _id: 3,
    text: "Where are you?",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Developer",
    },
  },
  {
    _id: 2,
    text: "Yes, and I use #GiftedChat!",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "React Native",
    },
    sent: true,
    received: true,
  },
  {
    _id: 1,
    text: "Are you building a chat app?",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Developer",
    },
  },
  {
    _id: 10,
    text: "This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT",
    createdAt: new Date(),
    quickReplies: {
      type: "radio", // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: "😋 Yes",
          value: "yes",
        },
        {
          title:
            "📷 Yes, let me show you with a picture! Again let me show you with a picture!",
          value: "yes_picture",
        },
        {
          title: "😞 Nope. What?",
          value: "no",
        },
      ],
    },
    user: {
      _id: 2,
      name: "React Native",
    },
  },
  {
    _id: 20,
    text: "This is a quick reply. Do you love Gifted Chat? (checkbox)",
    createdAt: new Date(),
    quickReplies: {
      type: "checkbox", // or 'checkbox',
      values: [
        {
          title: "Yes",
          value: "yes",
        },
        {
          title: "Yes, let me show you with a picture!",
          value: "yes_picture",
        },
        {
          title: "Nope. What?",
          value: "no",
        },
      ],
    },
    user: {
      _id: 2,
      name: "React Native",
    },
  },
  {
    _id: 30,
    createdAt: new Date(),
    video: "https://media.giphy.com/media/3o6ZthZjk09Xx4ktZ6/giphy.mp4",
    user: {
      _id: 2,
      name: "React Native",
    },
  },
  {
    _id: 31,
    createdAt: new Date(),
    audio:
      "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3",
    user: {
      _id: 2,
      name: "React Native",
    },
  },
];
