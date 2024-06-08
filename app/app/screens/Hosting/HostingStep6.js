import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, KeyboardAvoidingView, Keyboard, Alert, Dimensions, FlatList, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components/native";
import { H, H4 } from "../../config/Typography";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { setCurrLocation, setRevGeoCode } from "../../store/host";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { subtitle1FontSize, subtitle1FontSizeIOS } from "../../config/Typography";
import * as Button from "../../components/Button";
import { DefaultInput } from "../../components/forms/AppInput";

const height = Dimensions.get('window').height;

const initialState = { user: { unit: "" }, latitude: 999, longitude: 999, geoapify: {}, checked: false };

const HostingStep6 = ({ route, navigation, setCurrLocation, state }) => {
  const { editMode, selectedSpace } = route.params;
  const [location, setLocation] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location === state.location) {
      setLoading(false);
    } else {
      setLoading(true);
      setCurrLocation(location);
    }
  }, [location, state.location]);

  const onNavigate = () => {
    setCurrLocation(location);
    navigation.navigate("HostingEdit7", { editMode, selectedSpace, location });
  };

  const handleAddressSelection = async (data) => {
    const update = { ...location, description: data.description };
    setSearchTerm(data.description);

    const uri = `https://api.geoapify.com/v1/geocode/search?text=${data.description}&type=amenity&format=json&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;
    const encoded = encodeURI(uri);

    try {
      const response = await fetch(encoded);
      const results = await response.json();
      const validResults = results.results.filter(result => result.rank.confidence >= 0.8);

      if (validResults.length > 0) {
        const topResult = validResults.reduce((prev, current) => (
          similarity(current.formatted, data.description) > similarity(prev.formatted, data.description) ? current : prev
        ));

        update.checked = true;
        update.geoapify = topResult;
        update.geoapify.accuracy = similarity(topResult.formatted, data.description);
        update.latitude = topResult.lat;
        update.longitude = topResult.lon;
      } else {
        update.checked = false;
        update.geoapify = {};
      }

      if (update.latitude !== update.geoapify.lat || update.longitude !== update.geoapify.lon) {
        Alert.alert("Address not valid", "Please try again", [{ text: "OK" }]);
      }
    } catch (error) {
      update.checked = false;
      update.geoapify = {};
      console.error(error);
    }

    setLocation(update);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Main
          testID="hosting-step6-scroll-view"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ height }}
        >
          <H>Where is your space?</H>
          <Step>
            <H4>Apartment, unit, suite, or floor #</H4>
            <DefaultInput
              name="unit"
              value={location.user.unit}
              onChangeText={(text) => {
                const update = { ...location };
                const sanitizedText = text.replace(/[^0-9-]/g, '');
                if (sanitizedText.length <= 10) {
                  update.user.unit = sanitizedText;
                  setLocation(update);
                }
              }}
              keyboardType="numbers-and-punctuation"
              style={{
                paddingLeft: 10,
                fontSize: Platform.OS === 'ios' ? subtitle1FontSizeIOS : subtitle1FontSize,
                zIndex: 1
              }}
            />
          </Step>
          <Step>
            <H4>Address</H4>
            <GooglePlacesAutocomplete
              placeholder="e.g. 99 Cross Street"
              minLength={3}
              disableScroll
              enablePoweredByContainer={false}
              preProcess={(text) => {
                if (!isNaN(text.charAt(0))) {
                  return text;
                } else {
                  Alert.alert(
                    "Started with non-numeric character",
                    "Please start your address with a number",
                    [{ text: "OK" }]
                  );
                  return "";
                }
              }}
              textInputProps={{
                testID: "address-input",
                onChangeText: setSearchTerm
              }}
              styles={{
                textInputContainer: { paddingTop: 10 },
                textInput: {
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#d4d4d4',
                  fontSize: Platform.OS === 'ios' ? subtitle1FontSizeIOS : subtitle1FontSize
                },
                listView: { position: 'absolute', top: 55 }
              }}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
                language: 'en',
                components: 'country:SGP',
                type: 'address'
              }}
              onPress={handleAddressSelection}
              onFail={(error) => console.error(error)}
              requestUrl={{
                url: 'https://maps.googleapis.com/maps/api',
                useOnPlatform: 'web'
              }}
            />
          </Step>
        </Main>
        <Next>
          <Left></Left>
          <BtnContainer>
            <Button.BtnContain
              testID="hosting-step6-next-button"
              label="Next"
              size="small"
              color={(!loading && location.latitude === location.geoapify.lat && searchTerm === location.description) ? colors.red : colors.lightgray}
              disabled={(!loading && location.latitude === location.geoapify.lat && searchTerm === location.description) ? false : true}
              onPress={onNavigate}
            />
          </BtnContainer>
        </Next>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  ${Platform.OS !== 'ios' && `height: ${height - 50}px;`}
`;

const Main = styled.ScrollView`
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

const mapStateToProps = (state) => ({
  state: state.host,
});

export default connect(mapStateToProps, { setCurrLocation, setRevGeoCode })(HostingStep6);

// Helper functions
const similarity = (s1, s2) => {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};

const editDistance = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = Array(s2.length + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 1; j <= s2.length; j++) {
      const newValue = (s1.charAt(i - 1) === s2.charAt(j - 1)) ? costs[j - 1] : Math.min(costs[j - 1], lastValue, costs[j]) + 1;
      costs[j - 1] = lastValue;
      lastValue = newValue;
    }
    costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};
