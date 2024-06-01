import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";

// Import screens
import Login from "../screens/Auth/Login";
import EmailLinkSentScreen from "../screens/Auth/EmailLinkSent";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="Email Link Sent"
      component={EmailLinkSentScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;