import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
} from 'react-native';
import RuleMakerEditor from '../../components/RuleMakerEditor';
import styled from 'styled-components/native';
import * as Typography from '../../config/Typography';
import colors from '../../config/colors';
import * as MyButton from '../../components/Button';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
  setOpeningHours
} from '../../store/host';
import { getTimingDiffFromUTC } from '../../components/Firebase/firebase';

const initializeDefaultRules = () => {
  const defaultRules = Array(168).fill(0);
  for (let day = 0; day < 7; day++) {
    for (let hour = 8; hour < 18; hour++) {
      defaultRules[day * 24 + hour] = 1; // Assume 1 is the code for regular hours
    }
  }
  return defaultRules;
};

const HostingEdit3 = (props) => {
  const { editMode, selectedSpace } = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [ruleDays, setRuleDays] = useState([]);
  const [defaultRules, setDefaultRules] = useState(initializeDefaultRules());
  const [openingHours, setOpeningHours] = useState(initializeDefaultRules());
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (selectedSpace && !count) {
      const adjustedToLocalOpeningHours = adjustOpeningHoursToLocal(selectedSpace.openingHours);
      const oldRules = revertPricesInOpeningHours(adjustedToLocalOpeningHours, selectedSpace.price, selectedSpace.peakPrice, selectedSpace.offPeakPrice);
      setOpeningHours(oldRules);
      setCount(1);
    }
  }, [count, selectedSpace]);

  const onSubmit = (ruleDays, hours) => {
    const newRules = [...openingHours];
    ruleDays.forEach(day => {
      for (let hour = 0; hour < 24; hour++) {
        newRules[day * 24 + hour] = hours[hour];
      }
    });
    console.log(newRules);
    setOpeningHours(newRules);
    setModalVisible(false);
  };

  const onNavigate = () => {
    props.setOpeningHours(openingHours);
    props.navigation.navigate('HostingEdit4', { editMode, selectedSpace });
  };

  const renderButton = (day, index) => (
    <View style={styles.general} key={index}>
      <Button
        icon={
          <Icon
            name={openingHours.slice(index * 24, (index + 1) * 24).some(hour => hour) ? 'check-square-o' : 'square-o'}
            size={15}
            color="white"
          />
        }
        title={`  Set ${day} Peak/Off-Peak`}
        onPress={() => {
          setModalVisible(true);
          setRuleDays([index]);
          setDefaultRules(openingHours.slice(index * 24, (index + 1) * 24));
        }}
      />
    </View>
  );

  const convertArrayToReadableFormat = (openingHours) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const hoursInDay = 24;
    let result = {};

    daysOfWeek.forEach((day, index) => {
      let dayHours = openingHours.slice(index * hoursInDay, (index + 1) * hoursInDay);
      let intervals = [];
      let currentStatus = dayHours[0];
      let startHour = 0;

      for (let hour = 1; hour <= hoursInDay; hour++) {
        if (dayHours[hour] !== currentStatus || hour === hoursInDay) {
          const timeInterval = `${formatHour(startHour)} - ${formatHour(hour)}${getStatusSuffix(currentStatus)}`;
          if (currentStatus !== 0) intervals.push(timeInterval);
          
          currentStatus = dayHours[hour];
          startHour = hour;
        }
      }

      result[day] = intervals.length > 0 ? intervals : ["Closed"];
    });

    return result;
  };

  const formatHour = (hour) => {
    let period = hour < 12 || hour === 24 ? 'AM' : 'PM';
    let formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour} ${period}`;
  };

  const getStatusSuffix = (status) => {
    switch (status) {
      case 1:
        return '';
      case 2:
        return ' (peak)';
      case 3:
        return ' (off peak)';
      default:
        return '';
    }
  };

  const readableOpeningHours = convertArrayToReadableFormat(openingHours);

  return (
    <Container>
      <Main testID="hosting-edit3-scroll-view">
        <Typography.H>Set your peak/off-peak periods</Typography.H>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
          <View key={index}>
            {renderButton(day, index)}
            <Text style={styles.dayTitle}>{day}:</Text>
            {readableOpeningHours[day].map((interval, idx) => (
              <Text key={idx} style={styles.intervalText}>{interval}</Text>
            ))}
          </View>
        ))}
        <Modal animationType="fade" visible={modalVisible}>
          <RuleMakerEditor
            ruleDays={ruleDays}
            editMode={editMode}
            defaultRules={defaultRules}
            onSubmit={onSubmit}
          />
        </Modal>
      </Main>
      <Next>
        <Left></Left>
        <BtnContainer>
          <MyButton.BtnContain
            testID={'hosting-edit3-next-button'}
            label="Next"
            size="small"
            color={
              openingHours.some(rule => rule)
                ? colors.red
                : colors.lightgray
            }
            disabled={!openingHours.some(rule => rule)}
            onPress={onNavigate}
          />
        </BtnContainer>
      </Next>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
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
  margin: 20px 0;
`;

const InputWrapper = styled.View`
  margin: 15px 0 10px 0;
`;

const Flex = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px 10px 10px 0;
`;

const styles = StyleSheet.create({
  general: {
    padding: 5,
  },
  dayTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  intervalText: {
    marginLeft: 10,
  },
});

export default connect(null, {
  setOpeningHours
})(HostingEdit3);

function adjustOpeningHoursToLocal(openingHours) {
  const timeDiffHours = getTimingDiffFromUTC();
  const shiftedArr = openingHours.slice(-timeDiffHours);
  const adjustedToLocalOpeningHours = shiftedArr.concat(openingHours.slice(0, -timeDiffHours));
  return adjustedToLocalOpeningHours;
}

function revertPricesInOpeningHours(openingHours, price, peakPrice, offPeakPrice) {
  return openingHours.map(hour => {
    switch (hour) {
      case price:
        return 1;
      case peakPrice:
        return 2;
      case offPeakPrice:
        return 3;
      default:
        return 0;
    }
  });
}