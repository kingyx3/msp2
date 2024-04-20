import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  // Modal,
  // SafeAreaView,
  // StyleSheet,
  // View,
  // Pressable,
  // Text,
  Alert,
  FlatList,
  // TouchableOpacity,
  // TouchableWithoutFeedback,
} from 'react-native';
import { enableSpace, disableSpace, showOfflineAlert, getTimingDiffFromUTC } from "../../components/Firebase/firebase";
import * as Network from 'expo-network';

//import screens
//import styles and assets
import styled from 'styled-components/native';
import * as List from "../../components/List";
import colors from '../../config/colors';
import { H, P } from "../../config/Typography";
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SpaceManagement = (props) => {
  const [loading, setLoading] = useState(false)
  const { selectedSpace, editMode } = props.route.params
  const { startTime, endTime } = getOpeningHours(selectedSpace?.openingHours)

  const SpaceManagementItems = [
    {
      title: "Manage Calendar", icon: "calendar-month", screen: "SpaceAvailability", data: {
        selectedSpace,
        rules: { startTime, endTime }
      }
    },
    { title: "View Bookings", icon: "history", screen: "SpaceBooking", data: { spaceId: selectedSpace.id, needHostConfirm: selectedSpace.needHostConfirm } },
    { title: "Edit Space Details", icon: "application-edit-outline", screen: "HostingEdit2", data: { selectedSpace, editMode } },
    { title: selectedSpace.disabled ? "Enable Space" : "Disable Space", icon: selectedSpace.disabled ? "plus-circle-outline" : "minus-circle-outline", screen: "" },
  ]

  const renderItem = ({ item, index }) =>
    <List.Default
      title={item.title}
      testID={index.toString() + "_manage_space_item"}
      icon={item.icon}
      onPress={async () => {
        const networkState = await Network.getNetworkStateAsync();
        if (networkState.isConnected) {
          // Device is connected to the internet
          if (item.screen && !loading) {
            props.navigation.navigate(item.screen, item.data)
          } else if (!loading) {
            setLoading(true)
            Alert.alert(
              (selectedSpace.disabled ? 'Enable' : 'Disable') + ' Space',
              (selectedSpace.disabled
                ? 'Are you sure you want to enable this space?'
                : 'Are you sure you want to disable this space? No new bookings can be made until it is re-enabled. Existing bookings will remain active unless cancelled individually.'),
              [
                { text: 'Cancel', onPress: () => setLoading(false), style: 'cancel' },
                {
                  text: 'OK', onPress: async () => {
                    await selectedSpace.disabled
                      ? enableSpace(selectedSpace.id)
                        .then(() => {
                          props.navigation.navigate("Hosting")
                          setLoading(false)
                        })
                      : disableSpace(selectedSpace.id)
                        .then(() => {
                          props.navigation.navigate("Hosting")
                          setLoading(false)
                        })
                  }
                },
              ],
              { cancelable: false }
            )
          }
        } else {
          // Device is not connected to the internet
          showOfflineAlert()
        }
      }}
    />

  return (
    <Container>
      <FlatList
        testID='manage-space-flatlist'
        ListHeaderComponent={
          <Header>
            <H color={colors.red}>Manage Space</H>
          </Header>
        }
        data={SpaceManagementItems}
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

export default SpaceManagement

function getOpeningHours(openingHoursArray) {
  if (openingHoursArray) {
    let minStartHour = 24;
    let maxEndHour = 0
    for (let i = 0; i < 7; i++) {
      const dayHours = openingHoursArray.slice(i * 24, (i + 1) * 24);
      for (let j = 0; j < 24; j++) {
        if (dayHours[j] !== 0) {
          // console.log(j)
          if (minStartHour > j) {
            minStartHour = j
          } else if (maxEndHour < j) {
            maxEndHour = j
          }
        }
      }
    }
    const startTime = minStartHour + getTimingDiffFromUTC()
    const endTime = maxEndHour + getTimingDiffFromUTC()
    return { startTime, endTime };
  }
}