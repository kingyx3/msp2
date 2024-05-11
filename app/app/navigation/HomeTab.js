import React from "react";
import { View, Text } from "react-native";
//import navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import HomeStack from "./HomeStack";
// import BookingStack from "./BookingStack";
// import MessageStack from "../navigation/MessageStack";
// import AccountStack from "./AccountStack";

//import screens
// import Home from "../screens/Searching/Home";
import Hosting from "../screens/Hosting/Hosting";
import Accounts from "../screens/Accounts";
import Messages from "../screens/Messages";
import Bookings from "../screens/Bookings";
// import AccountStack from "./AccountStack";
import colors from "../config/colors";
import * as Typography from "../config/Typography";
import styled from "styled-components/native";

//import styles and assets
import { EvilIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const BookingTopTab = (props) =>
  <Container>
    <Header>
      <Typography.H color={colors.red}>Bookings</Typography.H>
    </Header>
    <TopTab.Navigator>
      <TopTab.Screen name="Upcoming" component={Bookings} initialParams={{ history: false, hostConfirmed: true }} />
      <TopTab.Screen name="Pending" component={Bookings} initialParams={{ history: false, hostConfirmed: false }} />
      <TopTab.Screen name="History" component={Bookings} initialParams={{ history: true, hostConfirmed: true }} />
    </TopTab.Navigator>
  </Container>


const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  padding: 24px 24px;
`;

const HomeTab = () => {
  const pendingHostTotalCount = useSelector(state => state.user.pendingHostTotalCount);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70
        },
        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarTestID: 'btm-nav-home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="search" color={color} size={size} />
          ),
          tabBarLabel: 'Search'
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingTopTab}
        options={{
          tabBarTestID: 'btm-nav-bookings',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="calendar" color={color} size={size} />
          ),
          tabBarLabel: 'Bookings'
        }}
      />
      <Tab.Screen
        name="Hosting"
        component={Hosting}
        options={{
          tabBarTestID: 'btm-nav-hosting',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <EvilIcons name="chart" color={color} size={size} />
              {pendingHostTotalCount > 0 && (
                <View
                  style={{
                    backgroundColor: colors.red,
                    borderRadius: 10,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 10 }}>{pendingHostTotalCount}</Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: 'Hosting'
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarTestID: 'btm-nav-messages',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="comment" color={color} size={size} />
          ),
          tabBarLabel: 'Messages'
        }}
      />
      <Tab.Screen
        name="Account"
        component={Accounts}
        options={{
          tabBarTestID: 'btm-nav-account',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="user" color={color} size={size} />
          ),
          tabBarLabel: 'Account'
        }}
      />
    </Tab.Navigator>
  )
};

export default HomeTab;
