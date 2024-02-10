import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

//import components
import { DefaultInput } from "../../components/forms/AppInput";

//import styles and assets
import styled from "styled-components/native";
import { H, Sub1, P } from "../../config/Typography";
import colors from "../../config/colors";
import * as Button from "../../components/Button";

//import redux
import { connect } from "react-redux";
import { setTitle, setDescription } from "../../store/host";

const HostingEdit4 = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0)
  const { editMode, selectedSpace, location } = props.route.params
  const maxTitle = 50
  const maxDescription = 300

  // console.log(editMode)
  // console.log(location == props.state.location)

  useEffect(() => { // used to set initial value to state
    if (selectedSpace && !count) {
      setTitle(selectedSpace.title)
      setDescription(selectedSpace.description)
      setCount(1)
    }
  }, [count, selectedSpace])

  const calcLengthTitle = () => {
    return maxTitle - title.length;
  };

  const calcLengthDescription = () => {
    return maxDescription - description.length;
  };

  const onNavigate = () => {
    props.setTitle(title);
    props.setDescription(description);
    props.navigation.navigate("HostingEdit8", { editMode, selectedSpace });
  };

  return (
    <Container>
      <Main>
        <H>Give your space a title</H>
        <Sub1 colors={colors.darkgray}>
          Grab attention with a descriptive title that highlights the features and strengths of your space
        </Sub1>
        <Step>
          <P>Title</P>
          <DefaultInput
            name="title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            maxLength={maxTitle}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left></Left>
            <Remaining>
              <P color={colors.gray}>{calcLengthTitle()}/{maxTitle}</P>
            </Remaining>
          </View>
          <P>Description</P>
          <DefaultInput
            name="description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            maxLength={maxDescription}
            multiline={true}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Left></Left>
            <Remaining>
              <P color={colors.gray}>{calcLengthDescription()}/{maxDescription}</P>
            </Remaining>
          </View>
        </Step>
      </Main>
      <Next>
        <Left></Left>
        <BtnContainer>
          <Button.BtnContain
            label="Next"
            color={!(title.length > 0 && description.length > 0 && (editMode || props.state.location == location)) ? colors.lightgray : colors.red}
            disabled={!(title.length > 0 && description.length > 0 && (editMode || props.state.location == location))}
            size="small"
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

const Step = styled.View`
  margin: 20px 0;
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

const Remaining = styled.View`
  margin-top: 15px;
`;

const mapStateToProps = (state) => {
  return {
    state: state.host,
  };
};

export default connect(mapStateToProps, { setTitle, setDescription })(HostingEdit4);
