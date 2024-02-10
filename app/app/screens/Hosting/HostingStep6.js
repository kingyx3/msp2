import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, KeyboardAvoidingView, Keyboard, Alert, Dimensions, FlatList, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Platform } from "react-native";

//import components
// import AppForm from "../../components/forms/AppForm";
// import LocationPicker from "../../components/LocationPicker";
import * as Button from "../../components/Button";
import { DefaultInput } from "../../components/forms/AppInput";
import { similarity } from "../../components/Firebase/firebase";

//import styles and assets
import styled from "styled-components/native";
import { H, H4 } from "../../config/Typography";
import colors from "../../config/colors";

//import redux
import { connect } from "react-redux";
import { setCurrLocation, setRevGeoCode } from "../../store/host";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { subtitle1FontSize, subtitle1FontSizeIOS } from "../../config/Typography";

const HostingStep6 = (props) => {
  const initialState = { user: { unit: "" }, latitude: 999, longitude: 999, geoapify: {}, checked: false }
  const [location, setLocation] = useState(initialState)
  const { editMode, selectedSpace } = props.route.params
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const googleMapsApiKey = Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY_IOS : process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY_ANDROID

  useEffect(() => {
    if (location == props.state.location) {
      setLoading(false)
    } else {
      setLoading(true)
      props.setCurrLocation(location);
    }
  }, [location, props.state.location])

  const onNavigate = () => {
    console.log(location)
    props.setCurrLocation(location);
    // props.setRevGeoCode(address[0]);
    props.navigation.navigate("HostingEdit7", { editMode, selectedSpace, location });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Main>
          <H>Where is your space?</H>
          <Step>
            <H4>Apartment, unit, suite, or floor #</H4>
            <DefaultInput
              name="unit"
              value={location.user.unit}
              onChangeText={(text) => {
                let update = { ...location }
                text = text.replace(/[^0-9-]/g, '')
                if (text.length <= 10) {
                  update.user.unit = text
                  setLocation(update)
                }
              }}
              keyboardType={'numbers-and-punctuation'}
              style={{ paddingLeft: 10, fontSize: Platform.OS === 'ios' ? subtitle1FontSizeIOS : subtitle1FontSize, zIndex: 1 }}
            />
          </Step>
          <Step>
            <H4>Address</H4>
            <GooglePlacesAutocomplete
              placeholder="e.g. 99 Cross Street"
              minLength={3} // minimum length of text to search
              listViewDisplayed={null}    // 'auto'/null after place selection
              // fetchDetails={true}
              enablePoweredByContainer={false}
              preProcess={(text) => {
                // // Clears geoapify object
                // let update = { ...location }
                // update['geoapify'] = {}
                // setLocation(update)

                if (!isNaN(text.charAt(0))) { // if first char is a number
                  return text
                } else { // first char not number
                  Alert.alert(
                    "Started with non-numeric character",
                    "Please start your address with a number",
                    [{ text: "OK", onPress: () => console.log("User acknowledgement - Started with non-numeric character") }]
                  );
                  return ""
                }
              }}
              textInputProps={{
                onChangeText: (text) => setSearchTerm(text)
              }}
              styles={{
                textInputContainer: {
                  paddingTop: 10,
                },
                textInput: {
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#d4d4d4',
                  fontSize: Platform.OS === 'ios' ? subtitle1FontSizeIOS : subtitle1FontSize,
                },
                listView: {
                  position: 'absolute',
                  top: 55,
                },
              }}
              query={{
                key: googleMapsApiKey,
                language: 'en', // language of the results
                components: 'country:SGP',
                type: 'address', // geocode, address, establishment
              }}
              onPress={async (data, details = null) => {
                let update = { ...location }
                update['description'] = data.description
                setSearchTerm(data.description)

                // Validate address with Geoapify
                // let uri = `https://api.geoapify.com/v1/geocode/search?text=${street_address + ", " + country_name + ', ' + postal_code}&format=json&apiKey=${APIKEY}`;
                let uri = `https://api.geoapify.com/v1/geocode/search?text=${data.description}&type=amenity&format=json&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;
                let encoded = encodeURI(uri);
                try {
                  let results = await fetch(encoded)
                  results = await results.json()
                  results = results.results
                  // console.log(results)
                  if (results.length == 0) {
                    console.log('No results')
                    update['checked'] = false // no change, default false
                    update['geoapify'] = {}
                  } else {
                    let topScore = 0
                    for (let i = 0; i < results.length; i++) {
                      let result = results[i]
                      // console.log(result)
                      if (result.rank.confidence >= 0.8) {
                        let score = similarity(result.formatted, data.description)
                        if (score > topScore) {
                          topScore = score
                          update['checked'] = true
                          update['geoapify'] = result
                          update['geoapify']['accuracy'] = score
                          update.latitude = result.lat
                          update.longitude = result.lon
                        }
                      }
                    }
                    if (topScore === 0) {
                      console.log('No results with >80% confidence')
                      update['checked'] = false // no change, default false
                      update['geoapify'] = {}
                    }
                  }

                  if (update.latitude != update.geoapify.lat || update.longitude != update.geoapify.lon) {
                    // Alert user that address selected is not valid
                    Alert.alert(
                      "Address not valid",
                      "Please try again",
                      [{ text: "OK", onPress: () => console.log("User acknowledgement - Address not valid") }]
                    );
                  }

                } catch (e) {
                  update['checked'] = false // no change, default false
                  update['geoapify'] = {}
                  console.log(e)
                }
                // console.log(update)
                setLocation(update)
              }}
              onFail={(error) => console.error(error)}
              requestUrl={{
                url:
                  'https://maps.googleapis.com/maps/api',
                useOnPlatform: 'web',
              }}
            />
          </Step>
        </Main>
        <Next>
          <Left></Left>
          <BtnContainer>
            <Button.BtnContain
              label="Next"
              // color={colors.red}
              size="small"
              color={(!loading && location.latitude == location.geoapify.lat && searchTerm == location.description) ? colors.red : colors.lightgray}
              disabled={(!loading && location.latitude == location.geoapify.lat && searchTerm == location.description) ? false : true}
              onPress={onNavigate}
            />
          </BtnContainer>
        </Next>
      </Container>
    </TouchableWithoutFeedback >
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  flex: 1;
  padding: 24px;
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

const Step = styled.View`
margin-top: 20px;
`;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//     alignItems: 'center'
//   },
//   text: {
//     fontSize: 15,
//     color: '#101010',
//     marginTop: 60,
//     fontWeight: '700'
//   },
//   listItem: {
//     marginTop: 10,
//     paddingTop: 8,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     width: '100%'
//   },
//   listItemText: {
//     fontSize: 14
//   }
// });

const mapStateToProps = (state) => {
  return {
    state: state.host,
  };
};

export default connect(mapStateToProps, { setCurrLocation, setRevGeoCode })(HostingStep6);