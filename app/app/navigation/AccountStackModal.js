import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Platform } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

// Import screens
import Accounts from "../screens/Accounts";
import Activity from "../screens/Activity";
import Referral from "../screens/Referral";
import BookingDetail from "../screens/BookingDetail";
import ReviewInput from "../screens/ReviewInput";
import MessageDetail from "../screens/MessageDetail";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const ActivityTopTab = ({ route }) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Booking"
      component={Activity}
      initialParams={{ host: false }}
      options={{ tabBarTestID: 'user-top-tab' }}
    />
    <Tab.Screen
      name="Hosting"
      component={Activity}
      initialParams={{ host: true }}
      options={{ tabBarTestID: 'host-top-tab' }}
    />
  </Tab.Navigator>
);

const AccountStack = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    if (route.state) {
      navigation.setOptions({
        tabBarVisible: route.state.index === 0,
      });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Activity"
        component={ActivityTopTab}
        options={{
          title: false,
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <IconWrapper testID="back-button-activity">
              <EvilIcons name="close" size={30} />
            </IconWrapper>
          ),
        }}
      />
      <Stack.Screen
        name="Referral"
        component={Referral}
        options={{
          title: false,
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <IconWrapper testID="back-button-activity">
              <EvilIcons name="close" size={30} />
            </IconWrapper>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const IconWrapper = styled.View`
  margin-left: ${Platform.OS === "ios" ? "15px" : "0px"};
`;

export default AccountStack;