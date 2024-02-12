import React, { useState, useEffect } from "react";
import { View, FlatList, Text, SectionList, StatusBar } from "react-native";
import { connect } from "react-redux";
import * as List from "../components/List";
import { Image } from "expo-image";
import * as Network from 'expo-network';

//import styles and assets
import styled from "styled-components/native";
import colors from "../config/colors";
import { Cap } from "../config/Typography";
import { logout, updateAvatar, getUserName, updateUserName, showOfflineAlert } from "../components/Firebase/firebase";

//import components
import * as Typography from "../config/Typography";
import * as Button from "../components/Button";
import ImageInput from "../components/ImageInput";
// import Colors from "../components/forms/Colors";
import { NameInput } from "../components/forms/AppInput"
// import { fontScale } from "../config/Typography"

const AccountItems = [
  {
    title: "Account Management",
    data: [
      // { title: "Privacy", icon: "account-lock", screen: "Hosting" },
      // { title: "Notifications", icon: "bell", screen: "Notifications" },
      { title: "Your activity", icon: "bell", screen: "Activity" },
      // { title: "Payment history", icon: "credit-card", screen: "Hosting" },
    ],
  },
  // {
  //   title: "Hosting",
  //   data: [
  //     { title: "Switch to hosting mode", icon: "refresh", screen: "Hosting" },
  //     { title: "Register your accommodation", icon: "plus", screen: "Hosting" },
  //   ],
  // },

  // {
  //   title: "Help",
  //   data: [
  //     { title: "How to use MSP", icon: "help", screen: "Hosting" },
  //   ],
  // },
];

const Accounts = (props) => {
  let user = props.state.user
  let [imageUri, setImageUri] = useState(user.avatar)
  let [userName, setUserName] = useState('')
  // console.log(DEFAULTAVATAR)
  console.log(imageUri)

  useEffect(() => {
    getUserName(user.id, setUserName)

    async function fetchAvatar() {
      const res = await fetch(user.avatar)
      if (res.status != 200) {
        // console.log(1, res.status)
        setImageUri()
      } else {
        // console.log(2, res.status)
        setImageUri(user.avatar)
      }
    }

    if (user.avatar) {
      // setImageUri(user.avatar)
      fetchAvatar()
    } else {
      console.log("userAvatar object not loaded!")
    }

    return () => {
      setImageUri()
    }
  }, [])

  const onChangeImage = async (uri) => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      await Image.clearDiskCache()
      await Image.clearMemoryCache()
      // console.log(uri)
      setImageUri(uri);
      await updateAvatar(uri)
      // console.log('avatar updated!')
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  }

  const handleSaveUsername = async (newUsername) => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      setUserName(newUsername);
      // Perform additional logic here, such as updating the username on the server.
      updateUserName(newUsername)
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  };

  return (
    <Container>
      <SectionList
        contentContainerStyle={{ padding: 24 }}
        ListHeaderComponent={
          <View testID="account-header-component">
            <Typography.H color={colors.red}>{'Profile'}</Typography.H>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 24 }}>
              <ImageInput
                imageUri={imageUri}
                onChangeImage={onChangeImage}
                placeholder={require("../assets/default_user.png")}
                customStyle={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  marginRight: 15,
                }}
              />
              {userName == ''
                ? null
                : <NameInput
                  testID="username-input"
                  initialName={userName}
                  onSave={handleSaveUsername}
                  style={{ backgroundColor: colors.faintgray, borderRadius: 10, width: 150, paddingHorizontal: 10, height: 36 }}
                />
              }
            </View>
          </View>
        }
        sections={AccountItems}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ marginTop: 30, marginBottom: 10 }}>
            <Cap color={colors.gray}>{title}</Cap>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        renderItem={({ item, index }) => (
          <List.Default
            testID={item.title + "_account"}
            title={item.title}
            icon={item.icon}
            iconcolor={colors.darkgray}
            // onPress={() => console.log("selected", item)}
            // onPress={() => props.navigation.navigate(`${item.screen}`)}
            onPress={() => props.navigation.navigate("AccountStackModal", { screen: `${item.screen}` })}
          />
        )}
        ItemSeparatorComponent={() => <HLine />}
      />
      <View style={{ margin: 10 }}>
        <Button.BtnContain
          testID="log-out-button"
          label="Log Out"
          color={colors.black}
          size="small"
          disabled={false}
          onPress={logout} />
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const HLine = styled.View`
  width: 100%;
  margin: 0 auto;
  height: 1px;
  background-color: ${colors.lightgray};
`;

const mapStateToProps = (state) => {
  return {
    state: state.user,
  };
};

export default connect(mapStateToProps)(Accounts);
