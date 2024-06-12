import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  // View,
  FlatList,
  // Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  // StatusBar,
  Platform,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
import * as Network from 'expo-network';
//import components
import { Feather } from "@expo/vector-icons";
import { SearchBar } from "../../components/SearchBar";
import * as Cards from "../../components/Cards";
//import redux
import { connect } from "react-redux";
//import styles and assets
import styled from "styled-components/native";
import colors from "../../config/colors";
import {
  updateExpoPushToken, getPublicKey, showOfflineAlert, setSpaceSummary,
  // createStaticData
} from '../../components/Firebase/firebase';
import { setSpaceType, setStart, setEnd } from "../../store/search";
import { initStripe } from "@stripe/stripe-react-native";
// import * as List from "../../components/List";
import * as Typography from "../../config/Typography";
import { StatusBar } from "expo-status-bar";
import moment from 'moment'

const Home = (props) => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  let userBookings = Object.values(props.userBookings)
  userBookings = Object.values(userBookings)
  userBookings = userBookings.filter(function (userBooking) {
    if (userBooking.status == 'confirmed' || userBooking.cancelled) {
      return userBooking
    }
  })
  userBookings = userBookings.map(({ start, end, spaceType }) => ({ start: addWeekToDate(start), end: addWeekToDate(end), spaceType }));
  userBookings = Array.from(new Set(userBookings.map(JSON.stringify))).map(JSON.parse); // Get unique spacetype/datetime objects
  userBookings = userBookings.sort((a, b) => new Date(a.start) - new Date(b.start)); //latest appear on top
  userBookings = userBookings.slice(0, 3) // load only the first 3
  const quickSearches = userBookings

  // // For expo notifications
  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // });

  // // const [expoPushToken, setExpoPushToken] = useState('');
  // // const [notification, setNotification] = useState(false);
  // // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync(props)
  //   // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   // // This listener is fired whenever a notification is received while the app is foregrounded
  //   // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //   //   setNotification(notification);
  //   // });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     // Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  // // End of expo notifications

  const image = require('../../assets/splash-home-background.png') //{ uri: "https://reactjs.org/logo-og.png" };

  useEffect(() => {
    // createStaticData()
    async function initialize() {
      try {
        const publishableKey = await getPublicKey();
        // console.log(publishableKey, 'lolol')
        if (publishableKey) {
          await initStripe({
            publishableKey,
            merchantIdentifier: 'makeshiftplans.com',
            urlScheme: 'makeshiftplans',
          });
          setInitLoading(false);
        }
      } catch (e) {
        // If publishableKey is not set, call initialize again after a minute
        setTimeout(initialize, 60000); // 60000 mils = 1 minute
      }
    }
    initialize();
    return setInitLoading(true);
  }, []);

  const onNavigate = async (start, end, spaceType) => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      await props.setStart(start);
      await props.setEnd(end);
      await props.setSpaceType(spaceType);
      await props.setSpaceSummary(spaceType);
      return props.navigation.navigate('Home', { screen: 'Listings' });  //to specify specific screens in another navigator
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  };

  const onSubmit = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      setLoading(true)
      props.navigation.navigate("TopUp")
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  }

  // Can check if (initLoading) // for Stripe Pub keys async call
  return (
    <Container>
      <StatusBar translucent={true} style={'dark'} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Main>
          <ImageBackground source={image} resizeMode="cover" style={{
            flex: 1,
            justifyContent: "center"
          }}>
            <View
              style={{ flex: 1 }}
            />
            <View style={{ flex: 2 }}>
              <SearchBar
                testID="search-bar"
                placeholder="What are you doing today?"
                icon="search"
                size={20}
                // setSearch={() => setSearch(true)}
                setSearch={async () => {
                  const networkState = await Network.getNetworkStateAsync();
                  if (networkState.isConnected) {
                    // Device is connected to the internet
                    // props.navigation.navigate('SearchStackModal', { screen: 'SpaceTypePicker' });  //to specify specific screens in another navigator
                    props.navigation.navigate('SearchStackModal');
                  } else {
                    // Device is not connected to the internet
                    showOfflineAlert()
                  }
                }}
              />
              <View style={styles.balanceContainer}>
                <View testID="wallet-balance">
                  <Typography.H2 bold >{"SGD " + (props?.user?.wallet?.sgd / 100 || 0).toFixed(2)}</Typography.H2>
                  <Typography.pS>{process.env.EXPO_PUBLIC_TYPE !== 'TEST' ? "Wallet Balance" : !isNaN(props?.user?.wallet?.sgd) ? "Wallet Balance" : ""}</Typography.pS>
                </View>
                <TouchableOpacity
                  testID="top-up-button"
                  style={{
                    backgroundColor: colors.red,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                  onPress={onSubmit}
                >
                  <Feather name="plus" color={colors.white} size={20} />
                </TouchableOpacity>
              </View>
              {quickSearches.length != 0 && <View style={styles.txnsContainer}>
                <FlatList
                  ListHeaderComponent={
                    <Header>
                      <Typography.H color={colors.red}>{'Quick Search'}</Typography.H>
                    </Header>
                  }
                  data={quickSearches}
                  extraData={quickSearches}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) =>
                    <Cards.QuickSearch
                      testID={index.toString() + "_quick_search"}
                      title={"Space Type : " + item.spaceType} //item.city
                      secondary={"Date/Time : " + moment(item.start).format('D MMM yyyy (ddd), hA') + " to " + moment(item.end).format('hA')} //item.title
                      onPress={async () => onNavigate(item.start, item.end, item.spaceType)}
                    />
                  }
                />
              </View>}
            </View>
          </ImageBackground>
        </Main>
      </TouchableWithoutFeedback>
    </Container >
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  flex: 1;
  /* background-color: white; */
  /* padding-bottom: 30px; */
  /* justify-content: center; */
  /* align-items: center; */
`;

const Header = styled.View`
  padding: 20px 0px 0px;
`;

const styles = StyleSheet.create({
  balanceContainer: {
    backgroundColor: colors.offWhite,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "row",
    marginHorizontal: 13,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  txnsContainer: {
    // backgroundColor: colors.offWhite,
    paddingHorizontal: 20,
    marginHorizontal: 13,
    borderRadius: 8,
  },
  currentAmountValueTextWhiteBG: {
    color: colors.blackText,
    fontWeight: "bold",
    fontSize: Platform.OS === 'ios' ? 22 : 14,
    backgroundColor: colors.white
  },
});

const mapStateToProps = (state) => {
  return {
    userBookings: state.user.userBookings,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, { setSpaceType, setSpaceSummary, setStart, setEnd })(Home);




// async function registerForPushNotificationsAsync(props) {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     // console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (props.user.expoPushToken != token) {
//     updateExpoPushToken(token)
//     // .then(() => console.log('Expo token updated'))
//   }

//   return token;
// }

function addWeekToDate(startMs) {
  const startDate = new Date(startMs);
  const currentMs = Date.now();

  if (startDate.getTime() <= currentMs) {
    while (startDate.getTime() <= currentMs) {
      startDate.setTime(startDate.getTime() + 604800000);
    }
  } else {
    while (startDate.getTime() >= currentMs) {
      startDate.setTime(startDate.getTime() - 604800000);
    }
    startDate.setTime(startDate.getTime() + 604800000);
  }

  return startDate.getTime();
}
