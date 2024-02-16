import React from "react";

//import navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Platform } from "react-native";
//import screens
import Hosting from "../screens/Hosting/Hosting";
import SpaceDetails from "../screens/Hosting/SpaceDetails";
import SpaceManagement from "../screens/Hosting/SpaceManagement";
import SpaceBookings from "../screens/Hosting/SpaceBookings";
import SpaceAvailability from "../screens/Hosting/SpaceAvailability";
import Description from "../screens/Hosting/details/Description";
import BookingDetail from "../screens/BookingDetail";
import HostingStep1 from "../screens/Hosting/HostingStep1";
import HostingEdit2 from "../screens/Hosting/HostingEdit2";
import HostingStep3 from "../screens/Hosting/HostingStep3";
import HostingEdit4 from "../screens/Hosting/HostingEdit4";
import HostingEdit5 from "../screens/Hosting/HostingEdit5";
import HostingStep6 from "../screens/Hosting/HostingStep6";
import HostingEdit7 from "../screens/Hosting/HostingEdit7";
import HostingEdit8 from "../screens/Hosting/HostingEdit8";

//import syltes and assets
import { EvilIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const SpaceBookingsTopTab = (props) => {
    const { spaceId } = props.route.params
    return (
        <Tab.Navigator>
            <Tab.Screen name="Booking History" component={SpaceBookings} initialParams={{ spaceId, history: true }} />
            <Tab.Screen name="Upcoming Bookings" component={SpaceBookings} initialParams={{ spaceId, history: false }} />
        </Tab.Navigator>
    );
}

const HostStackModal = ({ navigation, route }) => {
    // Reactivate once done with host front end
    /*if (route.state) {
      navigation.setOptions({
        tabBarVisible: route.state.index > 0 ? false : true,
      });
    }*/
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HostingStep1"
                component={HostingStep1}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="hosting-step1-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="HostingEdit2"
                component={HostingEdit2}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="hosting-edit2-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="HostingStep3"
                component={HostingStep3}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="hosting-step3-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="HostingEdit4"
                component={HostingEdit4}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="hosting-edit4-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="HostingEdit5"
                component={HostingEdit5}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="hosting-edit5-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="HostingStep6"
                component={HostingStep6}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="hosting-step6-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="HostingEdit7"
                component={HostingEdit7}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="hosting-edit7-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="HostingEdit8"
                component={HostingEdit8}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="hosting-edit8-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="SpaceDetails"
                component={SpaceDetails}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="space-detail-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="SpaceManagement"
                component={SpaceManagement}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="manage-space-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="SpaceAvailability"
                component={SpaceAvailability}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="manage-calendar-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="SpaceBookings"
                component={SpaceBookingsTopTab}
                options={{
                    title: false,
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <IconWrapper testID="view-bookings-back-button">
                            <EvilIcons name="chevron-left" size={30} />
                        </IconWrapper>
                    ),
                }}
            />
            <Stack.Screen
                name="BookingDetail"
                component={BookingDetail}
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

export default HostStackModal;
