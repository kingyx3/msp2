import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//import screens
import { Platform, View } from "react-native";
import Bookings from "../screens/Bookings";
import BookingDetail from "../screens/BookingDetail";
import ReviewInput from "../screens/ReviewInput";
import MessageDetail from "../screens/MessageDetail";
import { NolineNavBar } from "../components/NavBar";

//import styles, icons
import styled from "styled-components/native";

const Stack = createStackNavigator();

const BookingStack = ({ navigation, route }) => {
  // if (route.state) {
  //   navigation.setOptions({
  //     tabBarVisible: route.state.index > 0 ? false : true,
  //   });
  // }
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Bookings "
        component={Bookings}
        options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ReviewInput"
        component={ReviewInput}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingStack;
