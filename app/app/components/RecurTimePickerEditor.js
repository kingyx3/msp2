import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from '../config/colors';
import { getFontSize } from '../config/Typography';

const RecurTimePickerEditor = ({
  onChange = () => { },
  style = null,
  dayStyle = null,
  hours = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, }
}) => {
  const [currentHours, setCurrentHours] = useState(hours);

  useEffect(() => {
    onChange(currentHours);
  }, [currentHours]);

  const toggleHour = (hour) => {
    const updatedHours = { ...currentHours };
    updatedHours[hour] = (updatedHours[hour] + 1) % 4;
    setCurrentHours(updatedHours);
  };

  const renderHourRows = () => {
    const rows = [];
    for (let i = 0; i < 24; i += 4) {
      rows.push(
        <View key={i} style={styles.container}>
          {Array.from({ length: 4 }, (_, j) => i + j).map(hour => (
            <Hour
              key={hour}
              hour={hour}
              toggleHour={toggleHour}
              isActive={currentHours[hour]}
              style={[styles.day, dayStyle]}
            />
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <SafeAreaView style={style}>
      {renderHourRows()}
    </SafeAreaView>
  );
};

const Hour = ({ hour, toggleHour, isActive, style }) => {
  const hoursMapping = {
    0: '12AM-1AM', 1: '1AM-2AM', 2: '2AM-3AM', 3: '3AM-4AM',
    4: '4AM-5AM', 5: '5AM-6AM', 6: '6AM-7AM', 7: '7AM-8AM',
    8: '8AM-9AM', 9: '9AM-10AM', 10: '10AM-11AM', 11: '11AM-12PM',
    12: '12PM-1PM', 13: '1PM-2PM', 14: '2PM-3PM', 15: '3PM-4PM',
    16: '4PM-5PM', 17: '5PM-6PM', 18: '6PM-7PM', 19: '7PM-8PM',
    20: '8PM-9PM', 21: '9PM-10PM', 22: '10PM-11PM', 23: '11PM-12AM'
  };

  const getBackgroundColor = () => {
    switch (isActive) {
      case 3:
        return Colors.darkgray;
      case 2:
        return Colors.red;
      case 1:
        return Colors.blue;
      default:
        return Colors.faintgray;
    }
  };

  const getTextColor = () => (isActive ? '#ffffff' : Colors.darkgray);

  return (
    <TouchableOpacity
      style={[style, styles.default, { backgroundColor: getBackgroundColor() }]}
      onPress={() => toggleHour(hour)}
    >
      <Text style={{ fontSize: getFontSize(14), color: getTextColor() }}>
        {hoursMapping[hour]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    height: 45,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
  },
  day: {
    margin: 3,
  },
});

export default RecurTimePickerEditor;