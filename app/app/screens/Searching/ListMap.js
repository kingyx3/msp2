import React, { useEffect, useRef } from "react";
import useState from 'react-usestateref'
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Network from 'expo-network';

//import components
import { setSelectedSpace, clearSelectedSpace, showOfflineAlert } from "../../components/Firebase/firebase";
import MapCard from "../../components/MapCard";
//import { rooms } from "../../data/testdata";
//import styles and assets
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import * as Typography from "../../config/Typography";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 120;
const widthPct = 0.8;
const CARD_WIDTH = Math.floor(width * widthPct);
const CARD_INSET = (width - CARD_WIDTH) / 2;
const CARD_ADJ = Math.floor(CARD_INSET / 2)

const ListMap = (props) => {
  let initialState
  if (props.latitude && props.longitude && process.env.EXPO_PUBLIC_TYPE != 'TEST') {
    initialState = {
      region: {
        latitude: props.latitude,
        longitude: props.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
    };
  } else {
    initialState = {
      region: {
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
    };
  }

  const canMomentum = useRef(false);
  // const [state, setState] = useState(initialState);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);
  // const [region, setRegion] = useState(initialState.region)
  const [regionBox, setRegionBox] = useState({
    minLng: initialState.region.longitude - 1,
    maxLng: initialState.region.longitude + 1,
    minLat: initialState.region.latitude - 0.1,
    maxLat: initialState.region.latitude + 0.1,
  })
  let selectedSpaceType = props.state.spaceType;
  let mapAnimation = new Animated.Value(0);

  // let selectedSpaces = props.route.params;
  let allSpaces = props.route.params
  allSpaces = allSpaces.slice(0, 25) // only show first 25
  const [selectedSpaces, setSelectedSpaces] = useState([])

  useEffect(() => {
    onRefresh()
  }, [])

  const onRefresh = () => {
    const { minLat, maxLat, minLng, maxLng } = regionBox
    // const { minLat, maxLat, minLng, maxLng } = regionToBoundingBox(initialState.region)
    // console.log(props.latitude, props.longitude)
    // console.log(minLat, maxLat, minLng, maxLng)
    // console.log(regionBox)
    // console.log(allSpaces)

    setSelectedSpaces(allSpaces.filter((space) =>
    (space.location.latitude > minLat && // min lat
      space.location.latitude < maxLat && // max lat
      space.location.longitude > minLng && // min lng
      space.location.longitude < maxLng)) //max lng
    )
  }

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

  const animateToRegion = (value) => {
    // console.log('valuebf:', value)
    if (Platform.OS === "ios") {
      value = value + CARD_INSET;
    }
    // console.log('valueaf:', value)
    let index = Math.floor(value / (CARD_WIDTH + CARD_ADJ))
    // console.log('indexbf:',index)
    if (index <= 0) {
      index = 0;
    } else if (index >= selectedSpaces.length) {
      index = selectedSpaces.length - 1;
    }
    // console.log('indexaf:', index)
    // console.log(value, (CARD_WIDTH + CARD_ADJ), value / (CARD_WIDTH + CARD_ADJ))
    // console.log(selectedSpaceType) // checking variable values
    const { location } = selectedSpaces[index];
    setSelectedMarkerIndex(index)
    _map.current.animateToRegion(
      {
        ...location,
        latitudeDelta: initialState.region.latitudeDelta,
        longitudeDelta: initialState.region.longitudeDelta,
      }
      , 350
    );
  }

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      animateToRegion(value + 10)
      // console.log('value', value + 10)
    });
  });

  const onMarkerPress = (mapEventData) => {
    // console.log('width', width, 'height', height, 'CARD_WIDTH', CARD_WIDTH, 'CARD_INSET', CARD_INSET, 'CARD_ADJ', CARD_ADJ)
    const markerID = mapEventData._targetInst.return.key;
    // console.log('markerID:', markerID)
    let x = markerID * (CARD_WIDTH + CARD_ADJ) + 10;
    // console.log('xbf:',x)
    if (Platform.OS === "ios") {
      x = x - CARD_INSET;
    }
    // console.log('xaf:',x)
    // _scrollView.current.scrollTo({ x: x, y: 0, animated: false });
    // flatListRef.scrollToIndex({animated: false, index: markerID});
    flatListRef.scrollToOffset({ animated: false, offset: x });
    animateToRegion(x);
    // console.log('x', x)
    // console.log('CARD_INSET', CARD_INSET)
  };

  // const getItemLayout = (data, index) => {
  //   let LENGTH = CARD_WIDTH + CARD_ADJ
  //   let offset = LENGTH * index
  //   if (Platform.OS === "ios") {
  //     offset = offset - CARD_INSET;
  //   }
  //   return ({ length: LENGTH, offset, index })
  // }

  const _map = useRef(null);
  // const _scrollView = useRef(null);
  const renderItem = ({ item, index }) =>
    <MapCard
      testID={index.toString() + "_listmap"}
      key={index.toString()}
      image={item.images[0]}
      property={selectedSpaceType}
      title={(item.location.suburb ? item.location.suburb : item.location.street) + ', ' + item.location.country}
      subtitle={item.periodPrice}
      rating={item.rating}
      reviews={item.reviews} // number of reviews
      onPress={() => item.third_party ? null : submit(item.id)} //pass marker info?
    />

  // Using ref hooks to prevent android sending multiple onMomentumScrollEnd events
  const onMomentumScrollBegin = () => {
    canMomentum.current = true;
  };

  const onMomentumScrollEnd = (event) => {
    if (canMomentum.current) {
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: mapAnimation,
              },
            },
          },
        ],
        {
          useNativeDriver: false // true
        }
      )(event)
    }
    canMomentum.current = false;
  };

  return (
    <Container>
      <MapView
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        ref={_map}
        style={styles.map}
        initialRegion={initialState.region}
        minZoomLevel={10} // 5
        maxZoomLevel={15} // default => 20
        onRegionChangeComplete={async (region, { isGesture }) => {
          if (region.longitude == 0) {
            null
          } else {
            _map?.current?.animateToRegion(
              region, 350
            );
          }
          //
          if (isGesture) {
            const mapBoundaries = await _map.current.getMapBoundaries();
            setRegionBox({
              maxLng: mapBoundaries.northEast.longitude,
              minLng: mapBoundaries.southWest.longitude,
              maxLat: mapBoundaries.northEast.latitude,
              minLat: mapBoundaries.southWest.latitude
            })
          }
        }}
      >
        {selectedSpaces.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.location}
              onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={{ alignItems: "center", justifyContent: "center", width: 75, height: 50, }}>
                <View style={{
                  backgroundColor: selectedMarkerIndex === index ? "black" : "white",
                  padding: 5,
                  borderRadius: 20,
                  borderColor: "black",
                  borderWidth: 1,
                  opacity: selectedMarkerIndex === index ? 1 : 0.5,
                }}>
                  <Text style={{ color: selectedMarkerIndex === index ? "white" : "black", fontWeight: "bold" }}>${marker.periodPrice}</Text>
                </View>
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <MapBox>
        <AnimatedFlatList
          testID='listing-card-flatlist'
          ref={ref => { flatListRef = ref }}
          // getItemLayout={getItemLayout}
          horizontal
          scrollEventThrottle={1} //16
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate={"fast"}
          snapToInterval={CARD_WIDTH + CARD_ADJ}
          snapToAlignment={Platform.OS === "ios" ? "center" : "start"}
          // initialScrollIndex={0}
          initialNumToRender={2}
          contentInset={{ // not working for android
            top: 0,
            left: CARD_INSET,
            bottom: 0,
            right: CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === "android" ? CARD_INSET : 0,
          }}
          // onScroll={ onScroll }
          data={selectedSpaces}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
        />
      </MapBox>
      <TouchableOpacity
        testID="back-button-x"
        style={styles.closeButton}
        onPress={() => props.navigation.goBack()}>
        <EvilIcons name="close" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => onRefresh()}>
        <Typography.Sub1> Refresh Spaces </Typography.Sub1>
      </TouchableOpacity>
    </Container >
  );
};

