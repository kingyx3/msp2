import React, { useEffect, useState } from 'react';

//import navigation
import { createStackNavigator } from '@react-navigation/stack';
// import HomeTab from './HomeTab';
// import ListStack from './ListStack';
import { Platform } from 'react-native';
//import screens
import Home from "../screens/Searching/Home";
import TopUp from '../screens/Searching/TopUp';
import RangePicker from '../screens/Searching/RangePicker';
import Listings from '../screens/Searching/Listings';
import ListMap from '../screens/Searching/ListMap';
//import AddGuest from "../screens/AddGuest";
//import styles and assets
import styled from 'styled-components/native';
// import { EvilIcons } from '@expo/vector-icons';
// import { connect } from "react-redux";
// import { bindActionCreators } from 'redux'

const Stack = createStackNavigator();

const HomeStack = (props) => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home "
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopUp"
        component={TopUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Listings"
        component={Listings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListMap"
        component={ListMap}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
};

const IconWrapper = styled.View`
  margin-left: ${Platform.OS === 'ios' ? '15px' : 0};
`;

export default HomeStack;