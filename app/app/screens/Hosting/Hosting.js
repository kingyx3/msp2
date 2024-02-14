import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as Network from 'expo-network';

//import components
import * as Button from "../../components/Button";

//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../../config/Typography";
// import { H } from "../../config/Typography";
import colors from "../../config/colors";
import * as Cards from "../../components/Cards";

//import data
import { bindActionCreators } from 'redux'
import { clearHostData } from '../../store/host'
import {
  setSelectedSpace,
  clearSelectedSpace,
  getAccountLink,
  showOfflineAlert
} from "../../components/Firebase/firebase";

const Hosting = (props) => {
  const [loading, setLoading] = useState(false)
  let userSpaces = props.state.userSpaces
  userSpaces = Object.values(userSpaces) //.slice(0, 10) //load only the first 10 userSpaces

  useFocusEffect(
    useCallback(() => {
      props.clearHostData()
      console.log('Host data cleared!')
    }, [])
  )

  const headerComponent = () => {
    return (
      <Top>
        <Header testID="hosting-header-component">
          <Typography.H color={colors.red}>List your space</Typography.H>
          <View style={{ marginTop: 14, marginBottom: 20 }}>
            <Typography.P colors={colors.gray}>
              From a loft to a soccer field, you can list various types of space for free,
              share it.
            </Typography.P>
          </View>
          <BtnContainer>
            <Button.BtnContain
              testID={'list-now'}
              label={props.state.user.onboarded ? "List Now" : "Setup Payments"}
              color={loading ? colors.lightgray : colors.red}
              disabled={loading}
              onPress={async () => {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                  // Device is connected to the internet
                  setLoading(true)
                  if (props.state.user.onboarded) {
                    props.navigation.navigate("HostStackModal")
                  } else {
                    let accountLink = await getAccountLink()
                    if (accountLink.url) {
                      // Linking.openURL(accountLink.url)
                      let browserParams
                      WebBrowser.openBrowserAsync(accountLink.url, browserParams)
                    } // else {
                    //   props.navigation.navigate("HostStackModal")
                    // }
                  }
                  setLoading(false)
                } else {
                  // Device is not connected to the internet
                  showOfflineAlert()
                }
              }}
            />
          </BtnContainer>
        </Header>
        <Header2>
          <Typography.H color={colors.red}>{'My Spaces'}</Typography.H>
          <Typography.P color={colors.black}>{userSpaces.length == 0 ? 'You have no listed spaces yet' : null}</Typography.P>
        </Header2>
      </Top>
    )
  }
  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          headerComponent
        }
        stickyHeaderIndices={[0]}
        data={userSpaces}
        extraData={userSpaces}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={{ padding: 24 }}>
            <Cards.Default
              image={item.images}
              // sub={handleDate(item)}
              title={item.title} //item.city
              secondary={item.description} //item.title
              action={`View${item.disabled ? " disabled " : " "}space details`}
              meta
              sub={item.spaceType}
              onPress={async () => {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                  // Device is connected to the internet
                  props.clearSelectedSpace()
                  props.setSelectedSpace(item.id)
                  props.navigation.navigate('HostStackModal', { screen: 'SpaceDetails' });
                } else {
                  // Device is not connected to the internet
                  showOfflineAlert()
                }
              }}
            />
          </View>
        }
      ></FlatList>
      {/*
        <HostStory>
          <Card elevation={5}>
            <ImageContainer>
              <MainImage
                source={{
                  uri:
                    "https://a0.muscache.com/pictures/9d977b2b-f66f-4028-a9c6-b997cb331892.jpg",
                }}
              />
            </ImageContainer>
            <TextContainer>
              <View style={{ marginBottom: 8 }}>
                <Typography.H3>Hear from your host</Typography.H3>
              </View>

              <Typography.P colors={colors.gray}>
                Dorothy is a London host who wants to share her home with others.
              </Typography.P>
            </TextContainer>
          </Card>
        </HostStory>
        */}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.ScrollView``;

const Top = styled.View`
  flex: 1;
  padding: 24px;
  background-color: white;
`;

const HostStory = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

// const Card = styled.View`
//   background-color: #ffffff;
//   height: 260px;
//   border-radius: 12px;
//   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.08);
// `;

// const ImageContainer = styled.View`
//   width: 100%;
//   height: 140px;
//   border-top-left-radius: 12px;
//   border-top-right-radius: 12px;
//   overflow: hidden;
// `;

// const MainImage = styled.Image`
//   width: 100%;
//   height: 100%;
// `;

// const TextContainer = styled.View`
//   padding: 20px;
// `;

const Header = styled.View`
  background-color: white;
  `;

const Header2 = styled.View`
  paddingTop: 30px;
  background-color: white;
`;

// const HLine = styled.View`
//   border-bottom-width: 1px;
//   border-bottom-color: ${colors.lightgray};
// `;

const BtnContainer = styled.View`
  width: 50%;
`;

const mapStateToProps = (state) => {
  return {
    state: state.user,
  };
};

const mapDispatchProps = (dispatch) => bindActionCreators({ setSelectedSpace, clearSelectedSpace, clearHostData }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Hosting);