import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import moment from 'moment';
import * as Linking from 'expo-linking';
import * as List from "../components/List";
import * as Button from "../components/Button";
import ActivityIndicator from '../components/ActivityIndicator';
import { NavBar } from "../components/NavBar";
import * as Network from 'expo-network';
import styled from "styled-components/native";
import * as Typography from "../config/Typography";
import colors from "../config/colors";
import {
  setSelectedSpace,
  fetchBooking,
  cancelBooking,
  getUserName,
  getAvatarLink,
  showOfflineAlert,
  approveBooking,
} from "../components/Firebase/firebase";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

const BookingDetails = (props) => {
  const { bookingId, spaceId, host } = props.route.params;
  const { selectedBooking: booking, selectedSpace } = props.state;
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [hostName, setHostName] = useState('');

  const address = selectedSpace?.location?.description;
  const postcode = selectedSpace?.location?.geoapify?.postcode;
  const cancelByTime = host ? moment(booking?.end).add(5, 'days') : moment(booking?.start).subtract(booking?.cancellationPolicy?.numberOfHours, 'hours');
  const cancelByTimeFormatted = cancelByTime.format('DD MMM YYYY, ha');

  const isHostAbleToCancel = host && moment(booking?.end).add(5, 'days').isAfter(Date.now());
  const isUserAbleToCancel = !host && moment(booking.start).isAfter(Date.now());
  const isBookingInProgress = moment().isBetween(moment(booking.start), moment(booking.end));

  let refundAmount = 0;
  if (!host) {
    refundAmount = (moment().isBefore(cancelByTime) || booking.status === "pending_host") ? booking?.price?.total_price * 100 : 0;
  } else {
    refundAmount = booking?.price?.total_price * 100;
  }

  useEffect(() => {
    const fetchUserNames = async () => {
      if (spaceId === selectedSpace.id) {
        const hostName = await getUserName(selectedSpace.userId);
        setHostName(hostName);
      } else {
        props.setSelectedSpace(spaceId);
      }
      if (bookingId === booking.id) {
        const userName = await getUserName(booking.userId);
        setUserName(userName);
      } else {
        props.fetchBooking(bookingId);
      }
    };
    fetchUserNames();
  }, [selectedSpace, booking]);

  const openMaps = (latitude, longitude, label) => {
    const scheme = Platform.select({ ios: 'maps://app?daddr=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({ ios: `${scheme}${latLng}&q=${label}`, android: `${scheme}${latLng}(${label})` });
    Linking.openURL(url);
  };

  const cancelBookingBox = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      Alert.alert(
        "Cancel Booking",
        host
          ? `Do you want to cancel this booking? Your potential earnings will be reduced by $${booking?.price?.hostEarnings.toFixed(2)} if you cancel now.`
          : `Do you want to cancel this booking? $${(refundAmount / 100).toFixed(2)} will be refunded to your wallet if you cancel now.`,
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            onPress: async () => {
              setLoading(true);
              try {
                await cancelBooking(bookingId);
                Alert.alert("Booking Cancelled!", "Success", [{ text: "OK", onPress: () => { setLoading(false); props.navigation.goBack(); } }]);
              } catch {
                Alert.alert("Booking Cancellation Error!", 'Please try again later.', [{ text: "OK", onPress: () => { setLoading(false); props.navigation.goBack(); } }]);
                setLoading(false);
              }
            }
          }
        ]
      );
    } else {
      showOfflineAlert();
    }
  };

  if (!selectedSpace || !booking || !hostName || !userName) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  return (
    <Container>
      <NavBar testID="back-button-booking-detail" nav="chevron-left" onPress={() => props.navigation.goBack()} />
      <Main testID="booking-detail-scroll-view">
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          style={styles.map}
          minZoomLevel={12}
          maxZoomLevel={15}
          onPress={() => openMaps(selectedSpace.location.latitude, selectedSpace.location.longitude, selectedSpace.title)}
          region={{
            latitude: selectedSpace.location.latitude,
            longitude: selectedSpace.location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={{ latitude: selectedSpace.location.latitude, longitude: selectedSpace.location.longitude }} />
        </MapView>
        <Main2>
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Typography.H3 testID="booking-title">{selectedSpace.title} </Typography.H3>
              <Typography.H3 testID="booking-price">(${host ? booking?.price?.hostEarnings : booking?.price?.total_price})</Typography.H3>
            </View>
            <Typography.Sub1>{selectedSpace.spaceType + ' #' + (booking.courtId + 1)}</Typography.Sub1>
            <Typography.pS>{`Address: ${address} ${postcode || ''}`}</Typography.pS>
            <Typography.pS>{selectedSpace.location.user.unit ? `Unit: #${selectedSpace.location.user.unit}` : ''}</Typography.pS>
          </View>
          <HLine />
          <Checkin>
            <View style={{ paddingRight: 10 }}>
              <Typography.Cap color={colors.gray}>Booking Date</Typography.Cap>
              <Typography.Sub1 testID="booking-date">{moment(booking.start).format("DD MMM YYYY")}</Typography.Sub1>
            </View>
            <View>
              <Typography.Cap color={colors.gray}>Booking Time</Typography.Cap>
              <Typography.Sub1 testID="booking-time">{`${moment(booking.start).format("ha")} to ${moment(booking.end).format("ha")}`}</Typography.Sub1>
            </View>
          </Checkin>
          <HLine />
          <Reservation>
            <Typography.Cap color={colors.gray} style={{ marginBottom: 6 }}>
              Reservation number
            </Typography.Cap>
            <Typography.Sub1 selectable>{booking.bookingIdShort}</Typography.Sub1>
          </Reservation>
          <HLine />
          <Rules>
            <Typography.Cap color={colors.gray}>Description</Typography.Cap>
            <Typography.P>{selectedSpace.description}</Typography.P>
          </Rules>
          <HLine />
          <CancellationPolicy>
            <Typography.Cap color={colors.gray}>Cancellation Policy</Typography.Cap>
            {booking.status === "pending_host" && <Typography.Sub1 testID="cancellation-policy2">Full refund for bookings pending confirmation</Typography.Sub1>}
            <Typography.Sub1 testID="cancellation-policy">{host ? `Cancel by ${cancelByTimeFormatted} to refund your guest` : `Cancel by ${cancelByTimeFormatted} for free`}</Typography.Sub1>
          </CancellationPolicy>
          <HLine />
          <Host>
            <List.UserList
              testID="host-or-user"
              title={host ? `Booked by ${userName}` : `Hosted by ${hostName}`}
              secondary={`Member since: ${moment(host ? booking?.userCreated : selectedSpace?.userCreated).format("MMM YYYY")}`}
              image={host ? getAvatarLink(booking.userId) : getAvatarLink(selectedSpace.userId)}
            />
          </Host>
          {booking.status !== "cancelled" && moment().diff(moment(booking.end), 'days') < 5 && (
            <View style={{ margin: 10 }}>
              <Button.BtnContain
                testID="contact-host-or-user"
                label={host ? "Contact User" : "Contact Host"}
                color={loading ? colors.lightgray : colors.black}
                size="small"
                disabled={loading}
                onPress={() => {
                  props.navigation.navigate("MessageStackModal", {
                    screen: 'MessageDetail',
                    params: {
                      selectedChat: {
                        otherUserId: host ? booking.userId : selectedSpace.userId,
                        otherUserName: host ? userName : hostName,
                      },
                    },
                  });
                }}
              />
            </View>
          )}
          {!host && booking.status === "confirmed" && moment().isAfter(booking.end) && moment().diff(moment(booking.end), 'days') < 2 && (
            <View style={{ margin: 10 }}>
              <Button.BtnContain
                testID="write-review"
                label="Write Review"
                color={loading ? colors.lightgray : colors.black}
                size="small"
                disabled={loading}
                onPress={() => props.navigation.navigate("ReviewInput", { selectedSpace })}
              />
            </View>
          )}
          {(host || (!host && booking.status !== "pending_host")) && (
            <View style={{ margin: 10 }}>
              <Button.BtnContain
                testID="cancel-booking"
                label={
                  booking.status.includes("cancelled")
                    ? "Booking Cancelled"
                    : (isHostAbleToCancel || isUserAbleToCancel || isBookingInProgress)
                      ? (booking.status === "pending_host" ? "Cancel Pending" : "Cancel Booking")
                      : "Booking Completed"
                }
                color={(booking.status.includes("cancelled") ? true : loading || !(isHostAbleToCancel || isUserAbleToCancel)) ? colors.lightgray : colors.black}
                size="small"
                disabled={booking.status.includes("cancelled") ? true : loading || !(isHostAbleToCancel || isUserAbleToCancel)}
                onPress={cancelBookingBox}
              />
            </View>
          )}
          {booking.status === "pending_host" && host && (
            <View style={{ margin: 10 }}>
              <Button.BtnContain
                testID="approve-booking"
                label="Approve Booking"
                color={loading ? colors.lightgray : colors.black}
                size="small"
                disabled={loading}
                onPress={() => {
                  Alert.alert(
                    "Approve Booking",
                    'Are you sure you want to approve this booking?',
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Confirm",
                        onPress: async () => {
                          setLoading(true);
                          try {
                            await approveBooking(bookingId);
                            Alert.alert("Booking Approved!", "Success", [{ text: "OK", onPress: () => { setLoading(false); props.navigation.goBack(); } }]);
                          } catch {
                            Alert.alert("Booking Approval Error!", 'Please try again later.', [{ text: "OK", onPress: () => { setLoading(false); props.navigation.goBack(); } }]);
                            setLoading(false);
                          }
                        }
                      }
                    ]
                  );
                }}
              />
              <Button.BtnContain
                testID="reject-booking"
                label="Reject Booking"
                color={loading ? colors.lightgray : colors.black}
                size="small"
                disabled={loading}
                onPress={() => {
                  Alert.alert(
                    "Reject Booking",
                    'Are you sure you want to reject this booking?',
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Confirm",
                        onPress: async () => {
                          setLoading(true);
                          try {
                            await cancelBooking(bookingId);
                            Alert.alert("Booking Rejected!", "Success", [{ text: "OK", onPress: () => { setLoading(false); props.navigation.goBack(); } }]);
                          } catch {
                            Alert.alert("Booking Rejection Error!", 'Please try again later.', [{ text: "OK", onPress: () => { setLoading(false); props.navigation.goBack(); } }]);
                            setLoading(false);
                          }
                        }
                      }
                    ]
                  );
                }}
              />
            </View>
          )}
        </Main2>
      </Main>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.ScrollView``;

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

const mapStateToProps = (state) => ({
  state: state.search,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setSelectedSpace, fetchBooking }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetails);