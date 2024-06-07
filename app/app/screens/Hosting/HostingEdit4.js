import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import AppPicker from '../../components/AppPicker';
import Counter from "../../components/Counter";
import RuleMakerEditor from '../../components/RuleMakerEditor';
import styled from 'styled-components/native';
import * as Typography from '../../config/Typography';
import colors from '../../config/colors';
import * as MyButton from '../../components/Button';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  setWeekdayRule,
  setMonthsAhead,
  setCancellationPolicy,
  setNeedHostConfirm,
} from '../../store/host';
import { getTimingDiffFromUTC, getCancellationPolicies } from '../../components/Firebase/firebase';

const initializeDefaultRules = () => {
  const defaultRules = Array(168).fill(0);
  for (let day = 0; day < 7; day++) {
    for (let hour = 8; hour < 18; hour++) {
      defaultRules[day * 24 + hour] = 1; // Assume 1 is the code for open hours
    }
  }
  return defaultRules;
};

const HostingEdit4 = (props) => {
  const { editMode, selectedSpace } = props.route.params;
  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [ruleDays, setRuleDays] = useState([]);
  const [defaultRules, setDefaultRules] = useState(initializeDefaultRules());
  const [weekdayRules, setWeekdayRules] = useState(initializeDefaultRules());
  const [monthsAhead, setMonthsAhead] = useState(1);
  const [cancellationPolicy, setCancellationPolicy] = useState(null);
  const [needHostConfirm, setNeedHostConfirm] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCancellationPolicies(setCancellationPolicies);
  }, []);

  useEffect(() => {
    if (selectedSpace && !count) {
      const timeDiffHours = getTimingDiffFromUTC();
      const shiftedArr = selectedSpace.openingHours.splice(-timeDiffHours);
      const adjustedToLocalOpeningHours = shiftedArr.concat(selectedSpace.openingHours);

      const newRules = revertPricesInOpeningHours(adjustedToLocalOpeningHours, selectedSpace.price, selectedSpace.peakPrice, selectedSpace.offPeakPrice);

      setWeekdayRules(newRules);
      setMonthsAhead(selectedSpace.monthsAhead);
      setCancellationPolicy(selectedSpace.cancellationPolicy);
      setNeedHostConfirm(selectedSpace.needHostConfirm);
      setCount(1);
    }
  }, [count, selectedSpace]);

  const onSubmit = (ruleDays, hours) => {
    const newRules = [...weekdayRules];
    ruleDays.forEach(day => {
      for (let hour = 0; hour < 24; hour++) {
        newRules[day * 24 + hour] = hours[hour];
      }
    });
    console.log(newRules)
    setWeekdayRules(newRules);
    setModalVisible(false);
  };

  const onNavigate = () => {
    props.setWeekdayRule(weekdayRules);
    props.setMonthsAhead(monthsAhead);
    props.setCancellationPolicy(cancellationPolicy);
    props.setNeedHostConfirm(needHostConfirm);
    props.navigation.navigate('HostingEdit5', { editMode, selectedSpace });
  };

  const renderButton = (day, index) => (
    <View style={styles.general} key={index}>
      <Button
        icon={
          <Icon
            name={weekdayRules.slice(index * 24, (index + 1) * 24).some(hour => hour) ? 'check-square-o' : 'square-o'}
            size={15}
            color="white"
          />
        }
        title={`  Set ${day} Peak/Off-Peak`}
        onPress={() => {
          setModalVisible(true);
          setRuleDays([index]);
          setDefaultRules(weekdayRules.slice(index * 24, (index + 1) * 24));
        }}
      />
    </View>
  );

  return (
    <Container>
      <Main testID="hosting-edit4-scroll-view">
        <Typography.H>Set your peak/off-peak periods</Typography.H>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => renderButton(day, index))}
        <Step>
          <Typography.Sub1>How many months of advanced booking is allowed?</Typography.Sub1>
          <Flex>
            <Typography.P colors={colors.gray}>Number of months</Typography.P>
            <View style={{ width: "30%" }}>
              <Counter
                result={monthsAhead}
                onMinus={(item) => item > 0 ? setMonthsAhead(item) : null}
                onPlus={(item) => setMonthsAhead(item)}
                max={12}
              />
            </View>
          </Flex>
          <Typography.Sub1>Choose a cancellation policy</Typography.Sub1>
          <InputWrapper>
            <AppPicker
              testID={'cancellation-policy-picker'}
              selectedItem={cancellationPolicy}
              onSelectItem={(item) => setCancellationPolicy(item)}
              items={cancellationPolicies}
              placeholder={"Choose one"}
              icon="chevron-down"
            />
          </InputWrapper>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Typography.Sub1>Require pre-booking approval?  </Typography.Sub1>
            <Switch
              testID="need-host-confirm-switch"
              value={needHostConfirm}
              onValueChange={() => setNeedHostConfirm(!needHostConfirm)}
              color={'purple'}
              thumbColor={'white'}
            />
          </View>
        </Step>
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
            testID={'hosting-edit4-next-button'}
            label="Next"
            size="small"
            color={
              weekdayRules.some(rule => rule) && cancellationPolicy
                ? colors.red
                : colors.lightgray
            }
            disabled={!weekdayRules.some(rule => rule) || !cancellationPolicy}
            onPress={() => onNavigate()}
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
  setWeekdayRule,
  setMonthsAhead,
  setCancellationPolicy,
  setNeedHostConfirm
})(HostingEdit4);

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
