import React from "react";
import { TouchableOpacity, Text } from "react-native";

//import styles and assets
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import * as Typography from "../config/Typography";

const Counter = ({ result, onMinus, onPlus, max }) => {
  const maxCount = (max >= 0) ? max : 16
  return (
    <Container>
      <BtnWrapper>
        <TouchableOpacity testID="minus-btn"
          onPress={() => {
            if (result > 0) {
              onMinus(result - 1);
            }
          }}
        >
          <CountBtnWrapper>
            <AntDesign name="minus" />
          </CountBtnWrapper>
        </TouchableOpacity>
      </BtnWrapper>
      <CountWrapper>
        <Typography.H2>{result}</Typography.H2>
      </CountWrapper>
      <BtnWrapper>
        <TouchableOpacity testID="plus-btn"
          onPress={() => {
            if (result < maxCount) {
              onPlus(result + 1);
            }
          }}
        >
          <CountBtnWrapper>
            <AntDesign name="plus" />
          </CountBtnWrapper>
        </TouchableOpacity>
      </BtnWrapper>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const BtnWrapper = styled.View`
  width: 30%;
  align-items: center;
`;
const CountBtnWrapper = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid ${colors.gray};
  justify-content: center;
  align-items: center;
`;

const CountWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 40%;
`;

const Number = styled.Text`
  text-align: center;
`;

export default Counter;
