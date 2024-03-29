import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HourlyRentalComponent from '../../components/AvailabilityCalendar';

//import components
import * as Button from '../../components/Button';
// import Counter from '../../components/Counter';
import { fetchSpaceAvailability, updateBlocked, showOfflineAlert } from '../../components/Firebase/firebase';
import * as Network from 'expo-network';

//import screens
import moment from 'moment';
//import styles and assets
import styled from 'styled-components/native';
import colors from '../../config/colors';
import * as Typography from '../../config/Typography';
import { useIsFocused } from '@react-navigation/native';
// import { timeslots } from '../../data/dbschema';

const { width, height } = Dimensions.get('window');

const SpaceAvailability = (props) => {
  let isFocused = useIsFocused();
  const { selectedSpace } = props.route.params
  let dbEvents = props.state.spaceAvailability
  const spaceTypes = [...(props.spaceTypes)]
  const selectedSpaceType = (spaceTypes.filter((spaceType) => spaceType.label === selectedSpace.spaceType))[0]
  const [datedEvents, setDatedEvents] = useState({})
  const [disabled, setDisabled] = useState(false)
  const [stateCount, setStateCount] = useState(0)

  useEffect(() => {
    // Adding date key in between year and timeslots
    let spaceAvailabilityObj = {}
    for (let timeSlot in dbEvents) {
      let date = moment(+timeSlot).format('YYYY-MM-DD') // local, not utc date
      if (spaceAvailabilityObj[date]) {
        spaceAvailabilityObj[date][timeSlot] = dbEvents[timeSlot]
      } else {
        spaceAvailabilityObj[date] = { [timeSlot]: dbEvents[timeSlot] }
      }
    }
    setDatedEvents(spaceAvailabilityObj)
  }, [dbEvents])

  useEffect(() => {
    if (isFocused && stateCount == 0) {
      props.fetchSpaceAvailability(selectedSpace.id)
      setStateCount(1)
    }
  }, [isFocused, dbEvents]);

  return (
    <Container>
      <Flex>
        <Typography.H2 testID={'space-calendar-header'}>
          Total: {selectedSpace.spaceCount} space(s)
        </Typography.H2>
      </Flex>
      <HourlyRentalComponent
        data={datedEvents}
        unitLabel={selectedSpaceType.unitLabel}
        disabled={disabled}
        setDatedEvents={setDatedEvents}
      />
      <Step>
        <Button.BtnContain
          testID={'space-calendar-confirm-button'}
          label="Confirm Changes"
          color={disabled ? colors.lightgray : colors.red}
          disabled={disabled}
          onPress={async () => {
            const networkState = await Network.getNetworkStateAsync();
            if (networkState.isConnected) {
              // Device is connected to the internet
              // console.log('pressed', selectedSpace.id, spaceAvailabilityObj)
              setDisabled(true)

              // Flatten the data while keeping the other data intact
              const newDbEvents = Object.values(datedEvents).reduce((acc, entries) => {
                Object.entries(entries).forEach(([key, value]) => {
                  acc[key] = value;
                });
                return acc;
              }, {});

              const updateDbEvents = {}
              for (timeSlot in dbEvents) {
                const year = new Date(+timeSlot).getFullYear()
                if (dbEvents[timeSlot].length === newDbEvents[timeSlot].length && dbEvents[timeSlot].every((element, index) => element === newDbEvents[timeSlot][index])) { // Array content comparison
                  null
                } else {
                  // Splitting the inputs by year for faster backend updates
                  if (updateDbEvents[year]) {
                    updateDbEvents[year][timeSlot] = newDbEvents[timeSlot]
                  } else {
                    updateDbEvents[year] = { [timeSlot]: newDbEvents[timeSlot] }
                  }
                }
              }

              // console.log('newDbEvents', newDbEvents);
              // console.log('dbEvents', dbEvents);
              console.log('updateDbEvents', updateDbEvents);

              updateBlocked(selectedSpace.id, updateDbEvents)
                .then(() => {
                  Alert.alert("Updated successfully!", "Success", [
                    { text: "OK", onPress: () => props.navigation.goBack() },
                  ]);
                  setDisabled(false)
                })
                .catch((e) => {
                  Alert.alert("Failed to update block!", e, [
                    { text: "OK", onPress: () => props.navigation.goBack() },
                  ]);
                  setDisabled(false)
                })
            } else {
              // Device is not connected to the internet
              showOfflineAlert()
            }
          }}
        />
      </Step>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ModalView = styled.View`
  flex: 1;
  margin: ${width * 0.1}px;
  marginTop: ${height * 0.35}px;
  marginBottom: ${height * 0.35}px;
  backgroundColor: white;
  borderRadius: 10px;
  padding: 25px;
  alignItems: center;
  shadowOpacity: 0.25;
`;

const Flex = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Step = styled.View`
  margin: 20px 30px 20px;
`;

const mapStateToProps = (state) => {
  return {
    state: state.host,
    spaceTypes: state.user.spaceTypes,
  };
};

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchSpaceAvailability }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(SpaceAvailability);