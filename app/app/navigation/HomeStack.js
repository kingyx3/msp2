import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

// Import screens
import Home from '../screens/Searching/Home';
import TopUp from '../screens/Searching/TopUp';
import Listings from '../screens/Searching/Listings';
import ListMap from '../screens/Searching/ListMap';

const Stack = createStackNavigator();

const HomeStack = () => {
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
  );
};

const IconWrapper = styled.View`
  margin-left: ${Platform.OS === 'ios' ? '15px' : 0};
`;

export default HomeStack;