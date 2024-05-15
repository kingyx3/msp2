import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  Modal,
  // SafeAreaView,
  // StyleSheet,
  View,
  // Pressable,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import components
import { camelToFlat, fetchSpaceBookings } from '../../components/Firebase/firebase';

//import screens
//import styles and assets
import styled from 'styled-components/native';
import * as List from "../../components/List";
import colors from '../../config/colors';
import { H, P } from "../../config/Typography";

const { width, height } = Dimensions.get('window');

const SpaceBookings = (props) => {
  const { spaceId, history, pending } = props.route.params
  const spaceBookingsArray = (props.state.spaceBookings)
    .filter((spaceBooking) => history ? (spaceBooking.end < Date.now() || spaceBooking.cancelled) : spaceBooking.end > Date.now() && !spaceBooking.cancelled)
    .filter((spaceBooking) => pending ? spaceBooking.status == 'pending_host' : !(spaceBooking.status == 'pending_host'))
    .sort((a, b) => new Date(b.start) - new Date(a.start))
  // console.log(spaceBookingsArray)
  let sum = 0
  spaceBookingsArray.forEach(spaceBooking => {
    if(spaceBooking.status.includes("confirmed") ||spaceBooking.status == "pending_host") { 
    sum += spaceBooking.price.hostEarnings
}
  });

  useEffect(() => {
    props.fetchSpaceBookings(spaceId)
  }, []);

  const renderItem = ({ item, index }) =>
    <List.Default
      title={
        "Booking Ref: " + item.bookingIdShort
      } //user2.name
      secondary={('$' + item?.price?.hostEarnings.toString()
        + "("
        + (item.status.includes("cancelled")
          ? "Cancelled"
          : item.status == "pending_host"
            ? "Pending"
            : item.status == "confirmed"
              ? "Confirmed"
              : item.status == "confirmed_paid"
                ? "Confirmed & Paid"
                : "")
        + ")")
      } // bugs out if message is an empty
      // image={item?.otherUserAvatar}
      meta={[moment(item.start).format("DD-MMM-YYYY, hA"), '-', moment(item.end).format("hA")]}
      onPress={() => props.navigation.navigate("BookingStackModal", {
        screen: 'BookingDetail',
        params: {
          bookingId: item.id,
          spaceId,
          host: true
        }
      })} />

  return (
    <Container>
      <FlatList
        testID='space-bookings-flatlist'
        ListHeaderComponent={
          <Header>
            {/* <H color={colors.red}>Bookings</H> */}
            <P color={colors.black}>{history ? `Total Earned: $${(Math.round(sum * 100) / 100).toFixed(2)}` : `Potential Earnings: $${(Math.round(sum * 100) / 100).toFixed(2)}`}</P>
          </Header>
        }
        data={spaceBookingsArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      {/* <FlatList
        data={spaceBookingsArray}
      /> */}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 10px 24px 0;
`;

// const EventText = styled.Text`
//   fontSize: 12px;
//   color: black;
//   textAlign: center;
// `;

// const CenteredTouchableOpacity = styled.TouchableOpacity`
//   flex: 1;
//   justifyContent: center;
//   alignItems: center;
// `;

const ModalView = styled.View`
  flex: 1;
  margin: ${width * 0.1}px;
  marginTop: ${height * 0.35}px;
  marginBottom: ${height * 0.35}px;
  backgroundColor: white;
  borderRadius: 10px;
  padding: 25px;
  alignItems: center;
  shadowOpacity: 0.25;
`;

const Flex = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Step = styled.View`
  margin: 20px 0;
`;

const Header = styled.View`
  padding: 24px 0;
`;

const mapStateToProps = (state) => {
  return {
    state: state.host,
  };
};

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchSpaceBookings }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(SpaceBookings);