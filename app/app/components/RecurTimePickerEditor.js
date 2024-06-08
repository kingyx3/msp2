import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from "../config/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RecurTimePickerEditor = ({
  onChange = null,
  style = null,
  dayStyle = null,
  editMode,
  hours = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, }
}) => {
  const [hoursContainer, setHoursContainer] = useState([]);

  useEffect(() => {
    const innerHoursContainer = [];
    Object.keys(hours).forEach((hour, i) => {
      innerHoursContainer.push(
        <Hour
          key={i}
          toggleHour={toggleHour}
          hour={hour}
          style={[styles.day, dayStyle]}
          activeTextColor='38dfe1'
          isActive={hours[hour] === 1}
          isActive2={hours[hour] === 2}
          isActive3={hours[hour] === 3}
        />
      );
    });
    setHoursContainer(innerHoursContainer);
  }, [hours]);

  const handleChange = (updatedHours) => {
    onChange && onChange(updatedHours);
    const innerHoursContainer = [];
    Object.keys(updatedHours).forEach((hour, i) => {
      innerHoursContainer.push(
        <Hour
          key={i}
          toggleHour={toggleHour}
          hour={hour}
          style={[styles.day, dayStyle]}
          activeTextColor='38dfe1'
          isActive={updatedHours[hour] === 1}
          isActive2={updatedHours[hour] === 2}
          isActive3={updatedHours[hour] === 3}
        />
      );
    });
    setHoursContainer(innerHoursContainer);
  };

  const toggleHour = (hour) => {
    if (editMode) {
      if (hours[hour] === 3) {
        hours[hour] = 1;
      } else if (hours[hour] === 0) {
        hours[hour] = 0;
      } else {
        hours[hour] += 1;
      }
    } else {
      if (hours[hour] === 3) {
        hours[hour] = 0;
      } else {
        hours[hour] += 1;
      }
    }
    handleChange(hours);
  };

  return (
    <SafeAreaView>
      {[...Array(6)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.container}>
          {hoursContainer.slice(rowIndex * 4, (rowIndex + 1) * 4)}
        </View>
      ))}
    </SafeAreaView>
  );
};

const Hour = (props) => {
  const hoursMapping = {
    0: '12AM-1AM', 1: '1AM-2AM', 2: '2AM-3AM', 3: '3AM-4AM', 4: '4AM-5AM',
    5: '5AM-6AM', 6: '6AM-7AM', 7: '7AM-8AM', 8: '8AM-9AM', 9: '9AM-10AM',
    10: '10AM-11AM', 11: '11AM-12PM', 12: '12PM-1PM', 13: '1PM-2PM',
    14: '2PM-3PM', 15: '3PM-4PM', 16: '4PM-5PM', 17: '5PM-6PM', 18: '6PM-7PM',
    19: '7PM-8PM', 20: '8PM-9PM', 21: '9PM-10PM', 22: '10PM-11PM', 23: '11PM-12AM'
  };

  return (
    <TouchableOpacity
      style={[
        props.style,
        styles.default,
        props.isActive3 ? styles.active3 : props.isActive2 ? styles.active2 : props.isActive ? styles.active : styles.inactive
      ]}
      onPress={() => props.toggleHour(props.hour)}
    >
      <Text style={props.isActive3 ? styles.activeText3 : props.isActive2 ? styles.activeText2 : props.isActive ? styles.activeText : styles.inactiveText}>
        {hoursMapping[props.hour]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    height: hp('5%'),
    width: wp('20%'),
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
    fontSize: hp('1.5%'),
    color: '#ffffff'
  },
  activeText2: {
    fontSize: hp('1.5%'),
    color: '#ffffff'
  },
  activeText3: {
    fontSize: hp('1.5%'),
    color: '#ffffff'
  },
  inactiveText: {
    fontSize: hp('1.5%'),
    color: Colors.darkgray
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6%')
  },
  day: {
    margin: wp('1%')
  }
});

export default RecurTimePickerEditor;