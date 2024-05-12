import React from "react";
import useState from 'react-usestateref';
import { Text, View, StatusBar, StyleSheet, Platform, SafeAreaView } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";

// import { Provider } from "react-redux";
// import store from "../store/store";
import { getFontSize } from "../config/Typography";
import styled from "styled-components/native";

//import WeekdayPicker from "react-native-weekday-picker"
// import WeekdayPicker from './RecurWeekDayPicker'
import TimePickerEditor from './RecurTimePickerEditor'
import * as Button from "./Button";
import Colors from "../config/colors";
// import { RRule, RRuleSet, rrulestr } from 'rrule';
// import moment from 'moment';

export default function RuleMakerEditor(props) {
  let { ruleDays, defaultRules, onSubmit } = props;
  // const days = ruleDays[0] == 0 ? 'MO,TU,WE,TH,FR' : ruleDays[0] == 5 ? 'SA' : 'SU'
  const [hours, setHours] = useState(defaultRules) // defaults to 8AM to 8PM
  // const [ruleList, setRuleList] = useState(["DTSTART:20210801T142604Z RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=" + days + ";BYHOUR=0,1,2,3,4,5,6,7,8,9,10,11;BYMINUTE=0;BYSECOND=0", null, null]) // set default
  // const [outputText, setOutputText] = useState('')
  const onChangeHour = (hours) => {
    setHours(hours)
    //console.log(hours)
  }
  // function keepNum(num, obj) {
  //   for (let key in obj) {
  //     if (!isNaN(obj[key]) && obj[key] !== num) {
  //       delete obj[key];
  //     }
  //   }
  //   return obj;
  // }
  // const toIntArray = arr => arr.map(Number);

  return (
    <Common>
      <View style={{ padding: 25 }}>
        {/*<Text>{outputText}</Text>*/}
        <Text style={{ fontSize: getFontSize(20) }}>Available Timeslots</Text>
      </View>
      <TimePickerEditor
        testID="time-picker-editor"
        hours={hours}
        onChange={hours => onChangeHour(hours)}
      />
      <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.active, { flex: 1, borderWidth: 1, borderColor: Colors.black }]}>
          <Text style={styles.activeText}>Available</Text>
        </View>
        <View style={[styles.active2, { flex: 1, borderWidth: 1, borderColor: Colors.black }]}>
          <Text style={styles.activeText2}>Peak</Text>
        </View>
        <View style={[styles.active3, { flex: 1, borderWidth: 1, borderColor: Colors.black }]}>
          <Text style={styles.activeText3}>Off-Peak</Text>
        </View>
        <View style={[styles.inactive, { flex: 1, borderWidth: 1, borderColor: Colors.black }]}>
          <Text style={styles.inactiveText}>Unavailable</Text>
        </View>
      </View>
      <Next>
        <Left></Left>
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
  // default:{
  //   height: 45,
  //   width: 90,
  //   //borderRadius: 35,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  active: {
    backgroundColor: Colors.blue
  },
  active2: {
    backgroundColor: Colors.red
  },
  active3: {
    backgroundColor: Colors.darkgray
  },
  inactive: {
    backgroundColor: Colors.faintgray
  },
  activeText: {
    fontSize: getFontSize(14),
    color: '#ffffff',
    textAlign: 'center',
  },
  activeText2: {
    fontSize: getFontSize(14),
    color: '#ffffff',
    textAlign: 'center',
  },
  activeText3: {
    fontSize: getFontSize(14),
    color: '#ffffff',
    textAlign: 'center',
  },
  inactiveText: {
    fontSize: getFontSize(14),
    color: Colors.darkgray,
    textAlign: 'center',
  },
})

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
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${Colors.faintgray};
  background-color: white;
`;
const Left = styled.View``;
const BtnContainer = styled.View`
  width: 30%;
`;
//https://github.com/brandnewjinah/react-native-airbnb-clone