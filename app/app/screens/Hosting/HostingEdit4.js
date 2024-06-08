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
  setMonthsAhead,
  setCancellationPolicy,
  setNeedHostConfirm,
} from '../../store/host';
import { getCancellationPolicies } from '../../components/Firebase/firebase';

const HostingEdit4 = (props) => {
  const { editMode, selectedSpace } = props.route.params;
  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [monthsAhead, setMonthsAhead] = useState(1);
  const [cancellationPolicy, setCancellationPolicy] = useState(null);
  const [needHostConfirm, setNeedHostConfirm] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCancellationPolicies(setCancellationPolicies);
  }, []);

  useEffect(() => {
    if (selectedSpace && !count) {
      setMonthsAhead(selectedSpace.monthsAhead);
      setCancellationPolicy(selectedSpace.cancellationPolicy);
      setNeedHostConfirm(selectedSpace.needHostConfirm);
      setCount(1);
    }
  }, [count, selectedSpace]);

  const onNavigate = () => {
    props.setMonthsAhead(monthsAhead);
    props.setCancellationPolicy(cancellationPolicy);
    props.setNeedHostConfirm(needHostConfirm);
    props.navigation.navigate('HostingEdit5', { editMode, selectedSpace });
  };

  return (
    <Container>
      <Main testID="hosting-edit4-scroll-view">
        <Step>
          <Typography.H2>How many months of advanced booking is allowed?</Typography.H2>
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
          <Typography.H2>Choose a cancellation policy</Typography.H2>
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
          <View style={{ paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
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
      </Main >
      <Next>
        <Left></Left>
        <BtnContainer>
          <MyButton.BtnContain
            testID={'hosting-edit4-next-button'}
            label="Next"
            size="small"
            color={
              cancellationPolicy
                ? colors.red
                : colors.lightgray
            }
            disabled={!cancellationPolicy}
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
  setMonthsAhead,
  setCancellationPolicy,
  setNeedHostConfirm
})(HostingEdit4);