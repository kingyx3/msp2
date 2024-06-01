import React, { useState, useEffect } from "react";
import { Dimensions, FlatList, Modal, View, Alert } from "react-native";
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import * as Network from 'expo-network';

//import components
import { NavBar } from "../../components/NavBar";
import * as Button from "../../components/Button";
import MapCard from "../../components/MapCard";

//import screens
import ListMap from "./ListMap";

//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../../config/Typography";

// import { rooms } from "../../data/testdata";
import { clearSelectedSpace, setSelectedSpace, setSelectedSpaces, showOfflineAlert } from "../../components/Firebase/firebase";

//import redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

// const filteroptions = [
//   { label: "Heating", value: "난방" },
//   { label: "WiFi", value: "무선인터넷" },
//   { label: "Aircon", value: "에어컨" },
//   { label: "Hair Dryer", value: "헤어드라이어" },
//   { label: "Shampoo", value: "샴푸" },
// ];

const { width, height } = Dimensions.get("window");
let now = new Date()
now.setMinutes(60, 0, 0);

const Listings = (props) => {
  const isFocused = useIsFocused();
  let spaceType = props.state.spaceType;
  let startM = moment(props.state.start); //moment object
  let endM = moment(props.state.end); //moment(startM).add(duration, 'h');
  let spaceSummary = props.state.spaceSummary
  let selectedSpaces = props.state.selectedSpaces
  selectedSpaces = selectedSpaces.filter((space) => {
    return space.userId !== props.user.id
  }) // dont show your own spaces
  selectedSpaces = selectedSpaces.slice(0, 25) // only show first 25
  let selectedSpaceType = props.state.spaceType;

  const [showFilter, setShowFilter] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // console.log('1', isFocused)
    if (isFocused) {
      if (spaceSummary) {
        if (spaceSummary['spaceType'] == spaceType || Object.keys(spaceSummary).length === 0) {
          props.setSelectedSpaces(spaceType, startM, endM, spaceSummary)
        }
      }
    }
  }, [isFocused, spaceSummary])//,[spaceType, startM, endM])

  async function submit(spaceId) {
    // props.clearSelectedSpace()
    // props.setSelectedSpace(spaceId)
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      const selectedSpace = selectedSpaces.filter((space) => space.id == spaceId)[0]
      const periodAvailabilityArray = selectedSpace.periodAvailabilityArray
      const periodPrice = selectedSpace.periodPrice
      // const periodPriceExclFees = selectedSpace.periodPriceExclFees
      // const fees = selectedSpace.fees
      props.navigation.navigate('ListStackModal', { screen: "Details", params: { spaceId, periodAvailabilityArray, periodPrice } });
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  }

  const renderItem = ({ item, index }) =>
    <MapCard
      testID={index.toString() + "_listing"}
      key={index.toString()}
      image={item.images[0]}
      property={selectedSpaceType}
      title={(item.location.suburb ? item.location.suburb : item.location.street) + ', ' + item.location.country}
      subtitle={"$" + item.periodPrice}
      caption={item.needHostConfirm ? null : "Insta-Book"}
      rating={item.rating}
      reviews={item.reviews} // number of reviews
      onPress={() => item.third_party ? null : submit(item.id)} //pass marker info?
    />

  return (
    <Body>
      <NavBar nav="chevron-left" onPress={() => props.navigation.goBack()} />
      <Main>
        <FlatList
          testID="listings-flatlist"
          ListHeaderComponent={
            <Header>
              <View>
                <Typography.SP>{selectedSpaces.length == 0 ? 'No properties' : selectedSpaces.length + ' properties'}</Typography.SP>
                <Typography.H1>{spaceType}</Typography.H1>
              </View>
              {/* <TouchableOpacity>
                <BtnContainer>
                  <Filter source={require("../../assets/filter.png")}></Filter>
                </BtnContainer>
              </TouchableOpacity> */}
            </Header>
          }
          data={selectedSpaces}
          // keyExtractor={(room, index) => index.toString()}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        <MapBtnWrapper>
          <Button.FloatingButton
            testID='listmap-button'
            iconName="map-o"
            label=" map"
            onPress={() => props.navigation.navigate("ListMap", selectedSpaces)} //console.log(spaceType, startM, duration = '1 hr', selectedSpaces) }
          />
        </MapBtnWrapper>
      </Main>
    </Body>
  );
};

const Body = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  flex: 1;
  padding: 0 24px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 15px 0;
`;

const Filter = styled.Image`
  width: 20px;
  height: 100%;
  resize-mode: contain;
  /* margin: 10px 0; */
`;

const BtnContainer = styled.View`
  width: 20px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const MapBtnWrapper = styled.View`
  align-self: center;
  position: absolute;
  bottom: 20px;
`;

const CloseBtn = styled.View`
  width: 50px;
  height: 50px;
  background-color: black;
  position: absolute;
  top: 20px;
  align-self: center;
`;

const mapStateToProps = (state) => {
  return {
    state: state.search,
    user: state.user.user
  };
};
const mapDispatchProps = (dispatch) => bindActionCreators({ clearSelectedSpace, setSelectedSpace, setSelectedSpaces }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Listings);
