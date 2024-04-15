import React, { useEffect, useState } from 'react';

//import navigation
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
//import screens
import RangePicker from '../screens/Searching/RangePicker';
import SpaceTypePicker from '../screens/Searching/SpaceTypePicker';
//import styles and assets
import styled from 'styled-components/native';
// import { EvilIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const SearchStackModal = (props) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SpaceTypePicker"
                component={SpaceTypePicker}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RangePicker"
                component={RangePicker}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
};

const IconWrapper = styled.View`
  margin-left: ${Platform.OS === 'ios' ? '15px' : 0};
`;

export default SearchStackModal