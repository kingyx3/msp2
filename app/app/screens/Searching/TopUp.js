import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  // View,
  // FlatList,
  // Modal,
  TouchableOpacity,
  // StatusBar,
  Platform,
  View,
  StyleSheet,
  Keyboard
} from "react-native";
import * as Notifications from 'expo-notifications';
import * as Network from 'expo-network';
//import components
import { NavBar } from "../../components/NavBar";
import { Feather } from "@expo/vector-icons";
//import redux
import { connect } from "react-redux";
//import styles and assets
import styled from "styled-components/native";
import colors from "../../config/colors";
// import { TopUpInput } from "../../components/forms/AppInput";
// import { Button } from "react-native-elements";
import { updateExpoPushToken, getPaymentSheet, showOfflineAlert } from '../../components/Firebase/firebase';
import { useStripe, initStripe } from "@stripe/stripe-react-native";
// import colors from "../../config/colors";
import * as Typography from "../../config/Typography";
const { width, height } = Dimensions.get('window');

const TopUp = (props) => {
  const requiredAmt = props?.route?.params?.requiredAmt // only available for topup from attempted booking
  const userWalletSGD = props?.user?.wallet?.sgd / 100
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  // const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState("10");
  const [count, setCount] = useState(0);

  // console.log(userWalletSGD, requiredAmt)
  useEffect(() => {
    setLoading(false);
    // From reserve_1
    if (requiredAmt) {
      if (requiredAmt < userWalletSGD) {
        props.navigation.goBack()
      }
    } else {
      if (count > 0) {
        // From regular topup
        props.navigation.goBack()
      } else {
        setCount(1)
      }
    }
  }, [userWalletSGD])

  const onChangeText = (newAmount) => {
    if (parseInt(newAmount) > 999) {
      setAmount("999")
    } else if (newAmount.length > 3) {
      setAmount(newAmount.substring(0, 3))
    } else if (newAmount < 1) {
      setAmount("0")
    } else {
      setAmount((+newAmount).toString())
    }
  }

  const openPaymentSheet = async (paymentIntent) => {
    if (!paymentIntent) {
      return;
    }
    const { error } = await presentPaymentSheet({
      paymentIntent,
    });

    if (error) {
      console.log(error)
      setLoading(false)
    } else {
      //  Should wait till db says wallet amount is updated
      // props.navigation.goBack()
      setPaymentSheetEnabled(false);
    }
  };

  const initialisePaymentSheet = async () => {
    const {
      bookingId,
      paymentIntent,
      ephemeralKey,
      customer,
    } = await getPaymentSheet(amount)

    console.log(paymentIntent, ephemeralKey, customer)

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: 'MakeShiftPlans',
      style: 'alwaysDark',
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    }
    return paymentIntent
  };

  ////////////////////////////////////////////////////////////////////////

  const onSubmit = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      setLoading(true)
      Keyboard.dismiss()
      if (parseInt(amount) < 10) {
        setAmount("10")
        setLoading(false)
      } else {
        const paymentIntent = await initialisePaymentSheet();
        await openPaymentSheet(paymentIntent)
      }
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  }

  return (
    <Container>
      <NavBar nav="chevron-left" onPress={() => props.navigation.goBack()} />
      <Main>
        <Header>
          <Typography.H color={colors.red}>{'Top Up Wallet'}</Typography.H>
        </Header>
        <View testID="balance-container" style={styles.balanceContainer}>
          {/* <View>
            <Typography.H2 bold >{"SGD " + amount}</Typography.H2>
            <Typography.pS >Confirm Top Up Amount?</Typography.pS>
          </View> */}
          <View style={{ flexDirection: "row", }}>
            <View>
              <View style={{ flexDirection: "row", }}>
                <View style={{}}>
                  <Typography.H2 bold>SGD {amount}</Typography.H2 >
                </View>
                {/* <View style={{}}>
                  <TopUpInput
                    onChangeText={onChangeText}
                    value={amount}
                  />
                </View> */}
              </View>
              <Typography.pS >Top Up Amount</Typography.pS>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <TouchableOpacity testID="top-up-button-10" style={{ marginTop: 5, marginHorizontal: 10, backgroundColor: '#DDDDDD', width: width * 0.12, height: height * 0.05, borderRadius: 20, borderWidth: 1, borderColor: '#000000', justifyContent: 'center', alignItems: 'center' }} onPress={() => setAmount('10')}>
                  <Typography.H4 color="#000000">10</Typography.H4>
                </TouchableOpacity>
                <TouchableOpacity testID="top-up-button-20" style={{ marginTop: 5, marginHorizontal: 10, backgroundColor: '#DDDDDD', width: width * 0.12, height: height * 0.05, borderRadius: 20, borderWidth: 1, borderColor: '#000000', justifyContent: 'center', alignItems: 'center' }} onPress={() => setAmount('20')}>
                  <Typography.H4 color="#000000">20</Typography.H4>
                </TouchableOpacity>
                <TouchableOpacity testID="top-up-button-50" style={{ marginTop: 5, marginHorizontal: 10, backgroundColor: '#DDDDDD', width: width * 0.12, height: height * 0.05, borderRadius: 20, borderWidth: 1, borderColor: '#000000', justifyContent: 'center', alignItems: 'center' }} onPress={() => setAmount('50')}>
                  <Typography.H4 color="#000000">50</Typography.H4>
                </TouchableOpacity>
                <TouchableOpacity testID="top-up-button-100" style={{ marginTop: 5, marginHorizontal: 10, backgroundColor: '#DDDDDD', width: width * 0.12, height: height * 0.05, borderRadius: 20, borderWidth: 1, borderColor: '#000000', justifyContent: 'center', alignItems: 'center' }} onPress={() => setAmount('100')}>
                  <Typography.H4 color="#000000">100</Typography.H4>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            testID="top-up-button"
            style={loading ? {
              backgroundColor: colors.lightgray,
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              borderRadius: 25,
            }
              : {
                backgroundColor: colors.red,
                justifyContent: "center",
                alignItems: "center",
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            onPress={loading ? null : onSubmit}
          >
            <Feather name="plus" color={colors.white} size={20} />
          </TouchableOpacity>
        </View>
      </Main>
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
  padding: 10px;
  flex-direction: row;
  margin-horizontal: 13px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
`;

const styles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: colors.white,
    paddingHorizontal: 10,
    flexDirection: "row",
    marginHorizontal: 13,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceContainer: {
    backgroundColor: colors.offWhite,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "row",
    marginHorizontal: 13,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  currentAmountValueText: {
    color: colors.blackText,
    fontWeight: "bold",
    fontSize: Platform.OS === 'ios' ? 24 : 16,
    marginBottom: 10,
  },
  currentAmountLabelText: {
    color: colors.darkBlue,
    fontSize: Platform.OS === 'ios' ? 14 : 9,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(TopUp);




async function registerForPushNotificationsAsync(props) {
  let token;
  if (process.env.EXPO_PUBLIC_TYPE != 'TEST') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (props.user.expoPushToken != token) {
    updateExpoPushToken(token)
    // .then(() => console.log('Expo token updated'))
  }

  return token;
}