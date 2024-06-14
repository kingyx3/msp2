import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import * as Network from 'expo-network';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  createMessage,
  readMessage,
  getChatId,
  getAvatarLink,
  showOfflineAlert,
} from "../components/Firebase/firebase";
import { auth, database } from "../components/Firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import styled from "styled-components/native";
import { NavBarChat } from "../components/NavBar";
import { GiftedChat, Send, Composer } from 'react-native-gifted-chat';

const MessageDetail = (props) => {
  const user = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const selectedChat = props.route.params.selectedChat;
  const chatId = getChatId(user?.uid, selectedChat?.otherUserId);

  useEffect(() => {
    if (!user || !selectedChat) return;

    const fetchMessages = async () => {
      if (process.env.EXPO_PUBLIC_TYPE !== 'TEST') {
        const messagesRef = ref(database, `messages/${chatId}`);
        const messagesCallback = (snapshot) => {
          readMessage(selectedChat.otherUserId);
          const msgList = Object.values(snapshot.val() || {});
          setMessages(msgList);
        };
        const unsubscribe = onValue(messagesRef, messagesCallback);
        return () => unsubscribe();
      }
    };

    fetchMessages();
    return () => setMessages([]);
  }, [selectedChat]);

  const onSend = useCallback(async (messages = []) => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      if (process.env.EXPO_PUBLIC_TYPE !== 'TEST') {
        const { _id, text } = messages[0];
        createMessage(selectedChat.otherUserId, _id, text);
      } else {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );
      }
    } else {
      showOfflineAlert();
    }
  }, [selectedChat]);

  return (
    <Container>
      <NavBarChat
        nav="chevron-left"
        avatar={getAvatarLink(selectedChat?.otherUserId)}
        placeholder={require("../assets/default_user.png")}
        name={selectedChat?.otherUserName}
        onPress={() => props.navigation.goBack()}
      />
      <GiftedChat
        messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={onSend}
        scrollToBottom
        alwaysShowSend
        messagesContainerStyle={styles.messagesContainer}
        textInputProps={{ testID: 'messageInput' }}
        renderSend={(props) => (
          <Send {...props} containerStyle={styles.sendContainer}>
            <View testID="send-button">
              <Ionicons name="send" size={32} color="purple" />
            </View>
          </Send>
        )}
        renderComposer={(props) => (
          <Composer
            {...props}
            textInputStyle={styles.textInput}
            placeholder="Type a message..."
          />
        )}
        user={{ _id: user?.uid }}
      />
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  flex: 1;
`;

const styles = StyleSheet.create({
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  messagesContainer: {
    backgroundColor: 'white',
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    margin: 5,
    backgroundColor: 'white',
  },
});

export default MessageDetail;
