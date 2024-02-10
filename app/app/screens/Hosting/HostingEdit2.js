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
  Platform
} from 'react-native';
//import components

//import styles and assets
import styled from 'styled-components/native';
import * as Typography from '../../config/Typography';
import { paragraphFontSize, paragraphFontSizeIOS } from '../../config/Typography';
import colors from '../../config/colors';
import * as MyButton from '../../components/Button';
import { connect } from 'react-redux';
import {
  setPrice,
  setPeakPrice,
  setOffPeakPrice,
} from '../../store/host';

const HostingEdit2 = (props) => {
  const { editMode, selectedSpace } = props.route.params
  const [price, setPrice] = useState(20);
  const [peakPrice, setPeakPrice] = useState(25);
  const [offPeakPrice, setOffPeakPrice] = useState(15);

  useEffect(() => { // used to set initial value to state
    if (selectedSpace) {//} && !count) {
      setPrice(selectedSpace.price)
      setPeakPrice(selectedSpace.peakPrice)
      setOffPeakPrice(selectedSpace.offPeakPrice)
    }
  }, [selectedSpace])


  const onNavigate = () => {
    props.setPrice(price);
    props.setPeakPrice(peakPrice);
    props.setOffPeakPrice(offPeakPrice);
    props.navigation.navigate(editMode ? 'HostingEdit4' : 'HostingStep3', { editMode, selectedSpace });
  };
  return (
    <Container>
      <Main>
        <Typography.H>Set your price</Typography.H>
        <Step style={{ paddingTop: 20 }}>
          <Typography.Sub1>Price</Typography.Sub1>
          <Flex>
            <Typography.P colors={colors.gray}>Price per hour</Typography.P>
            <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View>
                <Text>S$ </Text>
              </View>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 0.5,
                  textAlign: 'center',
                  width: 35,
                  fontSize: Platform.OS == 'ios' ? paragraphFontSizeIOS : paragraphFontSize,
                }}
                onChangeText={(item) => setPrice(+item)}
                value={price.toString()}
                // placeholder={price.toString()}
                keyboardType="number-pad"
                maxLength={4}
              />
              {/* <View>
                <Text style={{ textAlign: 'right' }}> per hour</Text>
              </View> */}
            </View>
          </Flex>
        </Step>
        <Step>
          <Typography.Sub1>Price during peak periods</Typography.Sub1>
          <Flex>
            <Typography.P colors={colors.gray}>
              Price per hour (Peak)
            </Typography.P>
            <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View>
                <Text>S$ </Text>
              </View>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 0.5,
                  textAlign: 'center',
                  width: 35,
                  fontSize: Platform.OS == 'ios' ? paragraphFontSizeIOS : paragraphFontSize,
                }}
                onChangeText={(item) => setPeakPrice(+item)}
                value={peakPrice.toString()}
                // placeholder={peakPrice.toString()}
                keyboardType="number-pad"
                maxLength={4}
              />
              {/* <View>
                <Text style={{ textAlign: 'right' }}> per hour</Text>
              </View> */}
            </View>
          </Flex>
        </Step>
        <Step>
          <Typography.Sub1>Price for off-peak periods</Typography.Sub1>
          <Flex>
            <Typography.P colors={colors.gray}>
              Price per hour (Off Peak)
            </Typography.P>
            <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View>
                <Text>S$ </Text>
              </View>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 0.5,
                  textAlign: 'center',
                  width: 35,
                  fontSize: Platform.OS == 'ios' ? paragraphFontSizeIOS : paragraphFontSize,
                }}
                onChangeText={(item) => setOffPeakPrice(+item)}
                value={offPeakPrice.toString()}
                // placeholder={offPeakPrice.toString()}
                keyboardType="number-pad"
                maxLength={4}
              />
              {/* <View>
                <Text style={{ textAlign: 'right' }}> per hour</Text>
              </View> */}
            </View>
          </Flex>
        </Step>
      </Main>
      <Next>
        <Left></Left>
        <BtnContainer>
          <MyButton.BtnContain
            label="Next"
            size="small"
            color={
              price != 0 && peakPrice != 0 && offPeakPrice != 0
                ? colors.red
                : colors.lightgray
            }
            disabled={price == 0 || peakPrice == 0 || offPeakPrice == 0}
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
})(HostingEdit2);
