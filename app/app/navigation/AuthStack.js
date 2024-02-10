import React from "react";
import { Platform } from "react-native";

//import navigation
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./HomeStack";

//import screens
import Login from "../screens/Auth/Login";
import EmailLinkSentScreen from "../screens/Auth/EmailLinkSent";

//import styles and assets
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    {/* <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        title: false,
        headerBackTitleVisible: false,
        headerStyle: {
          height: 60,
        },
        headerBackImage: () => (
          <IconWrapper>
            <EvilIcons name="chevron-left" size={30} />
          </IconWrapper>
        ),
      }}
    /> */}
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false
        // title: false,
        // headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Email Link Sent"
      component={EmailLinkSentScreen}
      options={{
        headerShown: false
        //   title: false,
        //   headerBackTitleVisible: false,
        // headerBackTestID: 'header-back',
        //   headerBackImage: () => (
        //     <IconWrapper>
        //       <EvilIcons name="chevron-left" size={30} />
        //     </IconWrapper>
        //   ),
      }}
    />
    {/* <Stack.Screen
      name='ForgotPassword'
      component={ForgotPasswordScreen}
      options={{
        title: false,
        headerBackTitleVisible: false,
        headerStyle: {
          height: 60,
        },
        headerBackImage: () => (
          <IconWrapper>
            <EvilIcons name="chevron-left" size={30} />
          </IconWrapper>
        ),
      }}
    /> */}
    {/* <Stack.Screen
      name="HomeStack"
      component={HomeStack}
      options={{ headerShown: false }}
    /> */}
  </Stack.Navigator>
);

const IconWrapper = styled.View`
  margin-left: ${Platform.OS === "ios" ? "15px" : 0};
`;

export default AuthStack;
