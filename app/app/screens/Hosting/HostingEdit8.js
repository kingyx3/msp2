import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

//import components
import ImgCarousel from "../../components/ImgCarousel";
import * as IconLabel from "../../components/IconLabel";
import * as Button from "../../components/Button";
import { createSpace, updateSpace, showOfflineAlert, getTimingDiffFromUTC, } from '../../components/Firebase/firebase';
import { auth } from "../../components/Firebase/firebaseConfig";
import * as Network from 'expo-network';
//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../../config/Typography";
import colors from "../../config/colors";

//import redux
import { connect } from "react-redux";

const HostingEdit8 = (props) => {
  const needHostConfirm = false
  const [loading, setLoading] = useState(false)
  const { editMode, selectedSpace } = props.route.params
  // const {selectedSpace} = props // from route

  const onNavigate = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      setLoading(true)
      if (auth.currentUser.isAnonymous) {
        // return console.log('USER IS ANONYMOUS')
        Alert.alert("Anonymous user cannot create space", "Please create a profile before proceeding", [
          { text: "Cancel", onPress: () => props.navigation.navigate("Hosting") },
          { text: "OK", onPress: () => console.log('Navigate user to create profile') }, //props.navigation.navigate("Signup") },
        ]);
      }
      const { spaceType, price, peakPrice, offPeakPrice, images, location, title, description, weekdayRule, saturdayRule, sundayRule, numSpaces, cancellationPolicy, monthsAhead } = props.state // from redux
      let openingHours = [sundayRule, ...(Array(5).fill(weekdayRule)), saturdayRule].flat(); // Sunday = 0, Monday = 1, .... Saturday = 6
      // move the array by locale timing difference from GMT
      const timeDiffHours = getTimingDiffFromUTC()
      const shiftedArr = openingHours.splice(0, timeDiffHours);
      openingHours = openingHours.concat(shiftedArr);
      openingHours = setPricesInOpeningHours(openingHours, price, peakPrice, offPeakPrice)

      if (editMode) {
        updateSpace(selectedSpace.id, price, peakPrice, offPeakPrice, images, title, description, cancellationPolicy, monthsAhead, openingHours, needHostConfirm)
          .then(async () => {
            setLoading(false)
            Alert.alert("Space Updated!", "Success", [
              { text: "OK", onPress: () => props.navigation.navigate("Hosting") },
            ]);
          })
          .catch((e) => {
            setLoading(false)
            Alert.alert("Space Updating Error!", "Please check your connection & try again later " + e, [
              { text: "OK", onPress: () => console.log('Error! ' + e) } //props.navigation.navigate("Hosting") },
            ]);
          })
      } else {
        createSpace(spaceType, price, peakPrice, offPeakPrice, images, location, title, description, numSpaces, cancellationPolicy, monthsAhead, openingHours, needHostConfirm)
          .then(() => {
            setLoading(false)
            Alert.alert("Space Created!", "Success", [
              { text: "OK", onPress: () => props.navigation.navigate("Hosting") },
            ]);
          })
          .catch((e) => {
            console.log(e)
            setLoading(false)
            Alert.alert("Space Creation Error!", "Please check your connection & try again later " + e, [
              { text: "OK", onPress: () => console.log('Error! ' + e) } //props.navigation.navigate("Hosting") },
            ]);
          })
      }
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  };

  const spaceType = editMode ? selectedSpace?.spaceType : props?.state?.spaceType
  const address = editMode ? selectedSpace?.location?.description : props?.state?.location?.description
  let latitude = editMode ? selectedSpace?.location?.latitude : props.state.location.latitude
  let longitude = editMode ? selectedSpace?.location?.longitude : props.state.location.longitude

  //Error handling - must ensure location is saved to state before coming to this page else map wont have coordinates
  latitude = latitude ? latitude : 0
  longitude = longitude ? longitude : 0

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
              {/* <IconLabel.FA icon="bath" label="Bath" qty={props.state.bath} />
              <IconLabel.FA icon="bed" label="Bed" qty={props.state.bedroom} /> */}
              <Typography.SP>
                {props.state.description}
              </Typography.SP>
            </Flex>
          </Section>
          <HLine />
          <Section>
            <Typography.H2>Location</Typography.H2>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              scrollEnabled={false}
              minZoomLevel={12} // 5
              maxZoomLevel={15} // default => 20
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

function setPricesInOpeningHours(openingHours, price, peakPrice, offPeakPrice) {
  for (let i = 0; i < openingHours.length; i++) {
    switch (openingHours[i]) {
      case 0:
        openingHours[i] = 0;
        break;
      case 1: // normal
        openingHours[i] = price;
        break;
      case 2: // peak
        openingHours[i] = peakPrice;
        break;
      case 3: // offPeak
        openingHours[i] = offPeakPrice;
        break;
      default:
        break;
    }
  }
  return openingHours;
}