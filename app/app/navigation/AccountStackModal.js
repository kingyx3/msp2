import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Platform } from "react-native";
//import screens
import Accounts from "../screens/Accounts";
import Activity from "../screens/Activity";
import BookingDetail from "../screens/BookingDetail";
import ReviewInput from "../screens/ReviewInput";
import MessageDetail from "../screens/MessageDetail";

//import syltes and assets
import { EvilIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const ActivityTopTab = (props) => {
  // const { spaceId } = props.route.params
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Booking"
        component={Activity}
        initialParams={{ host: false }}
        options={{
          tabBarTestID: 'user-top-tab'
        }} />
      <Tab.Screen
        name="Hosting"
        component={Activity}
        initialParams={{ host: true }}
        options={{
          tabBarTestID: 'host-top-tab'
        }} />
    </Tab.Navigator>
  );
}

const AccountStack = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accounts"
        component={Accounts}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Activity"
        component={ActivityTopTab}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
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

const IconWrapper = styled.View`
  margin-left: ${Platform.OS === "ios" ? "15px" : 0};
`;

export default AccountStack;
