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
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import components
// import AppForm from '../../components/forms/AppForm';
// import AppPicker from '../../components/AppPicker';
import OpeningHours from '../../components/OpeningHours';
//import Counter from "../components/Counter";
// import RuleMakerEditor from '../../components/RuleMakerEditor';
// import DatePicker from 'react-native-datepicker'
//import styles and assets
import styled from 'styled-components/native';
import * as Typography from '../../config/Typography';
import colors from '../../config/colors';
import * as MyButton from '../../components/Button';
// import Colors from '../../config/colors';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
//import { Button } from 'react-native-paper';
//import redux
import { connect } from 'react-redux';
import {
  setPrice,
  setPeakPrice,
  setOffPeakPrice,
} from '../../store/host';

let now = new Date()
now.setHours(8)
now.setMinutes(0)
let baseStart = new Date(now)
now.setHours(18)
now.setMinutes(0)
let baseEnd = new Date(now)

const HostingEdit12 = (props) => {
  const { editMode, selectedSpace } = props.route.params
  const [start, setStart] = useState(baseStart);
  const [end, setEnd] = useState(baseEnd);
  const [fullDay, setFullDay] = useState(false);
  const [startSat, setStartSat] = useState(baseStart);
  const [endSat, setEndSat] = useState(baseEnd);
  const [fullDaySat, setFullDaySat] = useState(false);
  const [startSun, setStartSun] = useState(baseStart);
  const [endSun, setEndSun] = useState(baseEnd);
  const [fullDaySun, setFullDaySun] = useState(false);

  const getDefaults = (start, end, fullDay) => {
    let defaultRule = []
    if (fullDay) {
      defaultRule = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    } else {
      defaultRule = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      let opening = start.getHours()
      let closing = end.getHours()
      for (let i = 0; i < 24; i++) {
        if (closing < opening) {
          if (i >= closing && i < opening) {
            defaultRule[i] = 0
          } else {
            defaultRule[i] = 1
          }
        } else {
          if (i >= opening && i < closing) {
            defaultRule[i] = 1
          } else {
            defaultRule[i] = 0
          }
        }
      }
    }
    return defaultRule
  }

  const onNavigate = () => {
    let defaultWeekday = getDefaults(start, end, fullDay)
    let defaultSaturday = getDefaults(startSat, endSat, fullDaySat)
    let defaultSunday = getDefaults(startSun, endSun, fullDaySun)
    // console.log(defaultWeekday, defaultSaturday, defaultSunday)
    props.navigation.navigate('HostingEdit4', { editMode, selectedSpace, defaultWeekday, defaultSaturday, defaultSunday });
  };
  return (
    <Container>
      <Main>
        <Typography.H>Set your opening hours</Typography.H>
        <Step style={{ paddingTop: 20 }}>
          <Typography.H4>Weekdays</Typography.H4>
          <OpeningHours
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            fullDay={fullDay}
            setFullDay={setFullDay}
          />
        </Step>
        <Step>
          <Typography.H4>Saturdays</Typography.H4>
          <OpeningHours
            start={startSat}
            setStart={setStartSat}
            end={endSat}
            setEnd={setEndSat}
            fullDay={fullDaySat}
            setFullDay={setFullDaySat}
          />
        </Step>
        <Step>
          <Typography.H4>Sundays</Typography.H4>
          <OpeningHours
            start={startSun}
            setStart={setStartSun}
            end={endSun}
            setEnd={setEndSun}
            fullDay={fullDaySun}
            setFullDay={setFullDaySun}
          />
        </Step>
      </Main>
      <Next>
        <Left></Left>
        <BtnContainer>
          <MyButton.BtnContain
            testID={'hosting-step3-next-button'}
            label="Next"
            size="small"
            color={colors.red}
            // disabled={}
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
  margin: 15px 0 10px 0;
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
  // general: {
  //   padding: 10,
  // },
  // button: {
  //   color: Colors.red,
  //   padding: 5,
  // },
});

export default connect(null, {
  setPrice,
  setPeakPrice,
  setOffPeakPrice,
})(HostingEdit12);
