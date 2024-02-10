import React, { useEffect, useState } from 'react';

//import navigation
import { createStackNavigator } from '@react-navigation/stack';
import HomeTab from './HomeTab';
import { Platform } from 'react-native';
//import screens
import SearchStackModal from './SearchStackModal'
import ListStackModal from './ListStackModal';
import HostStackModal from './HostStackModal'
import MessageStackModal from "../navigation/MessageStackModal";
import BookingStackModal from "../navigation/BookingStackModal"
import AccountStackModal from "../navigation/AccountStackModal"
import { fetchUser, fetchIpLocation, fetchUserSpaces, fetchUserBookings, fetchUserMessages, fetchSpaceTypes } from "../components/Firebase/firebase"
//import styles and assets
import styled from 'styled-components/native';
// import { EvilIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();
const RootStack = (props) => {

    useEffect(() => {
        props.fetchUser()
        props.fetchIpLocation()
        props.fetchUserSpaces()
        props.fetchUserBookings()
        props.fetchUserMessages()
        props.fetchSpaceTypes()
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

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchIpLocation, fetchUserSpaces, fetchUserBookings, fetchUserMessages, fetchSpaceTypes }, dispatch);
export default connect(null, mapDispatchProps)(RootStack);