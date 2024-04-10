import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View } from "react-native";
// import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment'
import * as Network from 'expo-network';
import { showOfflineAlert } from "../components/Firebase/firebase";

//import components
import * as Cards from "../components/Cards";

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
  userBookings = userBookings
    .filter((userBooking) => history ? (userBooking.end < Date.now() || userBooking.cancelled) : userBooking.end > Date.now())
    .filter((userBooking) => hostConfirmed ? userBooking.hostConfirmed : !(userBooking.hostConfirmed))
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
          <View style={{ padding: 24 }}>
            <Cards.Default
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
            />
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
