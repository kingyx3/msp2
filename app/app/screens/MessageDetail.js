import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import * as Network from 'expo-network';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  createMessage,
  readMessage,
  getChatId,
  getAvatarLink,
  showOfflineAlert,
} from "../components/Firebase/firebase";
import { auth, database } from "../components/Firebase/firebaseConfig"
import { ref, onValue } from "firebase/database"
import styled from "styled-components/native";
import { NavBarChat } from "../components/NavBar";
import { GiftedChat, Send } from 'react-native-gifted-chat';

const MessageDetail = (props) => {
  const user = auth.currentUser;
  const [messages, setMessages] = useState([]);
  let selectedChat = props.route.params.selectedChat;
  let chatId = getChatId(user?.uid, selectedChat?.otherUserId);

  useEffect(() => {
    async function fetchData() {
      if (!user || !selectedChat) return;
      if (process.env.EXPO_PUBLIC_TYPE !== 'TEST') {
        const messagesRef = ref(database, `messages/${chatId}`);
        const messagesCallback = (snapshot) => {
          readMessage(selectedChat.otherUserId);
          let msgList = Object.values(snapshot.val() || {});
          setMessages(msgList);
        };
        const unsubscribe = onValue(messagesRef, messagesCallback);
        return () => {
          // Cleanup function to unsubscribe from Firebase listener
          unsubscribe();
        };
      }
    }
    fetchData();
    return () => setMessages([]);
  }, [selectedChat]);

  const onSend = useCallback(async (messages = []) => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      if (process.env.EXPO_PUBLIC_TYPE !== 'TEST') {
        const { _id, text } = messages[0];
        createMessage(selectedChat.otherUserId, _id, text);
      } else {
        setMessages([...messages]);
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
        name={selectedChat?.otherUserName}
        onPress={() => props.navigation.goBack()} />
      <GiftedChat
        messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={onSend}
        scrollToBottom
        alwaysShowSend
        messagesContainerStyle={{
          backgroundColor: 'white'
        }}
        textInputProps={{
          testID: 'messageInput',
        }}
        renderSend={(props) =>
          <Send
            {...props}
            containerStyle={styles.sendContainer}>
            <View testID="send-button">
              <Ionicons name="send" size={32} color="purple" />
            </View>
          </Send>
        }
        user={{
          _id: user?.uid,
        }}
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
});

export default MessageDetail;