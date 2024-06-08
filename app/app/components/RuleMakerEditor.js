import React from "react";
import useState from 'react-usestateref';
import { Text, View, StatusBar, StyleSheet, Platform } from "react-native";
import styled from "styled-components/native";
import TimePickerEditor from './RecurTimePickerEditor';
import * as Button from "./Button";
import Colors from "../config/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function RuleMakerEditor(props) {
  let { ruleDays, editMode, defaultRules, onSubmit } = props;
  const [hours, setHours] = useState(defaultRules);

  const onChangeHour = (updatedHours) => {
    setHours(updatedHours);
  };

  return (
    <Common>
      <View style={styles.header}>
        <Text style={styles.headerText}>Available Timeslots</Text>
      </View>
      <TimePickerEditor
        testID="time-picker-editor"
        editMode={editMode}
        hours={hours}
        onChange={onChangeHour}
      />
      <View style={styles.legendContainer}>
        <View style={[styles.active, styles.legendItem]}>
          <Text style={styles.activeText}>Available</Text>
        </View>
        <View style={[styles.active2, styles.legendItem]}>
          <Text style={styles.activeText2}>Peak</Text>
        </View>
        <View style={[styles.active3, styles.legendItem]}>
          <Text style={styles.activeText3}>Off-Peak</Text>
        </View>
        <View style={[styles.inactive, styles.legendItem]}>
          <Text style={styles.inactiveText}>Unavailable</Text>
        </View>
      </View>
      <Next>
        <Left />
        <BtnContainer>
          <Button.BtnContain
            testID='submit-button'
            label="Submit"
            color={Colors.red}
            size="small"
            onPress={() => onSubmit(ruleDays, hours)}
          />
        </BtnContainer>
      </Next>
    </Common>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: wp('5%'),
  },
  headerText: {
    fontSize: hp('2%'),
  },
  legendContainer: {
    padding: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.black,
    paddingVertical: hp('1%'),
  },
  active: {
    backgroundColor: Colors.blue,
  },
  active2: {
    backgroundColor: Colors.red,
  },
  active3: {
    backgroundColor: Colors.darkgray,
  },
  inactive: {
    backgroundColor: Colors.faintgray,
  },
  activeText: {
    fontSize: hp('1.5%'),
    color: '#ffffff',
    textAlign: 'center',
  },
  activeText2: {
    fontSize: hp('1.5%'),
    color: '#ffffff',
    textAlign: 'center',
  },
  activeText3: {
    fontSize: hp('1.5%'),
    color: '#ffffff',
    textAlign: 'center',
  },
  inactiveText: {
    fontSize: hp('1.5%'),
    color: Colors.darkgray,
    textAlign: 'center',
  },
});

const Common = styled.SafeAreaView`
  ${Platform.select({
  ios: {
    fontFamily: "Avenir",
  },
  android: {
    fontFamily: "Roboto",
    paddingTop: StatusBar.currentHeight,
  },
})}
  flex: 1;
`;

const Next = styled.View`
  padding: ${hp('2%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${Colors.faintgray};
  background-color: white;
`;

const Left = styled.View``;

const BtnContainer = styled.View`
  width: ${wp('30%')}px;
`;