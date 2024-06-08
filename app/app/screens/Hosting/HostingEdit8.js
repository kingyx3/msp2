import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert, Platform } from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import ImgCarousel from "../../components/ImgCarousel";
import * as IconLabel from "../../components/IconLabel";
import * as Button from "../../components/Button";
import { createSpace, updateSpace, showOfflineAlert, getTimingDiffFromUTC } from '../../components/Firebase/firebase';
import { auth } from "../../components/Firebase/firebaseConfig";
import * as Network from 'expo-network';
import styled from "styled-components/native";
import * as Typography from "../../config/Typography";
import colors from "../../config/colors";
import { connect } from "react-redux";

const HostingEdit8 = (props) => {
  const [loading, setLoading] = useState(false);
  const { editMode, selectedSpace } = props.route.params;

  const onNavigate = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      setLoading(true);
      if (auth.currentUser.isAnonymous) {
        Alert.alert("Anonymous user cannot create space", "Please create a profile before proceeding", [
          { text: "Cancel", onPress: () => props.navigation.navigate("Hosting") },
          { text: "OK", onPress: () => console.log('Navigate user to create profile') },
        ]);
        return;
      }
      const { spaceType, price, peakPrice, offPeakPrice, images, location, title, description, openingHours, weekdayRule, saturdayRule, sundayRule, numSpaces, cancellationPolicy, monthsAhead, needHostConfirm } = props.state;
      const adjustedOpeningHours = adjustOpeningHoursToUTC(openingHours);
      const openingHoursWithPrices = setPricesInOpeningHours(adjustedOpeningHours, price, peakPrice, offPeakPrice);

      if (editMode) {
        updateSpace(selectedSpace.id, price, peakPrice, offPeakPrice, images, title, description, cancellationPolicy, monthsAhead, openingHoursWithPrices, needHostConfirm)
          .then(() => {
            setLoading(false);
            Alert.alert("Space Updated!", "Success", [
              { text: "OK", onPress: () => props.navigation.navigate("Hosting") },
            ]);
          })
          .catch((e) => {
            setLoading(false);
            Alert.alert("Space Updating Error!", "Please check your connection & try again later " + e, [
              { text: "OK", onPress: () => console.log('Error! ' + e) },
            ]);
          });
      } else {
        createSpace(spaceType, price, peakPrice, offPeakPrice, images, location, title, description, numSpaces, cancellationPolicy, monthsAhead, openingHoursWithPrices, needHostConfirm)
          .then(() => {
            setLoading(false);
            Alert.alert("Space Created!", "Success", [
              { text: "OK", onPress: () => props.navigation.navigate("Hosting") },
            ]);
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
            Alert.alert("Space Creation Error!", "Please check your connection & try again later " + e, [
              { text: "OK", onPress: () => console.log('Error! ' + e) },
            ]);
          });
      }
    } else {
      showOfflineAlert();
    }
  };

  const spaceType = editMode ? selectedSpace?.spaceType : props?.state?.spaceType;
  const address = editMode ? selectedSpace?.location?.description : props?.state?.location?.description;
  let latitude = editMode ? selectedSpace?.location?.latitude : props.state.location.latitude;
  let longitude = editMode ? selectedSpace?.location?.longitude : props.state.location.longitude;

  latitude = latitude ? latitude : 0;
  longitude = longitude ? longitude : 0;

  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
        <ImgCarousel images={props.state.images} />
        <MainWrapper>
          <Typography.H2>{props.state.title}</Typography.H2>
          <Subheading>
            <Typography.SP>
              {`${address}`}
            </Typography.SP>
          </Subheading>
          <HLine />
          <Section>
            <Typography.H2>Type</Typography.H2>
            <Flex>
              <Typography.SP>{spaceType}</Typography.SP>
            </Flex>
          </Section>
          <HLine />
          <Section>
            <Typography.H2>Description</Typography.H2>
            <Flex>
              <Typography.SP>
                {props.state.description}
              </Typography.SP>
            </Flex>
          </Section>
          <HLine />
          <Section>
            <Typography.H2>Location</Typography.H2>
            <MapView
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
              style={styles.map}
              scrollEnabled={false}
              minZoomLevel={12}
              maxZoomLevel={15}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              <Marker
                coordinate={{
                  latitude,
                  longitude,
                }}
              ></Marker>
            </MapView>
          </Section>
        </MainWrapper>
        <Main></Main>
      </ScrollView>
      <Next>
        <Left></Left>
        <BtnContainer>
          <Button.BtnContain
            testID={'hosting-edit8-next-button'}
            label={editMode ? "Update" : "List"}
            color={loading ? colors.lightgray : colors.red}
            disabled={loading}
            size="small"
            onPress={() => onNavigate()}
          />
        </BtnContainer>
      </Next>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const MainWrapper = styled.View`
  flex: 1;
  padding: 20px 30px 20px 20px;
`;

const Subheading = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 15px 0;
`;

const Section = styled.View`
  padding: 18px 0;
`;

const Main = styled.View``;

const Flex = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 14px 16px 14px 0;
`;

const HLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightgray};
`;

const Next = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.faintgray};
  background-color: white;
`;

const Left = styled.View``;

const BtnContainer = styled.View`
  width: 30%;
`;

const styles = StyleSheet.create({
  map: {
    height: 200,
    marginTop: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    state: state.host,
    selectedSpace: state.search.selectedSpace,
    userSpaces: state.user.userSpaces,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(HostingEdit8);

function adjustOpeningHoursToUTC(openingHours) {
  const timeDiffHours = getTimingDiffFromUTC();
  const shiftedArr = openingHours.slice(0, timeDiffHours);
  const adjustedToUTCOpeningHours = openingHours.slice(timeDiffHours).concat(shiftedArr);
  return adjustedToUTCOpeningHours;
}

function setPricesInOpeningHours(openingHours, price, peakPrice, offPeakPrice) {
  return openingHours.map(hour => {
    switch (hour) {
      case 0:
        return 0;
      case 1: // normal
        return price;
      case 2: // peak
        return peakPrice;
      case 3: // offPeak
        return offPeakPrice;
      default:
        return hour;
    }
  });
}