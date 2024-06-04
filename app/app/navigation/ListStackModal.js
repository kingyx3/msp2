import React from "react";

//import navigation
import { createStackNavigator } from "@react-navigation/stack";
//import ListStack2 from "./ListStack2";
import { Platform } from "react-native";
//import screens
import Listings from "../screens/Searching/Listings";
import ListMap from "../screens/Searching/ListMap";
import Details from "../screens/Searching/Details";
import Description from "../screens/Searching/details/Description";
import Amenities from "../screens/Searching/details/Amenities";
import Reserve_1 from "../screens/Searching/Reserve_1";
import Reviews from "../screens/Searching/details/Reviews";
import TopUp from '../screens/Searching/TopUp';
//import styles and assets
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
const Stack = createStackNavigator();

const ListStackModal = ({ navigation, route }) => {
    // if (route.state) {
    //   navigation.setOptions({
    //     tabBarVisible: route.state.index > 0 ? false : true,
    //   });
    // }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Details"
                component={Details}
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
            />
            <Stack.Screen
                name="Description"
                component={Description}
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
            />
            <Stack.Screen
                name="Reviews"
                component={Reviews}
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
            />
            <Stack.Screen
                name="Reserve_1"
                component={Reserve_1}
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
            />
            <Stack.Screen
                name="TopUp "
                component={TopUp}
                options={{
                    headerShown: false
                }}
            />
            {/*
            <Stack.Screen
                name="Amenities"
                component={Amenities}
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
            />
            <Stack.Screen
                name="Reviews"
                component={Reviews}
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
            />
            */}
        </Stack.Navigator>
    );
};

const IconWrapper = styled.View`
  margin-left: ${Platform.OS === "ios" ? "15px" : 0};
`;

export default ListStackModal;
