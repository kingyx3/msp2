import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import moment from 'moment';
import * as Linking from 'expo-linking';

//import components
import * as List from "../components/List";
import * as Button from "../components/Button";
import ActivityIndicator from '../components/ActivityIndicator'
import { NavBar } from "../components/NavBar";
import * as Network from 'expo-network';

//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../config/Typography";
import colors from "../config/colors";

//import data
import {
  setSelectedSpace,
  fetchBooking,
  cancelBooking,
  getUserName,
  hostFeeRate,
  getAvatarLink,
  showOfflineAlert,
  approveBooking,
  rejectBooking,
} from "../components/Firebase/firebase";

//import redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

const BookingDetails = (props) => {
  //const booking = props.route.params;
  let { bookingId, spaceId, host } = props.route.params
  let booking = props.state.selectedBooking
  let selectedSpace = props.state.selectedSpace
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [hostName, setHostName] = useState('')
  const hostConfirmed = booking.hostConfirmed
  const address = selectedSpace?.location?.description
  const postcode = selectedSpace?.location?.geoapify?.postcode
  let cancelByTime = host ? moment(booking?.end).add(5, 'days') : moment(booking?.start).add(-1 * selectedSpace?.cancellationPolicy?.numberOfHours, 'hours')
  cancelByTimeFormatted = cancelByTime.format('DD MMM YYYY, ha')
  // -------------------
  const isHostAbleToCancel = host && moment(booking?.end).add(5, 'days').valueOf() >= Date.now();
  const isUserAbleToCancel = !host && booking.start >= Date.now();
  const isBookingInProgress = booking.start <= Date.now() && booking.end > Date.now();

  let refundAmount = 0
  let currentTime
  let cutOffTime
  try {
    // const hours = (booking?.end - booking?.start) / 1000 / 60 / 60
    // const pricePerHour = booking?.price?.subtotal / hours
    // const fee = booking?.price.total_price - booking?.price.subtotal
    currentTime = Date.now()
    cutOffTime = moment(cancelByTime).valueOf();
    if (!host) {
      // Cancellation amount if cancelled by user
      refundAmount = (currentTime < cutOffTime)
        ? (booking?.price?.total_price * 100)
        : 0
    } else {
      // Cancellation amount if cancelled by host
      refundAmount = booking?.price?.total_price * 100
    }
  } catch {
    console.log('Error in setting refundAmount')
  }
  // -------------------

  useEffect(() => {
    // console.log(bookingId, '-', spaceId)
    if (spaceId == selectedSpace.id && bookingId == booking.id) {
      getUserName(selectedSpace.userId, setHostName)
      getUserName(booking.userId, setUserName)
    } else {
      props.setSelectedSpace(spaceId)
      props.fetchBooking(bookingId)
    }
  }, [selectedSpace, booking])

  const openGMaps = (latitude, longitude) => {
    const scheme = Platform.select({ ios: 'comgooglemaps://?daddr=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = selectedSpace.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  // Confirm cancel booking modal
  const cancelBookingBox = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      return Alert.alert(
        "Cancel Booking",
        host
          ? `Do you want to cancel this booking? Your potential earnings will be reduced by $${(Math.round((booking?.price?.hostEarnings + Number.EPSILON) * 100) / 100)} if you cancel now.`
          : `Do you want to cancel this booking? $${refundAmount / 100} will be refunded to your wallet if you cancel now.`,
        [
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel"
          },
          {
            text: "Yes", onPress: async () => {
              setLoading(true)
              await cancelBooking(bookingId) // , selectedSpace)
                .then(() => {
                  Alert.alert("Booking Cancelled!", "Success", [
                    {
                      text: "OK", onPress: () => {
                        setLoading(false)
                        props.navigation.goBack()
                      }
                    },
                  ]);
                })
                .catch((e) => {
                  Alert.alert("Booking Cancellation Error!", 'Please try again later.', [
                    {
                      text: "OK", onPress: () => {
                        setLoading(false)
                        props.navigation.goBack()
                      }
                    },
                  ]);
                  setLoading(false)
                })
            }
          }
        ]
      );
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  }


  if (Object.keys(selectedSpace).length == 0) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    )
  } else {
    return (
      <Container>
        <NavBar testID="back-button-booking-detail" nav="chevron-left" onPress={() => props.navigation.goBack()} />
        <Main testID="booking-detail-scroll-view">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            minZoomLevel={12}
            maxZoomLevel={15}
            onPress={(e) => openGMaps(selectedSpace.location.latitude, selectedSpace.location.longitude)} //e.nativeEvent.coordinate
            region={{
              latitude: selectedSpace.location.latitude,
              longitude: selectedSpace.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedSpace.location.latitude,
                longitude: selectedSpace.location.longitude,
              }}
            />
          </MapView>
          <Main2>
            <View style={{ marginBottom: 20 }}>
              <Typography.H3 testID="booking-title-price">{selectedSpace.title} (${host ? booking?.price?.hostEarnings : booking?.price?.total_price})</Typography.H3>
              <Typography.Sub1>{selectedSpace.spaceType + ' #' + (booking.courtId + 1).toString()}</Typography.Sub1>
              <Typography.pS>{"Address: " + address + (postcode ? " " + postcode : "")}</Typography.pS>
              <Typography.pS>{(selectedSpace.location.user.unit ? "Unit: #" + selectedSpace.location.user.unit : "")}</Typography.pS>
            </View>
            <HLine />
            <Checkin>
              <View style={{ paddingRight: 10 }}>
                <Typography.Cap color={colors.gray}>Booking Date</Typography.Cap>
                <Typography.Sub1 testID="booking-date">{moment(booking.start).format("DD MMM YYYY")} </Typography.Sub1>
              </View>
              <View>
                <Typography.Cap color={colors.gray}>Booking Time</Typography.Cap>
                <Typography.Sub1 testID="booking-time">{moment(booking.start).format("ha") + ' to ' + moment(booking.end).format("ha")}</Typography.Sub1>
              </View>
            </Checkin>
            <HLine />
            <Reservation>
              <Typography.Cap color={colors.gray} style={{ marginBottom: 6 }}>
                Reservation number
              </Typography.Cap>
              <Typography.Sub1 selectable>{bookingId.slice(-process.env.EXPO_PUBLIC_BOOKING_ID_SHOW_LEN).toUpperCase()}</Typography.Sub1>
            </Reservation>
            <HLine />
            <Rules>
              <View>
                <Typography.Cap color={colors.gray}>Description</Typography.Cap>
                <Typography.P>{selectedSpace.description}</Typography.P>
                {/*
              <Typography.P>-Smoke free</Typography.P>
              <Typography.P>-No pets allowed</Typography.P>
              <Typography.P>-Self check-in / out</Typography.P>
              <Typography.P>-Take off your shoes inside</Typography.P>
              <Typography.P>-Keep place clean</Typography.P>
              */}
              </View>
            </Rules>
            <HLine />
            <CancellationPolicy>
              <View>
                <Typography.Cap color={colors.gray}>Cancellation Policy</Typography.Cap>
                <Typography.Sub1 testID={'cancellation-policy'}>{host ? `Cancel by ${cancelByTimeFormatted} to refund your guest` : `Cancel by ${cancelByTimeFormatted} for free`}</Typography.Sub1>
                {/*
              <Typography.P>-Smoke free</Typography.P>
              <Typography.P>-No pets allowed</Typography.P>
              <Typography.P>-Self check-in / out</Typography.P>
              <Typography.P>-Take off your shoes inside</Typography.P>
              <Typography.P>-Keep place clean</Typography.P>
              */}
              </View>
            </CancellationPolicy>
            <HLine />
            <Host>
              <List.UserList
                testID={'host-or-user'}
                title={host ? "Booked by " + userName : "Hosted by " + hostName}
                secondary={"Member since: " + moment(new Date(host ? booking?.userCreated : selectedSpace?.userCreated)).format("MMM YYYY")}
                image={host ? getAvatarLink(booking.userId) : getAvatarLink(selectedSpace.userId)}
              />
            </Host>
            {!(booking.cancelled) && (Math.floor((Date.now() - booking.end) / (1000 * 60 * 60 * 24)) < 5) &&
              <View style={{ margin: 10 }}>
                {/* can only contact host/user up to 5 days after booking ends, existing chat need to hide? */}
                <Button.BtnContain
                  testID="contact-host-or-user"
                  label={host ? "Contact User" : "Contact Host"}
                  color={loading ? colors.lightgray : colors.black}
                  size="small"
                  disabled={loading} //
                  onPress={() => {
                    props.navigation.navigate("MessageStackModal", {
                      screen: 'MessageDetail',
                      params: {
                        selectedChat: {
                          otherUserId: host ? booking.userId : selectedSpace.userId,
                          otherUserName: host ? userName : hostName
                        }
                      }
                    })
                  }} />
              </View>
            }
            { // user can only write review up to 48 hrs after booking ends
              hostConfirmed && !host && !(booking.cancelled) && booking.end < Date.now() && Math.floor((Date.now() - booking.end) / (1000 * 60 * 60 * 24)) < 2 &&
              <View style={{ margin: 10 }}>
                <Button.BtnContain
                  testID="write-review"
                  label="Write Review" // Or Edit Review
                  color={loading ? colors.lightgray : colors.black}
                  size="small"
                  disabled={loading} // only allow edits if review is alr written
                  onPress={() => {
                    // If-else for write new review or edit prior review
                    // console.log("Button for write review pressed!")
                    props.navigation.navigate("ReviewInput", { selectedSpace })
                  }} />
              </View>
            }
            {hostConfirmed &&
              <View style={{ margin: 10 }}>
                <Button.BtnContain
                  testID="cancel-booking"
                  label={booking.cancelled ? "Booking Cancelled" :
                    (isHostAbleToCancel || isUserAbleToCancel || isBookingInProgress) ? "Cancel Booking" :
                      "Booking Completed"}
                  color={(booking.cancelled ? true :
                    loading || !(isHostAbleToCancel || isUserAbleToCancel)) ? colors.lightgray : colors.black}
                  size="small"
                  disabled={booking.cancelled ? true :
                    loading || !(isHostAbleToCancel || isUserAbleToCancel)}
                  onPress={cancelBookingBox} />
              </View>
            }
            {!hostConfirmed && host &&
              <View style={{ margin: 10 }}>
                {/* Approve/Reject booking (host only) */}
                <Button.BtnContain
                  testID="approve-booking"
                  label={"Approve Booking"}
                  color={loading ? colors.lightgray : colors.black}
                  size="small"
                  disabled={loading} //
                  onPress={() => {
                    Alert.alert(
                      "Approve Booking",
                      'Are you sure you want to approve this booking?', [
                      {
                        text: "Cancel",
                        onPress: () => approveBooking(bookingId),
                        style: "cancel"
                      }, {
                        text: "Confirm",
                        onPress: () => rejectBooking(bookingId),
                        style: "cancel"
                      }
                    ])
                  }} />
                <Button.BtnContain
                  testID="reject-booking"
                  label={"Reject Booking"}
                  color={loading ? colors.lightgray : colors.black}
                  size="small"
                  disabled={loading} //
                  onPress={() => {
                    Alert.alert(
                      "Reject Booking",
                      'Are you sure you want to reject this booking?', [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      }, {
                        text: "Confirm",
                        onPress: () => console.log('Host rejected this booking! ' + bookingId),
                        style: "cancel"
                      }
                    ])
                  }} />
              </View>}
          </Main2>
        </Main>
      </Container >
    );
  }
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.ScrollView`
`;

const Main2 = styled.View`
  padding: 24px;
`;

const Checkin = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px 20px 0;
`;
const HLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightgray};
`;

const Host = styled.View`
  margin: 10px 0;
`;

const Reservation = styled.View`
  padding: 20px 0;
`;

const Rules = styled.View`
  padding: 20px 0;
`;

const CancellationPolicy = styled.View`
  padding: 20px 0;
`;

const styles = StyleSheet.create({
  map: {
    height: 184,
  },
});

const mapStateToProps = (state) => {
  return {
    state: state.search,
  };
};
const mapDispatchProps = (dispatch) => bindActionCreators({ setSelectedSpace, fetchBooking }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(BookingDetails);
