import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View } from "react-native";
// import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment'
import * as Network from 'expo-network';
import { showOfflineAlert } from "../components/Firebase/firebase";

//import components
import * as Cards from "../components/Cards";
import MapCard from "../components/MapCard";

//import styles and icons
import styled from "styled-components/native";
import * as Typography from "../config/Typography";
import colors from "../config/colors";

//import data
import { connect } from "react-redux";
// import { rooms } from "../data/tripdata";
import { Switch } from 'react-native-elements';

const Bookings = (props) => {
  const [switchOn, setSwitchOn] = useState(false)
  let { history, hostConfirmed } = props.route.params
  let userBookings = props.state.userBookings
  userBookings = Object.values(userBookings)
  // Upcoming (history false, hostConfirmed true) - status = "confirmed" && userBooking.start > Date.now()
  // Pending (history false, hostConfirmed false) - status = "pending_host" && userBooking.start > Date.now()
  // History (history true, hostConfirmed true/false) - status = "cancelled_by_host" || status = "cancelled_by_user" || userBooking.start < Date.now()

  userBookings = userBookings
    .filter((userBooking) =>
      history
        ? (userBooking.cancelled || userBooking.start < Date.now()) // History
        : hostConfirmed
          ? userBooking.hostConfirmed && userBooking.start > Date.now() && !(userBooking.cancelled) // Upcoming
          : !(userBooking.hostConfirmed) && userBooking.start > Date.now() && !(userBooking.cancelled)) // Pending
    .sort((a, b) => new Date(b.start) - new Date(a.start)); //latest appear on top
  // userBookings = userBookings.slice(0, 10) //load only the first 10 spaces

  return (
    <Container>
      <FlatList
        testID="bookings-scroll-view"
        ListHeaderComponent={
          <Header testID="bookings-header-component">
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography.H color={colors.red}>{'Bookings'}</Typography.H>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography.Cap color={colors.black}>{(switchOn ? 'Show Upcoming' : 'Show All') + '  '}</Typography.Cap>
                <Switch
                  testID="show-all-bookings-switch"
                  value={switchOn}
                  onValueChange={() => setSwitchOn(!switchOn)}
                  color={'purple'}
                  thumbColor={'white'}
                />
              </View>
            </View> */}
            {userBookings.length == 0 &&
              <Typography.P color={colors.black}>{(!history && hostConfirmed) ? 'You have no upcoming bookings' : ((history && hostConfirmed) ? 'You have no past bookings' : 'You have no pending bookings')}</Typography.P>
            }
          </Header>
        }
        stickyHeaderIndices={[0]}
        data={userBookings}
        extraData={userBookings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) =>
          <View style={{ paddingLeft: 24, paddingRight: 24 }}>
            <MapCard
              testID={index.toString() + "_booking_detail"}
              key={index.toString()}
              image={item.images}
              property={"Booking Ref: " + item.id.toUpperCase().slice(-6)}
              title={item.spaceType}
              subtitle={item.periodPrice}
              description={[moment(item.start).format("DD-MMM-YYYY, hA"), '-', moment(item.end).format("hA")]}
              // rating={item.rating}
              // reviews={item.reviews} // number of reviews
              onPress={async () => {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                  // Device is connected to the internet
                  // console.log({
                  //   bookingId: item.id,
                  //   spaceId: item.spaceId,
                  //   host: false
                  // })
                  props.navigation.navigate("BookingStackModal", {
                    screen: 'BookingDetail',
                    params: {
                      bookingId: item.id,
                      spaceId: item.spaceId,
                      host: false
                    }
                  })
                } else {
                  // Device is not connected to the internet
                  showOfflineAlert()
                }
              }} //pass marker info?
            />

            {/* <Cards.Default
              testID={index.toString() + "_booking_detail"}
              image={item.images}
              // sub={handleDate(item)}
              title={item.spaceType} //item.city
              secondary={[moment(item.start).format("DD-MMM-YYYY hA"), ' to ', moment(item.end).format("hA")]} //item.title
              action={item.cancelled ? "View cancelled booking details" : "View booking details"}
              onPress={async () => {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                  // Device is connected to the internet
                  // console.log({
                  //   bookingId: item.id,
                  //   spaceId: item.spaceId,
                  //   host: false
                  // })
                  props.navigation.navigate("BookingStackModal", {
                    screen: 'BookingDetail',
                    params: {
                      bookingId: item.id,
                      spaceId: item.spaceId,
                      host: false
                    }
                  })
                } else {
                  // Device is not connected to the internet
                  showOfflineAlert()
                }
              }}
            /> */}
          </View>
        }
      />
    </Container>
  )
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
`;

const mapStateToProps = (state) => {
  return {
    state: state.user,
  };
};

export default connect(mapStateToProps)(Bookings);
