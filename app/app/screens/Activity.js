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
// import { Icon } from 'react-native-elements';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import components
//import screens
//import styles and assets
import styled from 'styled-components/native';
import * as List from "../components/List";
import colors from '../config/colors';
import { H, P } from "../config/Typography";

const { width, height } = Dimensions.get('window');

const UserActivity = (props) => {
  // const user = props.state.user
  const userLogs = props.state.userLogs
  const userHostingLogs = props.state.userHostingLogs
  // console.log(userLogs)
  const { host } = props.route.params
  const userBookingLogsArray = Object.values(userLogs).sort((a, b) => new Date(b.created) - new Date(a.created))
  const userHostingLogsArray = Object.values(userHostingLogs).sort((a, b) => new Date(b.created) - new Date(a.created))
  // console.log(userBookingLogsArray)
  const logsArray = host ? userHostingLogsArray : userBookingLogsArray

  function calcAmount(item, host) {
    const platformFee = (item?.amount?.total_price - item?.amount?.subtotal)

    if (host) {
      switch (item?.logType) {
        case 'cancelBooking':
          // POV host - booking cancelled
          return '- SGD ' + (item?.amount?.hostEarnings);
        case 'createBooking':
          // POV host - booking created
          return '+ SGD ' + item?.amount?.hostEarnings;
        default:
          // other alternatives have no amount value
          return '';
      }
    } else {
      switch (item?.logType) {
        case 'cancelBooking':
          // POV user - booking cancelled
          return (item?.amount?.refundAmount == 0) ? "" : ('+ SGD ' + item?.amount?.refundAmount)
        case 'createBooking':
          // POV user - booking created
          return '- SGD ' + item?.amount?.total_price;
        case 'topUpWallet':
          // POV user - top up wallet
          return '+ SGD ' + item?.amount?.total_price;
        default:
          // other alternatives have no amount value
          return '';
      }
    }
  }

  const renderItem = ({ item, index }) =>
    <List.LogsList
      title={item?.title}
      testID={index.toString() + "_" + (host ? 'host' : 'user') + "_log"}
      created={moment(item?.created).format('DD MMM YYYY hh:mm A')}
      message={item?.message}
      positive={host
        ? (item?.logType == 'createBooking')
        : (item?.logType == 'topUpWallet' || item?.logType == 'cancelBooking')}
      logType={item?.logType}
      secondary={item?.bookingIdShort}
      amount={calcAmount(item, host)}
      onPress={() => {
        // console.log(item)
        if (item.logType == "createBooking" || item.logType == "createBookingPending" || item.logType == "cancelBooking") {
          // Navigate to bookingDetail with props
          props.navigation.navigate('BookingStackModal', {
            screen: 'BookingDetail',
            params: {
              bookingId: item.bookingId,
              spaceId: item.spaceId,
              host
            }
          });
        } else if (item.logType == "createSpace" || item.logType == "updateSpace" || item.logType == "enableSpace" || item.logType == "disableSpace" || item.logType == "updateBlocked") {
          // Navigate to spaceDetail with props
          props.navigation.navigate('HostStackModal', {
            screen: 'SpaceDetail', params: {
              spaceId: item.spaceId
            }
          });
        } else {
          // For no navigation logTypes i.e. topup etc
          null
        }
      }}
    />

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <Header testID='activity-header-component'>
            <H color={colors.red}>{logsArray.length == 0 ? 'No activity yet!' : ((host ? 'Hosting' : 'Booking') + ' activity')}</H>
          </Header>
        }
        data={logsArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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
    state: state.user,
  };
};

// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ fetchUserLogs }, dispatch);
// export default connect(mapStateToProps, mapDispatchProps)(UserLogs);

export default connect(mapStateToProps, null)(UserActivity);
