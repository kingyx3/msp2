import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
//import components
// import AppForm from '../../components/forms/AppForm';
import AppPicker from '../../components/AppPicker';
import Counter from "../../components/Counter";
import RuleMakerEditor from '../../components/RuleMakerEditor';
//import styles and assets
import styled from 'styled-components/native';
import * as Typography from '../../config/Typography';
import colors from '../../config/colors';
import * as MyButton from '../../components/Button';
import Colors from '../../config/colors';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-elements';
//import { Button } from 'react-native-paper';
//import redux
import { connect } from 'react-redux';
import {
  setWeekdayRule,
  setSaturdayRule,
  setSundayRule,
  setMonthsAhead,
  setCancellationPolicy,
  setNeedHostConfirm,
} from '../../store/host';
import { getTimingDiffFromUTC, getCancellationPolicies } from '../../components/Firebase/firebase';

// const cancellationPolicies = [
//   { label: 'Super Flex', numberOfHours: 72 },
//   { label: 'Flex', numberOfHours: 48 },
//   { label: 'Medium', numberOfHours: 24 },
//   { label: 'Strict', numberOfHours: 12 },
//   { label: 'Super Strict', numberOfHours: 0 }]

const HostingEdit4 = (props) => {
  const { editMode, selectedSpace, defaultWeekday, defaultSaturday, defaultSunday } = props.route.params
  const [cancellationPolicies, setCancellationPolicies] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [ruleDays, setRuleDays] = useState([]);
  const [defaultRules, setDefaultRules] = useState()
  const [weekdaySet, setWeekdaySet] = useState(true);
  const [saturdaySet, setSaturdaySet] = useState(true);
  const [sundaySet, setSundaySet] = useState(true);
  const cancellationPoliciesSorted = cancellationPolicies.sort((a, b) => a.numberOfHours - b.numberOfHours)
  // const defaultRule = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0]
  // { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:1, 9:1, 10:1, 11:1, 12:1, 13:1, 14:1, 15:1, 16:1, 17:1, 18:1, 19:1, 20:0, 21:0, 22:0, 23:0,}
  const [weekdayRule, setWeekdayRule] = useState(defaultWeekday);
  const [saturdayRule, setSaturdayRule] = useState(defaultSaturday);
  const [sundayRule, setSundayRule] = useState(defaultSunday);
  const [monthsAhead, setMonthsAhead] = useState(1)
  const [cancellationPolicy, setCancellationPolicy] = useState(cancellationPoliciesSorted[2])
  const [needHostConfirm, setNeedHostConfirm] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    getCancellationPolicies(setCancellationPolicies)
  }, [])

  useEffect(() => { // used to set initial value to state
    if (selectedSpace && !count) {
      const timeDiffHours = getTimingDiffFromUTC()
      const shiftedArr = selectedSpace.openingHours.splice(-timeDiffHours);
      const adjustedToLocalOpeningHours = shiftedArr.concat(selectedSpace.openingHours);

      setSundayRule(adjustedToLocalOpeningHours.slice(0 * 24, 1 * 24))
      setWeekdayRule(adjustedToLocalOpeningHours.slice(1 * 24, 2 * 24))
      setSaturdayRule(adjustedToLocalOpeningHours.slice(6 * 24, 7 * 24))
      setMonthsAhead(selectedSpace.monthsAhead)
      setCancellationPolicy(selectedSpace.cancellationPolicy)
      setNeedHostConfirm(selectedSpace.needHostConfirm)
      setCount(1)
    }
  }, [count, selectedSpace])


  const onSubmit = (ruleDays, hours) => {
    if (ruleDays[0] == 0) {
      setWeekdaySet(true);
      setWeekdayRule(hours);
    } else if (ruleDays[0] == 5) {
      setSaturdaySet(true);
      setSaturdayRule(hours);
    } else {
      setSundaySet(true);
      setSundayRule(hours);
    }
    setModalVisible(false);
  };

  const onNavigate = () => {
    props.setWeekdayRule(weekdayRule);
    props.setSaturdayRule(saturdayRule);
    props.setSundayRule(sundayRule);
    props.setMonthsAhead(monthsAhead)
    props.setCancellationPolicy(cancellationPolicy)
    props.setNeedHostConfirm(needHostConfirm)
    props.navigation.navigate('HostingEdit5', { editMode, selectedSpace });
  };
  return (
    <Container>
      <Main>
        <Typography.H>Set your peak/off-peak periods</Typography.H>
        <Step style={{ paddingTop: 20 }}>
          <View style={styles.general}>
            <Button
              icon={
                <Icon
                  name={weekdaySet ? 'check-square-o' : 'square-o'}
                  size={15}
                  color="white"
                />
              }
              title="  Set Weekday Peak/Off-Peak"
              onPress={() => {
                setModalVisible(true);
                setRuleDays([0, 1, 2, 3, 4]);
                setDefaultRules(weekdayRule)
              }}
            />
          </View>
          <View style={styles.general}>
            <Button
              icon={
                <Icon
                  name={saturdaySet ? 'check-square-o' : 'square-o'}
                  size={15}
                  color="white"
                />
              }
              title="  Set Saturday Peak/Off-Peak"
              onPress={() => {
                setModalVisible(true);
                setRuleDays([5]);
                setDefaultRules(saturdayRule)
              }}
            />
          </View>
          <View style={styles.general}>
            <Button
              icon={
                <Icon
                  name={sundaySet ? 'check-square-o' : 'square-o'}
                  size={15}
                  color="white"
                />
              }
              title="  Set Sunday Peak/Off-Peak"
              onPress={() => {
                setModalVisible(true);
                setRuleDays([6]);
                setDefaultRules(sundayRule)
              }}
            />
          </View>
        </Step>
        <Step>
          <Typography.Sub1>
            How many months of advanced booking is allowed?
          </Typography.Sub1>
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
        </Step>
        <Step>
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
        </Step>
        <Step>
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
            ruleDays={ruleDays} //weekdays
            defaultRules={defaultRules}
            onSubmit={onSubmit}
          />
        </Modal>
      </Main>
      <Next>
        <Left></Left>
        <BtnContainer>
          <MyButton.BtnContain
            testID={'hosting-edit4-next-button'}
            label="Next"
            size="small"
            color={
              weekdaySet && saturdaySet && sundaySet && cancellationPolicy
                ? colors.red
                : colors.lightgray
            }
            disabled={!weekdaySet || !saturdaySet || !sundaySet || !cancellationPolicy}
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
  // viewTask: {
  //   position: 'absolute',
  //   top: 350,
  //   //bottom: 0,
  //   right: 17,
  //   height: 60,
  //   width: 60,
  //   backgroundColor: '#2E66E7',
  //   borderRadius: 30,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   shadowColor: '#2E66E7',
  //   shadowOffset: {
  //     width: 0,
  //     height: 5,
  //   },
  // },
  general: {
    padding: 5,
  },
  // button: {
  //   color: Colors.red,
  //   padding: 5,
  // },
});

export default connect(null, {
  setWeekdayRule,
  setSaturdayRule,
  setSundayRule,
  setMonthsAhead,
  setCancellationPolicy,
  setNeedHostConfirm
})(HostingEdit4);
