import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View, Platform, StyleSheet, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { EvilIcons, FontAwesome } from "@expo/vector-icons";

import styled from "styled-components/native";
import colors from "../config/colors";
import * as Typography from "../config/Typography";

export const BtnContainNew = ({ color, disabled, label, onPress, icon, size, testID }) =>
  <TouchableOpacity
    style={styles.button}
    disabled={disabled}
    color={disabled ? colors.gray : colors.purple}
    onPress={onPress}
    testID={testID}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5a2d82',
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('1.5%'),
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('4%'),  // Increased padding between the button and the text above
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
  },
})

export const BtnContain = ({ color, disabled, label, onPress, icon, size, testID }) => {
  return (
    <Container>
      <TouchableOpacity testID={"btn-contain-touchable"} onPress={onPress} disabled={disabled} style={{ padding: 1 }}>
        <Filled testID="btn-contain-filled" style={color && { backgroundColor: color }}>
          {size === "small" ? (
            <Wrapper>
              {icon && (
                <FontAwesome
                  name={icon}
                  color="white"
                  style={{ marginRight: 8 }}
                  testID="btn-contain-icon"
                />
              )}
              <Typography.pS testID={testID} color="white" bold>
                {label}
              </Typography.pS>
            </Wrapper>
          ) : (
            <Wrapper>
              {icon && (
                <FontAwesome
                  name={icon}
                  color="white"
                  style={{ marginRight: 8 }}
                  testID="btn-contain-icon"
                />
              )}
              <Typography.Sub1 testID={testID} color="white" bold>
                {label}
              </Typography.Sub1>
            </Wrapper>
          )}
        </Filled>
      </TouchableOpacity>
    </Container>
  );
};

export const BtnOutline = ({ color, disabled, label, labelcolor, onPress, testID }) => {
  return (
    <Container >
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Outlined style={{ borderWidth: 2, borderColor: color }}>
          <Typography.Sub1 testID={testID} bold color={labelcolor}>{label}</Typography.Sub1>
        </Outlined>
      </TouchableOpacity>
    </Container>
  );
};

export const BtnText = ({ color, label, onPress, testID }) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <LabelWrapper>
          <Typography.Sub1 testID={testID} bold color={color}>{label}</Typography.Sub1>
        </LabelWrapper>
      </TouchableOpacity>
    </Container>
  );
};

export const BtnTxtUnderline = ({ color, label, onPress, testID }) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <LabelWrapper2>
          <Typography.Sub1
            testID={testID}
            bold
            color={color}
            style={{
              fontSize: Platform.OS === 'ios' ? 15 : 9,
              textDecorationLine: "underline",
            }}
          >
            {label}
          </Typography.Sub1>
        </LabelWrapper2>
      </TouchableOpacity>
    </Container>
  );
};

export const FloatingButton = ({ iconName, label, onPress, testID }) => {
  return (
    <Container>
      <TouchableWithoutFeedback onPress={onPress}>
        <FbWrapper elevation={3}>
          <FontAwesome name={iconName} color="white" />
          <Typography.Sub1
            testID={testID}
            bold
            color="white"
            style={{
              marginLeft: 6,
              fontSize: Platform.OS === 'ios' ? 13 : 8
            }}>
            {label}
          </Typography.Sub1>
        </FbWrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export const BtnCircle = ({ iconName, size, color, onPress, testID }) => {
  return (
    <Container>
      <TouchableOpacity testID='btn-circle' onPress={onPress}>
        <View style={{ backgroundColor: color ? color : 'white', borderRadius: 500, padding: 4 }}>
          <EvilIcons testID={testID} name={iconName} size={size} color="black" />
        </View>
      </TouchableOpacity>
    </Container>
  );
};

export const BtnDateTime = ({ label, color, onPress, testID }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LabelWrapper3>
        <Typography.Sub1 testID={testID} color={color}>{label}</Typography.Sub1>
      </LabelWrapper3>
    </TouchableOpacity>
  );
};

const Container = styled.View`
  width: 100%;
`;

const Filled = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 26px;
  padding: 14px;
  background-color: ${colors.gray};
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Outlined = styled.View`
  justify-content: center;
  align-items: center;

  border-radius: 26px;
  padding: 14px;
`;

const LabelWrapper = styled.View`
  padding: 10px 0;
`;

const LabelWrapper2 = styled.View`
  padding: 10px 0;
  justify-content: center;
  align-items: center;
`;

const LabelWrapper3 = styled.View`
  padding: 10px 10px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.View`
  background-color: white;
  border-radius: 500px;
  padding: 4px;
`;

const Filled2 = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${colors.red};
  border-radius: 8px;
  padding: 14px;
`;

const FbWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black};
  border-radius: 26px;
  padding: 14px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.12);
`;

const Label = styled.Text`
  font-size: ${Platform.OS === 'ios' ? 16 : 10}px;
  font-weight: bold;
`;

const LabelNoBold = styled.Text`
  font-size: ${Platform.OS === 'ios' ? 16 : 10}px;
`;