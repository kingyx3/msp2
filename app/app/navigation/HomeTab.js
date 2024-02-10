import React from "react";

//import navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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


//import styles and assets
import { EvilIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeTab = () => (
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
      }}
    />
    <Tab.Screen
      name="Bookings"
      component={Bookings}
      options={{
        tabBarTestID: 'btm-nav-bookings',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <EvilIcons name="calendar" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Hosting"
      component={Hosting}
      options={{
        tabBarTestID: 'btm-nav-hosting',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <EvilIcons name="chart" color={color} size={size} />
        ),
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
      }}
    />
  </Tab.Navigator>
);

export default HomeTab;
