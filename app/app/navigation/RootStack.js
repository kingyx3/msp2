import React, { useEffect, useState } from 'react';

//import navigation
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './HomeTab';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
//import screens
import SearchStackModal from './SearchStackModal'
import ListStackModal from './ListStackModal';
import HostStackModal from './HostStackModal'
import MessageStackModal from "../navigation/MessageStackModal";
import BookingStackModal from "../navigation/BookingStackModal"
import AccountStackModal from "../navigation/AccountStackModal"
import { fetchUser, fetchIpLocation, fetchUserSpaces, fetchUserBookings, fetchUserMessages, fetchSpaceTypes, fetchUserLogs, fetchUserHostingLogs, fetchPendingHost, stopFetchPendingHost } from "../components/Firebase/firebase"
//import styles and assets
import styled from 'styled-components/native';
// import { EvilIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();
const RootStack = (props) => {
    const host = useSelector(state => state.user.user.accountId);
    useEffect(() => {
        const getData = async () => {
            props.fetchUser() // Firestore
            props.fetchSpaceTypes() // RTDB
            props.fetchIpLocation() // 3rd Party
            props.fetchUserBookings() // Firestore
            props.fetchUserMessages() // RTDB
            props.fetchUserLogs() // Firestore
            if (host) {
                console.log('User is a host, calling host-related subscriptions on RootStack')
                //  Host-only
                props.fetchUserSpaces() // Firestore
                props.fetchUserHostingLogs() // Firestore
                props.fetchPendingHost(); // RTDB
            }
        }
        getData()
    })

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeTab"
                component={HomeTab}
                options={{ headerShown: false, headerTitle: (props) => <StatusBar {...props} /> }}
            />
            <Stack.Screen
                name="SearchStackModal"
                component={SearchStackModal}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="ListStackModal"
                component={ListStackModal}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="HostStackModal"
                component={HostStackModal}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="MessageStackModal"
                component={MessageStackModal}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="BookingStackModal"
                component={BookingStackModal}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name="AccountStackModal"
                component={AccountStackModal}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
        </Stack.Navigator>
    )
};

const IconWrapper = styled.View`
  margin-left: ${Platform.OS === 'ios' ? '15px' : 0};
`;

const mapDispatchProps = (dispatch) => bindActionCreators({
    fetchUser,
    fetchIpLocation, fetchUserSpaces, fetchUserBookings, fetchUserLogs,
    fetchUserHostingLogs, fetchUserMessages, fetchSpaceTypes, fetchPendingHost, stopFetchPendingHost
}, dispatch);
export default connect(null, mapDispatchProps)(RootStack);