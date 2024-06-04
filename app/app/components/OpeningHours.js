import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  // TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";

//import styles and assets
import styled from "styled-components/native";
import moment from 'moment'
// import Colors from "../config/colors";
import { P, Sub1, SP, paragraphFontSize, paragraphFontSizeIOS } from "../config/Typography";
// import { FontAwesome } from "@expo/vector-icons";

// import { rooms } from "../data/testdata";

// const { width, height } = Dimensions.get("window");

const OpeningHours = ({ title, start, setStart, end, setEnd, fullDay, setFullDay }) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const toggleFullDay = () => {
    if (fullDay) {
      setFullDay(false)
    } else {
      setFullDay(true)
    }
  }

  const onChangeTime = (type, selectedDateTime) => {
    const chosen = selectedDateTime || end;
    chosen.getMinutes() > 0 ? chosen.setMinutes(60) : chosen.setMinutes(0)
    if (type == "start") {
      setShowStartDatePicker(!showStartDatePicker)
      setStart(chosen)
    } else if (type == "end") {
      setShowEndDatePicker(!showEndDatePicker)
      setEnd(chosen)
    }
  }

  return (
    <View style={{ flexDirection: 'row', }}>
      <View style={{ width: '40%' }}>
        <Sub1>Opening hours</Sub1>
        <View style={{ width: '60%' }}>
          <Button
            testID="start-button"
            title={moment(start).format("hh:mmA")}
            titleStyle={{ fontSize: Platform.OS == 'ios' ? paragraphFontSizeIOS : paragraphFontSize }}
            onPress={() => setShowStartDatePicker(!showStartDatePicker)}
          />
          <DateTimePickerModal
            isVisible={showStartDatePicker}
            date={start}
            mode={'time'}
            isDarkModeEnabled={true}
            onConfirm={(selectedDateTime) => onChangeTime("start", selectedDateTime)}
            onCancel={() => setShowStartDatePicker(false)}
          />
        </View>
      </View>
      <View style={{ width: '40%' }}>
        <Sub1>Closing hours</Sub1>
        <View style={{ width: '60%' }}>
          <Button
            testID="end-button"
            title={moment(end).format("hh:mmA")}
            titleStyle={{ fontSize: Platform.OS == 'ios' ? paragraphFontSizeIOS : paragraphFontSize }}
            onPress={() => setShowEndDatePicker(!showEndDatePicker)}
          />
          <DateTimePickerModal
            isVisible={showEndDatePicker}
            date={end}
            mode={'time'}
            isDarkModeEnabled={true}
            onConfirm={(selectedDateTime) => onChangeTime("end", selectedDateTime)}
            onCancel={() => setShowEndDatePicker(false)}
          />
        </View>
      </View>
      <View style={{}}>
        <Sub1>Full Day?</Sub1>
        <View style={styles.general}>
          <Button
            testID="full-day-button"
            icon={
              <Icon
                name={fullDay ? 'check-square-o' : 'square-o'}
                size={15}
                color="white"
              />
            }
            // title=" Full Day?"
            onPress={() => {
              toggleFullDay();
            }}
          />
        </View>
      </View>
    </View >
  );
};

const Container = styled.View`
  margin: 16px 0;
  ${Platform.select({
  ios: {
    fontFamily: "Avenir",
  },
  android: {
    fontFamily: "Roboto",
  },
})};
`;

// const ImageContainer = styled.Image`
//   width: 100%;
//   height: 200px;
//   margin-bottom: 10px;
// `;

// const Subtitle = styled.Text`
//   font-size: 14px;
//   font-weight: bold;
//   margin: 5px 0;
// `;

const styles = StyleSheet.create({
  general: {
    padding: 10,
    alignContent: 'center'
  },
  // picture: {
  //   width,
  //   height: 200,
  // },
  // image: {
  //   flex: 1,
  //   width: "100%",
  //   height: "100%",
  // },
});

export default OpeningHours;
