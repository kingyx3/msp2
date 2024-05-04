import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

//import components
import ImgCarousel from "../../components/ImgCarousel";
// import * as Highlights from "../../components/Highlights";
import * as Button from "../../components/Button";
import * as List from "../../components/List";
import * as IconLabel from "../../components/IconLabel";
// import { NavBar2 } from "../../components/NavBar";
import * as Card from "../../components/Cards";
import ActivityIndicator from "../../components/ActivityIndicator"

//import screens
import moment from 'moment';
//import styles and assets
import styled from "styled-components/native";
import colors from "../../config/colors";
import * as Typography from "../../config/Typography";
import { setSelectedSpace, clearSelectedSpace, getUserName, getAvatarLink, fetchSpaceReviews } from "../../components/Firebase/firebase";

//import data
// import { reviews } from "../../config/appConfig";

const { width, height } = Dimensions.get("window");

//
const widthPct = 0.8;
const CARD_WIDTH = Math.floor(width * widthPct);
const CARD_INSET = (width - CARD_WIDTH) / 2;
const CARD_ADJ = Math.floor(CARD_INSET / 2)
//

const Details = ({ navigation, route, state, setSelectedSpace, clearSelectedSpace }) => {
  // let user
  const { spaceId, periodAvailabilityArray, periodPrice } = route.params
  const selectedSpace = state.selectedSpace
  const [hostName, setHostName] = useState('')
  const duration = moment.duration(moment(state.end).diff(moment(state.start)));
  const hours = duration.asHours();
  const { userId: hostId } = selectedSpace
  const [spaceReviews, setSpaceReviews] = useState({})

  const opacityValue = new Animated.Value(0);
  // Create selector for reviews (by latest datetime (spaceReviewDT), by highest (spaceReviewRTTop), by lowest (spaceReviewRTBtm) ratings)

  useEffect(() => {
    if (selectedSpace.id != spaceId) {
      setSelectedSpace(spaceId)
    }
  }, [spaceId, selectedSpace])

  useEffect(() => {
    getUserName(hostId, setHostName)
    fetchSpaceReviews(spaceId, setSpaceReviews)
  }, [])

  const renderItem = ({ item, index }) =>
    <View style={{ width: CARD_WIDTH + CARD_ADJ }}>
      <View style={{ alignSelf: 'center', width: 0.95 * (CARD_WIDTH + CARD_ADJ) }}>
        <Card.Review
          imagexsmall={getAvatarLink(item.userId)}
          title={item.userName}
          secondary={new Date(item.created.seconds * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} // hh:mmA
          content={item.review}
          rating={item.rating}
        />
      </View>
    </View>

  const headerStyle = {
    height: 70,
    width: "100%",
    backgroundColor: "white",
    opacity: opacityValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    position: "absolute",
    top: 0,
    left: 0,
  };

  if (Object.keys(selectedSpace).length == 0) {
    return (
      <ActivityIndicator />
    )
  } else {
    return (
      <Container>
        <View style={{ zIndex: 100 }}>
          <Animated.View style={headerStyle}></Animated.View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          // onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <ImgCarousel testID="image-carousel" images={selectedSpace.images} />
          <MainWrapper>
            <Typography.H2>{selectedSpace.title}</Typography.H2>
            <Subheading>
              {selectedSpace.ratingCount == 0 ? null :
                <IconLabel.FA
                  icon="star"
                  label={(selectedSpace.ratingTotal / selectedSpace.ratingCount).toFixed(2)}
                  label2={"(" + selectedSpace.ratingCount.toString() + ")"}
                  color={colors.red}
                />
              }
              {/*
              <IconLabel.MCI icon="medal" label="슈퍼호스트" color={colors.red} />
              */}
              <Typography.SP>{selectedSpace?.location?.geoapify.street}, {selectedSpace?.location?.geoapify.country}</Typography.SP>
            </Subheading>
            <HLine />
            {/*
            <Section>
              <Highlights.SuperClean />
              <Highlights.SelfCheckin />
              <Highlights.FreeCancellation />
            </Section>
            <HLine />
            */}
            <Section>
              <Typography.H2>Type</Typography.H2>
              <Typography.pS>{selectedSpace.spaceType}</Typography.pS>
            </Section>
            <HLine />
            <Section>
              <Typography.H2>Description</Typography.H2>
              {/* <Flex>
                <IconLabel.FA icon="bath" label="Bath" qty={selectedSpace.baths} />
                <IconLabel.FA icon="bed" label="Bed" qty={selectedSpace.beds} />
              </Flex> */}
              <Typography.pS>
                {selectedSpace?.description?.length > 100
                  ? selectedSpace?.description?.slice(0, 100) + "..."
                  : selectedSpace?.description}
              </Typography.pS>
              {selectedSpace?.description?.length > 100 ?
                <Button.BtnTxtUnderline
                  label="View more"
                  color={colors.gray}
                  onPress={() => navigation.navigate("Description", selectedSpace.description)}
                />
                : null}
            </Section>
            <HLine />
            {/*
            <Section>
              <Typography.H2>Amenities</Typography.H2>
              <List.Default
                title="Elevator"
                icon="elevator"
                iconcolor={colors.gray}
              />
              <List.Default
                title="Kitchen"
                icon="food-variant"
                iconcolor={colors.gray}
              />
              <List.Default title="Wifi" icon="wifi" iconcolor={colors.gray} />
              <List.Default
                title="Washer"
                icon="dishwasher"
                iconcolor={colors.gray}
              />
              <List.Default
                title="Cable TV"
                icon="youtube-tv"
                iconcolor={colors.gray}
              />
              <Button.BtnTxtUnderline
                label="View more"
                color={colors.gray}
                onPress={() => navigation.navigate("Amenities", selectedSpace)}
              />
            </Section>
            <HLine />
            */}
            <Section>
              <Typography.H2>Location</Typography.H2>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                scrollEnabled={false}
                minZoomLevel={12} // 5
                maxZoomLevel={15} // default => 20
                region={{
                  latitude: selectedSpace?.location.latitude,
                  longitude: selectedSpace?.location.longitude,
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5,
                }}
              >
                <Marker coordinate={selectedSpace.location}></Marker>
              </MapView>
            </Section>
            <HLine />

            {/* Start of review section */}
            <Section>
              <Typography.H2>Reviews</Typography.H2>
              {spaceReviews.length > 0
                ? <MarginContainer>
                  <FlatList
                    data={spaceReviews}
                    keyExtractor={(item, index) => index.toString()} // {reviews.index}
                    horizontal
                    decelerationRate={0}
                    snapToInterval={CARD_WIDTH + CARD_ADJ}
                    snapToAlignment="center"
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    contentInset={{
                      top: 0,
                      left: CARD_INSET,
                      bottom: 0,
                      right: CARD_INSET,
                    }}
                  />
                  {/* <Button.BtnTxtUnderline
                  label="View more"
                  color={colors.gray}
                  onPress={() => {
                    // need to create cloud function to grab reviews from spaceReviews
                    // navigation.navigate("Reviews", selectedSpace.id)
                    console.log('Button to open more reviews pressed!')
                  }}
                /> */}
                </MarginContainer>
                : <Typography.P color={colors.darkgray}>Be the first to leave a review after your experience!</Typography.P>
              }
            </Section>
            <HLine />
            {/* End of review section */}
            <List.UserList
              image={getAvatarLink(selectedSpace.userId)}
              title={`Hosted by ${hostName}`}
              secondary={"Member since: " + moment(new Date(selectedSpace?.created)).format("MMM YYYY")}
            />
          </MainWrapper>
        </ScrollView>
        <Reserve>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Typography.Sub2>
              ${periodPrice + " "}
            </Typography.Sub2>
            <Typography.Sub1 colors={colors.darkgray}>
              (~SGD{(Math.round((periodPrice / hours + Number.EPSILON) * 100) / 100)}/hour)
            </Typography.Sub1>
          </View>
          {/*
            <IconLabel.FA
              icon="star"
              label="4.65"
              label2="(305)"
              color={colors.red}
            />
            */}
          <BtnContainer>
            <Button.BtnContain
              testID="confirm-details-button"
              label="Make a reservation"
              color={colors.red}
              onPress={() => navigation.navigate("Reserve_1", { selectedSpace, periodPrice, periodAvailabilityArray, hours })}
            />
          </BtnContainer>
        </Reserve>
      </Container>
    );
  }
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const MainWrapper = styled.View`
  flex: 1;
  padding: 20px 20px 00px 20px;
`;

const Subheading = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 15px 0;
`;

const Section = styled.View`
  padding: 18px 0;
`;

const Reserve = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.faintgray};
  background-color: white;
`;

const Flex = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 14px 16px 14px 0;
`;

const HLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightgray};
`;

const BtnContainer = styled.View`
  width: 50%;
`;

const MarginContainer = styled.View`
  margin-top: 20px;
`;

const styles = StyleSheet.create({
  map: {
    height: 200,
    marginTop: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    state: state.search,
  };
};
const mapDispatchProps = (dispatch) => bindActionCreators({ setSelectedSpace, clearSelectedSpace }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Details);