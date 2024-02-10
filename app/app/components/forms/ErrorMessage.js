import React from "react";
import { Platform } from "react-native";
//import styles and assets
import styled from "styled-components/native";
import colors from "../../config/colors";

const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;
  return <ErrorText>{error}</ErrorText>;
};

const ErrorText = styled.Text`
  font-size: ${Platform.OS === "android" ? "14px" : "12px"};
  color: ${colors.red};
  margin-top: 6px;
`;
export default ErrorMessage;
