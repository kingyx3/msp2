import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//import screens

import Message from "../screens/Messages";
import MessageDetail from "../screens/MessageDetail";

//import styles, icons
import styled from "styled-components/native";

const Stack = createStackNavigator();

const MessageStackModal = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }

  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Message "
        component={Message}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MessageStackModal;
