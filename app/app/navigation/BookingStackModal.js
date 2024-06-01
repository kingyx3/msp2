import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookingDetail from "../screens/BookingDetail";
import ReviewInput from "../screens/ReviewInput";

const Stack = createStackNavigator();

const BookingStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewInput"
        component={ReviewInput}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BookingStack;