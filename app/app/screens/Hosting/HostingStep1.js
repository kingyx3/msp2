import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//import components
// import AppForm from "../../components/forms/AppForm";
import AppPicker from "../../components/AppPicker";
import Counter from "../../components/Counter";

//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../../config/Typography";
import colors from "../../config/colors";
import * as Button from "../../components/Button";

//import redux
import { connect } from "react-redux";
import {
  setSpaceType,
  setNumSpaces,
} from "../../store/host";

const HostingStep1 = (props) => {
  const spaceTypes = props.spaceTypes
  const editMode = false
  const selectedSpace = undefined
  const [category, setCategory] = useState("") //useState(selectedSpace.spaceType);
  const [numSpaces, setNumSpaces] = useState(1);

  const onNavigate = () => {
    props.setSpaceType(category.label);
    props.setNumSpaces(numSpaces)
    props.navigation.navigate("HostingEdit2", { editMode, selectedSpace });
  };

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Main>
          <Typography.H>Shall we start listing your space?</Typography.H>
          <Step style={{ paddingTop: 20 }}>
            <Typography.Sub1>What type of space do you have?</Typography.Sub1>
            <InputWrapper>
              <AppPicker
                selectedItem={category}
                onSelectItem={(item) => setCategory(item)}
                items={spaceTypes}
                placeholder={"Choose one type"}
                icon="chevron-down"
              />
            </InputWrapper>
          </Step>
          <Step>
            <Typography.Sub1>
              How many similar spaces at the same location?
            </Typography.Sub1>
            <Flex>
              <Typography.P colors={colors.gray}>Number of spaces</Typography.P>
              <View style={{ width: "30%" }}>
                <Counter
                  result={numSpaces}
                  onMinus={(item) => item > 0 ? setNumSpaces(item) : null}
                  onPlus={(item) => setNumSpaces(item)}
                />
              </View>
            </Flex>
          </Step>
          {/* </AppForm> */}
        </Main>
      </KeyboardAwareScrollView>
      <Next>
        <Left></Left>
        <BtnContainer>
          <Button.BtnContain
            label="Next"
            size="small"
            color={category != "" ? colors.red : colors.lightgray}
            disabled={category == ""}
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
  margin: 15px 5px 10px 0;
`;

const mapStateToProps = (state) => {
  return {
    spaceTypes: state.user.spaceTypes,
  };
};


export default connect(mapStateToProps, {
  setSpaceType,
  setNumSpaces,
  // setPrice,
  // setPeakPrice,
  // setOffPeakPrice,
})(HostingStep1);
