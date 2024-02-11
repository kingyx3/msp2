import React from "react";
import useState from 'react-usestateref'
import { StyleSheet, View, Text, TextInput, Button, Appearance } from "react-native";

//import libraries
import { NavBar } from "../../components/NavBar";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _isEmpty from "lodash/isEmpty";
import moment from "moment";
import * as Network from 'expo-network';
import { showOfflineAlert } from '../../components/Firebase/firebase';

//import components
import * as Typography from "../../config/Typography";
import AppPicker from "../../components/AppPicker";
import * as ButtonA from "../../components/Button";

//import styles and assets
import styled from "styled-components/native";
import colors from "../../config/colors";
import { DURATION } from "../../config/appConfig"
//import redux
import { connect } from "react-redux";
import { setStart, setEnd } from "../../store/search";

// Testing date params (must remove in production)
let now = new Date()
process.env.EXPO_PUBLIC_TYPE == 'TEST' ? now.setUTCHours(26, 0, 0, 0, 0) : now.setMinutes(60, 0, 0);

const isDark = Appearance.getColorScheme() === 'dark'

const RangePicker = (props) => {
  const [startDateTime, setStartDateTime] = useState(now);
  const [duration, setDuration] = useState(DURATION[0]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState('date')

  const onNavigate = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      const endDateTime = moment(startDateTime).add(parseInt((duration.label).match(/(\d+)/)[0]), 'h');
      await props.setStart(moment(startDateTime).valueOf());
      await props.setEnd(endDateTime.valueOf());
      console.log(moment(startDateTime), endDateTime)
      return props.navigation.navigate('Home', { screen: 'Listings' });  //to specify specific screens in another navigator
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  };

  const showDatePicker = (mode) => {
    setDatePickerVisibility(true);
    setMode(mode)
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDatePickerVisibility(false)
    let selectedDateTime = new Date(date);
    selectedDateTime.getMinutes() === 0 ? null : selectedDateTime.setMinutes(60);
    if (now <= selectedDateTime) {
      setStartDateTime(selectedDateTime);
    } else {
      setStartDateTime(now);
    }
  };

  return (
    <Container>
      <NavBar nav="chevron-left" onPress={() => props.navigation.navigate('Home')} />
      <Detail>
        <View style={[{ padding: 10, alignItems: 'center' }]}>
          <Typography.H4>When do you wanna start playing?</Typography.H4>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: colors.lightgray, borderRadius: 8, width: '75%', justifyContent: 'center', }}>
            <ButtonA.BtnDateTime
              testID="open-date-picker"
              label={`${moment(startDateTime).format("DD MMM YYYY")}`}
              onPress={() => showDatePicker('date')}
            />
            <ButtonA.BtnDateTime
              testID="open-time-picker"
              label={`${moment(startDateTime).format("hA")}`}
              onPress={() => showDatePicker('time')}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              date={startDateTime}
              mode={mode}
              isDarkModeEnabled={isDark}
              themeVariant={isDark ? 'dark' : 'light'}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <Typography.H4>For how long?</Typography.H4>
          <View testID="duration-picker" style={[{ marginTop: 10, marginBottom: 10, width: '75%' }]}>
            <AppPicker
              selectedItem={duration}
              onSelectItem={(item) => setDuration(item)}
              items={DURATION}
              placeholder={""}
              icon="chevron-down"
              center
            />
          </View>
        </View>
      </Detail>
      <Next>
        <Left>
        </Left>
        <BtnContainer>
          <ButtonA.BtnContain
            testID="search-listings-button"
            label="Next"
            color={colors.red}
            size="small"
            disabled={false}
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

const Detail = styled.View`
  flex: 1;
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

const styles = StyleSheet.create({
  // calendar: {
  //   marginBottom: 10,
  // },
  // text: {
  //   textAlign: "center",
  //   padding: 10,
  //   backgroundColor: "lightgrey",
  //   fontSize: 16,
  // },
});

export default connect(null, { setStart, setEnd })(RangePicker);
