import React from "react";
import { View, Text, TouchableWithoutFeedback, Platform } from "react-native";

//import components
import * as Btn from "../components/Button";

import { EvilIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Colors from "../config/colors";
import ImgSliderItems from "./ImgSliderItems";
import { Sub1 } from "../config/Typography";

export const NavBar = ({ nav, title, action, onPress, testID }) => {
  return (
    <Container>
      <Bar>
        <Back>
          <Btn.BtnCircle
            testID={testID || 'back-button'}
            iconName="chevron-left"
            size={30}
            onPress={onPress}
          />
        </Back>
        {title ? <Title>{title}</Title> : <Title></Title>}
        {action ? <Action>{action}</Action> : <Action></Action>}
      </Bar>
    </Container>
  );
};

export const NavBar2 = ({ nav, title, action, onPress, testID }) => {
  return (
    <Container2>
      <Bar>
        <BackBtn>
          <Btn.BtnCircle
            testID={testID || 'back-button2'}
            iconName="chevron-left"
            size={24}
            onPress={onPress}
          ></Btn.BtnCircle>
        </BackBtn>
        {title ? <Title>{title}</Title> : <Title></Title>}
        {action ? <Action>{action}</Action> : <Action></Action>}
      </Bar>
    </Container2>
  );
};

export const NolineNavBar = ({ nav, title, action, onPress, testID }) => {
  return (
    <NolineContainer>
      <Bar>
        <Back>
          <TouchableWithoutFeedback
            testID={testID || 'back-button3'}
            onPress={onPress}
          >
            <EvilIcons name={nav} size={30} />
          </TouchableWithoutFeedback>
        </Back>
        {title ? <Title>{title}</Title> : <Title></Title>}
        {action ? <Action>{action}</Action> : <Action></Action>}
      </Bar>
    </NolineContainer>
  );
};

export const NavBarChat = ({ nav, avatar, name, onPress, testID }) => {
  return (
    <Container >
      <OtherUserInfo>
        <View style={{ left: 10 }}>
          <Btn.BtnCircle
            testID={testID || 'back-button4'}
            iconName={nav}
            color={'white'}
            size={30}
            onPress={onPress}
          />
        </View>
        <View>
          <ImgSliderItems
            source={avatar}
            customStyle={{
              width: 46,
              height: 46,
              borderRadius: 23,
              marginLeft: 15,
              marginRight: 15,
            }} />
        </View>
        <Sub1 bold>
          {name}
        </Sub1>
      </OtherUserInfo>
    </Container>
  );
};

const Container = styled.View`
  height: 60px;
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.faintgray};
  justify-content: center;
  align-items: center;
`;

const Container2 = styled.View`
  height: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: -10px;
  z-index: 100;
`;

const NolineContainer = styled.View`
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const Bar = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
`;

const Back = styled.Text`
  right: 10px;
  width: 25%;
`;

const BackBtn = styled.View`
  position: absolute;
  margin-top: ${Platform.OS === "ios" ? "5px" : "5px"};
`;

const Title = styled.Text``;

const Action = styled.Text`
  width: 25%;
`;

const OtherUserInfo = styled.View`
  background-color: white;
  /*flex: 0.1;*/
  height: 60px;
  flex-direction: row;
  /*justify-content: flex-end;*/
  align-items: center;
  width: 100%;
`;
