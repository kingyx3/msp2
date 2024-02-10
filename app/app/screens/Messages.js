import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import moment from 'moment'

import { connect } from "react-redux";
import * as Network from 'expo-network';

import { showOfflineAlert, getAvatarLink } from "../components/Firebase/firebase";
import { auth } from "../components/Firebase/firebaseConfig";
//import components
import * as List from "../components/List";
// import DeleteItem from "../components/DeleteItem";

//import styles and assets
import styled from "styled-components/native";
import colors from "../config/colors";
import { H, P } from "../config/Typography";

const Messages = (props) => {
  let messages = props.state.userMessages
  // const [refreshing, setRefresing] = useState(false);
  const user = auth.currentUser;

  // const handleDelete = (message) => {
  //   const newMesages = messages.filter((m) => m.id !== message.id);
  //   setMessages(newMesages);
  // };

  // useEffect(() => {
  //   // can implement to show chats only if there is an open booking between host/user
  //   props.fetchUserMessages();
  // }, [])


  const handleNavigation = async (selectedChat) => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      // console.log(selectedChat)
      props.navigation.navigate("MessageStackModal", { screen: 'MessageDetail', params: { selectedChat } })
      // navigation.navigate("MessageDetail", selectedChat.otherUserId);
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  };

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <Header testID="messages-header-component">
            <H color={colors.red}>Messages</H>
            <P color={colors.black}>{messages.length == 0 ? 'You have no open conversations' : null}</P>
          </Header>
        }
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) =>
          <List.UserList
            testID={'message' + index.toString()}
            title={item?.otherUserName} //user2.name
            secondary={item?.lastMessage?.user?._id == user.uid ? user.displayName + ": " + item?.lastMessage?.text : item?.otherUserName + ": " + item?.lastMessage?.text} // bugs out if message is an empty
            image={getAvatarLink(item?.otherUserId)}
            meta={
              // If is today,
              moment().startOf('day').valueOf() < item?.lastMessage?.createdAt
                // show time
                ? moment(item?.lastMessage?.createdAt).format("HH:mm")
                // show date
                : moment(item?.lastMessage?.createdAt).format("DD/MM/YYYY")
            }
            unreadCount={item?.unread}
            onPress={() => handleNavigation(item)}
          // RightActions={() => (
          //   <DeleteItem onPress={() => handleDelete(item)} />
          // )}
          />
        }
        ItemSeparatorComponent={() => <HLine />}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-horizontal: 24px;
`;

const Header = styled.View`
  padding: 24px 0;
`;

const HLine = styled.View`
  width: 90%;
  margin: 0 auto;
  height: 1px;
  background-color: ${colors.lightgray};
`;

const mapStateToProps = (state) => {
  return {
    state: state.user,
  };
};

export default connect(mapStateToProps, null)(Messages);