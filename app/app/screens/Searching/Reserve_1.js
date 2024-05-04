import React, { useState, useEffect } from "react";
import { View, Switch, Alert, Text, TextInput } from "react-native";
import moment from 'moment';
import ModalSelector from 'react-native-modal-selector';
import AppPicker from "../../components/AppPicker";

//import components
import * as Button from "../../components/Button";
import * as IconLabel from "../../components/IconLabel";

//import styles and assets
import styled from "styled-components/native";
import colors from "../../config/colors";
import * as Typography from "../../config/Typography";

//import redux
import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
import * as Network from 'expo-network';
import { createBooking, showOfflineAlert } from "../../components/Firebase/firebase";
// import { initStripe, useStripe } from '@stripe/stripe-react-native';
import ImgSliderItems from "../../components/ImgSliderItems";

// const availableCourtIds = [{ key: 0, label: '1' }, { key: 1, label: '2' }, { key: 2, label: '3' }]

const Reserve_1 = (props) => {
  // const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const { selectedSpace, periodPrice, periodAvailabilityArray, hours, } = props.route.params;
  const spaceTypes = [...(props.spaceTypes)]
  const selectedSpaceType = (spaceTypes.filter((spaceType) => spaceType.label === selectedSpace.spaceType))[0]

  const courts = periodAvailabilityArray.map(function (value, index) {
    if (value == hours) {
      return {
        value: index, // Court index
        // courtId: index.toString(),
        label: (index + 1).toString() // Court number
      }
    }
  })
  const availableCourts = courts.filter(element => element !== undefined)
  const [courtLabel, setCourtLabel] = useState(availableCourts[0])
  const courtId = parseInt(courtLabel.label) - 1
  // console.log('periodAvailabilityArray', periodAvailabilityArray)
  // console.log('courts', courts)
  // console.log('availableCourts', availableCourts)
  // console.log('courtId', courtId)
  let start = props.state.start;
  let end = props.state.end;
  let startM = moment(start);
  let endM = moment(end);
  let cancelByTime = moment(start).add(-1 * selectedSpace.cancellationPolicy.numberOfHours, 'hours').format('DD MMM YYYY, h a')

  const needHostConfirm = async () => {
    Alert.alert('Requires host confirmation', 'We will send you a confirmation when the host accepts the booking.',
      [{
        text: 'Cancel',
        onPress: () => null
      }, {
        text: 'Proceed',
        onPress: () => onSubmit()
      }]);
  }

  const onSubmit = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      setLoading(true)
      // console.log(selectedSpace.id, start, end, bookingId, courtId)
      createBooking(selectedSpace.id, start, end, courtId)
        .then(async () => {
          Alert.alert('Success', selectedSpace.needHostConfirm ? 'Your booking is now pending host confirmation.' : 'The payment was confirmed successfully.', [{
            text: 'Ok',
            onPress: () => props.navigation.navigate('Home', { screen: 'Home ' })
          }]);
          setLoading(false);
        })
        .catch((e) => {
          Alert.alert('Error', e.message, [{
            text: 'Ok',
            onPress: () => {
              // Gets the amount to top up from the error message
              const amount = e?.message?.split("SGD ")[1]?.slice(0, -1)
              // Lack of money in wallet, navigate to topup
              if (amount) props.navigation.navigate("TopUp ", { requiredTopUp: amount, requiredAmt: calcTotal() })
              // Lack of availability for this timeslot (or other issues like no internet connection), navigate to listings
              else props.navigation.navigate("Listings")
            }
          }])
          setLoading(false);
        })
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  };

  const calcTotal = () => {
    const total = Math.round((periodPrice
      + Number.EPSILON) * 100) / 100;
    return total;
  };

  return (
    <Container>
      <Detail>
        <MainWrapper>
          <Flex>
            <View>
              <Typography.Cap color={colors.gray}>
                {selectedSpace.spaceType}
              </Typography.Cap>
              <View testID="reservation-cost" style={{ marginVertical: 5 }}>
                <Typography.Sub1>${calcTotal()}</Typography.Sub1>
              </View>
              {selectedSpace.ratingCount == 0 ? null :
                <IconLabel.FA
                  icon="star"
                  label={(selectedSpace.ratingTotal / selectedSpace.ratingCount).toFixed(2)}
                  label2={"(" + selectedSpace.ratingCount.toString() + ")"}
                  color={colors.red}
                />
              }
              {/* <IconLabel.FA
                icon="star"
                label="4.65"
                label2="(305)"
                color={colors.red}
              /> */}
            </View>
            <ImgSliderItems
              source={selectedSpace.images[0]}
              customStyle={{
                width: "40%",
                height: 80,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                contentFit: "cover"
              }} />
            {/* <CoverImg source={{ uri: selectedSpace.images[0] }} resizeMode="cover" /> */}
          </Flex>
          <HLine />
          <Flex>
            <View>
              <Typography.Cap color={colors.gray}>From</Typography.Cap>
              <Typography.Sub1>{startM.format('DD MMM YYYY')}</Typography.Sub1>
              <Typography.Sub1>{startM.format('hh:mm a')}</Typography.Sub1>
            </View>
            <View>
              <Typography.Cap color={colors.gray}>To</Typography.Cap>
              <Typography.Sub1>{endM.format('DD MMM YYYY')}</Typography.Sub1>
              <Typography.Sub1>{endM.format('hh:mm a')}</Typography.Sub1>
            </View>
            <View>
              {/*
              <Typography.Cap color={colors.gray}>Players</Typography.Cap>
              <Typography.Sub1>{total()} players</Typography.Sub1>
            */}
            </View>
          </Flex>
          <HLine />
          {/*<Flex>

            <Typography.Sub1>Is this a business trip?</Typography.Sub1>
            <Switch
              trackColor={{ false: colors.faintgray, true: colors.blue }}
              ios_backgroundColor={colors.faintgray}
              value={bizTrip}
              onValueChange={(newValue) => setBiztrip(newValue)}
            ></Switch>
          </Flex>
          <HLine />*/}
          {/* -------------- */}
          <Flex>
            <Typography.Sub1>{selectedSpaceType.unitLabel} Number</Typography.Sub1>
            {/* <Text style={{ fontSize: 18 }}>Which Court?</Text> */}
            <View style={{ width: '25%' }}>
              <AppPicker
                selectedItem={courtLabel}
                onSelectItem={(item) => setCourtLabel(item)}
                items={availableCourts}
                placeholder={""}
                icon="chevron-down"
                disabled={loading}
              />
            </View>
            {/* <ModalSelector
              // key={'Duration'}
              data={availableCourts}
              initValue={courtLabel}
              style={{ color: 'black', alignItems: 'center' }}
              onChange={(option) => {
                // console.log(option)
                setCourtLabel(option.label)
              }}>
              <Typography.Sub1 bold color={colors.blue}>   {courtLabel}   </Typography.Sub1>
            </ModalSelector>*/}
          </Flex>
          {/* -------------- */}
          <HLine />
          <View>
            <View testID="fee-information" style={{ marginTop: 20, marginHorizontal: 20 }}>
              <Typography.Cap color={colors.gray}>
                Fee and tax information
              </Typography.Cap>
            </View>
            <Flex>
              <Typography.Sub1>Booking fee</Typography.Sub1>
              <Typography.Sub1>${periodPrice}</Typography.Sub1>
            </Flex>
            {/*<Flex>
              <Typography.Sub1>Cleaning fee</Typography.Sub1>
              <Typography.Sub1>${calcCleaning()}</Typography.Sub1>
            </Flex>*/}
            {/* <Flex>
              <Typography.Sub1>Platform fee</Typography.Sub1>
              <Typography.Sub1>${fees}</Typography.Sub1>
            </Flex> */}
            <HLine />
            <Flex>
              <Typography.Sub1>Total</Typography.Sub1>
              <Typography.Sub1>${calcTotal()}</Typography.Sub1>
            </Flex>
          </View>
          <HLine />
          <View>
            <View testID="cancellation-policy" style={{ marginTop: 20, marginHorizontal: 20 }}>
              <Typography.Cap color={colors.gray}>
                Cancellation Policy
              </Typography.Cap>
            </View>
            <Flex>
              <Typography.Sub1>Cancel by {cancelByTime} for free</Typography.Sub1>
            </Flex>
          </View>

        </MainWrapper>
      </Detail>
      <Reserve>
        <Button.BtnContain
          testID="book-now-button"
          label="Book now"
          // color={(loading || !paymentSheetEnabled) ? colors.lightgray : colors.red}
          // disabled={loading || !paymentSheetEnabled}
          color={loading ? colors.lightgray : colors.red}
          disabled={loading}
          onPress={() => selectedSpace.needHostConfirm
            ? needHostConfirm()
            : onSubmit()}
        />
        {/* 액션 보내기 */}
      </Reserve>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Detail = styled.ScrollView`
  flex: 1;
`;

const MainWrapper = styled.View`
  flex: 1;
  padding: 20px 30px 20px 20px;
`;

const Reserve = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.faintgray};
  background-color: white;
`;

const HLine = styled.View`
  width: 90%;
  margin: 0 auto;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.faintgray};
`;

const Flex = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const CoverImg = styled.Image`
  width: 40%;
  height: 80px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const mapStateToProps = (state) => {
  return {
    state: state.search,
    userBookings: state.user.userBookings,
    spaceTypes: state.user.spaceTypes,
  };
};

// const mapDispatchProps = (dispatch) => bindActionCreators({ createBooking }, dispatch);
export default connect(mapStateToProps)(Reserve_1) //,mapDispatchProps)(Reserve_1);
