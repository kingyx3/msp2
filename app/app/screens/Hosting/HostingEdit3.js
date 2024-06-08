import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import RuleMakerEditor from '../../components/RuleMakerEditor';
import styled from 'styled-components/native';
import * as Typography from '../../config/Typography';
import colors from '../../config/colors';
import * as MyButton from '../../components/Button';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect, } from 'react-redux';
import {
  setOpeningHours
} from '../../store/host';
import { getTimingDiffFromUTC } from '../../components/Firebase/firebase';

const initializeDefaultRules = () => {
  const defaultRules = Array(168).fill(0);
  for (let day = 0; day < 7; day++) {
    for (let hour = 8; hour < 18; hour++) {
      defaultRules[day * 24 + hour] = 1; // Assume 1 is the code for open hours
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

  return (
    <Container>
      <Main testID="hosting-step3-scroll-view">
        <Typography.H>Set your peak/off-peak periods</Typography.H>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => renderButton(day, index))}
        <Modal animationType="fade" visible={modalVisible}>
          <RuleMakerEditor
            ruleDays={ruleDays}
            defaultRules={defaultRules}
            onSubmit={onSubmit}
          />
        </Modal>
      </Main >
      <Next>
        <Left></Left>
        <BtnContainer>
          <MyButton.BtnContain
            testID={'hosting-step3-next-button'}
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