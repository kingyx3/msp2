import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../config/colors";
import { getFontSize } from '../config/Typography';

// RecurTimePickerEditor.defaultProps = {
//   onChange: null,
//   style: null,
//   dayStyle: null,
//   hours: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, }
// }

const RecurTimePickerEditor = ({
  onChange = null,
  style = null,
  dayStyle = null,
  hours = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, }
}) => {
  /**
   * Function for toggling the day
   *
   * @param {String} day - Day of the week in one or two letters. e.g. M, Tu, W
   */
  //const [days, setDays] = useState({ 1:0, 2:1 , 3:1 , 4:1 , 5:1, 6:0, 0:0,})
  const [hoursContainer, setHoursContainer] = useState([])
  console.log('hours2', hours)
  function handleChange(hours) {
    onChange(hours)
    const innerHoursContainer = []
    Object.keys(hours).forEach((hour, i) => {
      innerHoursContainer.push(<Hour
        key={i}
        toggleHour={toggleHour}
        hour={hour}
        style={[styles.day, dayStyle]}
        activeTextColor='38dfe1'
        isActive={1 === hours[hour]}
        isActive2={2 === hours[hour]}
        isActive3={3 === hours[hour]}
      />)
    });
    setHoursContainer(innerHoursContainer)
    //console.log(days, innerDaysContainer.slice(0, 7))
  }
  const toggleHour = (hour) => {
    // If the day is 0 set it 1, if 1 set 0
    if (hours[hour] == 3) {
      hours[hour] = 1
    } else if (hours[hour] == 0) {
      hours[hour] = 0
    } else {
      hours[hour] = hours[hour] + 1
    }
    // Call the parent function to set the new reminder in the state
    handleChange(hours)

  }

  // Populate days of the week
  //
  //let daysContainer = [];

  Object.keys(hours).forEach((hour, i) => {
    hoursContainer.push(<Hour
      key={i}
      toggleHour={toggleHour}
      hour={hour}
      style={[styles.day, dayStyle]}
      activeTextColor='38dfe1'
      isActive={1 === hours[hour]} // Pass boolean
      isActive2={2 === hours[hour]}
      isActive3={3 === hours[hour]}
    />)
  });

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        {hoursContainer.slice(0, 4)}
      </View>
      <View style={[styles.container]}>
        {hoursContainer.slice(4, 8)}
      </View>
      <View style={[styles.container]}>
        {hoursContainer.slice(8, 12)}
      </View>
      <View style={[styles.container]}>
        {hoursContainer.slice(12, 16)}
      </View>
      <View style={[styles.container]}>
        {hoursContainer.slice(16, 20)}
      </View>
      <View style={[styles.container]}>
        {hoursContainer.slice(20, 24)}
      </View>
    </SafeAreaView>
  );
}

function Hour(props) {
  let hoursMapping = { 0: '12AM-1AM', 1: '1AM-2AM', 2: '2AM-3AM', 3: '3AM-4AM', 4: '4AM-5AM', 5: '5AM-6AM', 6: '6AM-7AM', 7: '7AM-8AM', 8: '8AM-9AM', 9: '9AM-10AM', 10: '10AM-11AM', 11: '11AM-12PM', 12: '12PM-1PM', 13: '1PM-2PM', 14: '2PM-3PM', 15: '3PM-4PM', 16: '4PM-5PM', 17: '5PM-6PM', 18: '6PM-7PM', 19: '7PM-8PM', 20: '8PM-9PM', 21: '9PM-10PM', 22: '10PM-11PM', 23: '11PM-12AM' }
  //let hoursMapping = {0: '12AM', 1:'1AM', 2: '2AM', 3: '3AM', 4:'4AM', 5:'5AM', 6:'6AM', 7: '7AM', 8:'8AM', 9: '9AM', 10: '10AM', 11:'11AM', 12: '12PM', 13: '1PM', 14:'2PM', 15: '3PM', 16:'4PM', 17:'5PM', 18:'6PM', 19: '7PM', 20: '8PM', 21:'9PM', 22: '10PM', 23: '11PM'}
  return (
    <TouchableOpacity
      style={[props.style, styles.default, props.isActive3 ? styles.active3 : props.isActive2 ? styles.active2 : props.isActive ? styles.active : styles.inactive]}
      onPress={() => props.toggleHour(props.hour)}
    >
      <Text style={props.isActive3 ? styles.activeText3 : props.isActive2 ? styles.activeText2 : props.isActive ? styles.activeText : styles.inactiveText}>
        {hoursMapping[props.hour]}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    //fontSize: 10,
    height: 45,
    width: 90,
    //borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    color: '#ffffff'
  },
  activeText2: {
    fontSize: getFontSize(14),
    color: '#ffffff'
  },
  activeText3: {
    fontSize: getFontSize(14),
    color: '#ffffff'
  },
  inactiveText: {
    fontSize: getFontSize(14),
    color: Colors.darkgray
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
    height: 50,
    alignItems: 'center'
  },
  day: {
    margin: 3
  }
});

export default RecurTimePickerEditor