// Source: https://github.com/novalabio/react-native-maps-super-cluster/blob/master/util.js
const regionToBoundingBox = (region) => {
  let lngD
  if (region.longitudeDelta < 0)
    lngD = region.longitudeDelta + 360
  else
    lngD = region.longitudeDelta

  let minLng = region.longitude - lngD // westLng - min lng
  let minLat = region.latitude - region.latitudeDelta // southLat - min lat
  let maxLng = region.longitude + lngD // eastLng - max lng
  let maxLat = region.latitude + region.latitudeDelta // northLat - max lat

  return ({
    minLng,
    minLat,
    maxLng,
    maxLat
  })
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Bubble = styled.View`
  flex-direction: row;
  align-self: flex-start;
  background-color: white;
  border-radius: 6px;
  border: 0.5px solid #cccccc;
  padding: 15px;
  width: 150px;
`;

const CustomMarkerCurrent = styled.View`
  background-color: black;
  border-radius: 20px;
  padding: 6px 16px;
`;

const CustomMarker = styled.View`
  background-color: white;
  border-radius: 20px;
  padding: 6px 16px;
`;

const MapBox = styled.View`
  position: absolute;
  margin-top: ${Platform.OS === "ios" ? "250px" : "250px"};
  border-radius: 6px;
  align-self: center;
  bottom: 0;
`;
// padding-top: 20px;
// padding-bottom: 20px;
// padding-left: 20px;
// padding-right: 20px;

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 20, // Adjust the top position as needed
    left: 20, // Adjust the left position as needed
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Add elevation for shadow effect (Android only)
  },
  refreshButton: {
    position: 'absolute',
    top: 20, // Adjust the top position as needed
    height: 30,
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    alignSelf: 'center',
    elevation: 2, // Add elevation for shadow effect (Android only)
  },
  map: {
    flex: 1,
  },
  // card: {
  //   backgroundColor: "#fff",
  //   borderTopLeftRadius: 5,
  //   borderTopRightRadius: 5,
  //   marginHorizontal: 10,
  //   height: CARD_HEIGHT,
  //   width: CARD_WIDTH,
  //   overflow: "hidden",
  // },
  // cardImage: {
  //   flex: 3,
  //   width: "100%",
  //   height: "100%",
  //   alignSelf: "center",
  // },
  // scrollView: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   paddingVertical: 10,
  // },
  // flatList: {
  //   marginBottom:15,
  //   width: '100%',
  //   position: 'absolute',
  //   bottom: 0
  // },
  // date: {
  //   flex: 1.4,
  //   //padding:5,
  //   paddingRight:5,
  // },
  // time: {
  //   flex: 1.1,
  //   //padding:5,
  //   paddingRight:30,
  // },
});

const mapStateToProps = (state) => {
  return {
    state: state.search,
    latitude: state.user.userIpLocation.latitude,
    longitude: state.user.userIpLocation.longitude,
  };
};

const mapDispatchProps = (dispatch) => bindActionCreators({ setSelectedSpace, clearSelectedSpace }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(ListMap);