import React from "react";
import { TouchableOpacity, Text } from "react-native";

//import styles and assets
import styled from "styled-components/native";
import * as Typography from '../config/Typography'

const PickerItem = ({ label, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* <Typography.H2>{label}</Typography.H2> */}
      <Item>{label}</Item>
    </TouchableOpacity>
  );
};

const Item = styled.Text`
  text-align: center;
  padding: 20px;
`;

export default PickerItem;
