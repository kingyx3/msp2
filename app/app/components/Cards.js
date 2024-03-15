import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";

//import components
import * as Lists from "./List";
import ImgSliderItems from './ImgSliderItems';
import * as IconLabel from "./IconLabel";

//import styles and assets
import styled from "styled-components/native";
import colors from "../config/colors";
import * as Typography from "../config/Typography";

export const QuickSearch = ({ title, secondary, onPress, testID }) =>
  <TouchableOpacity testID={testID} onPress={onPress}>
    <View style={{ margin: 15 }}>
      <Typography.P>{title}</Typography.P>
      <Typography.P color={colors.gray}>{secondary}</Typography.P>
    </View>
    <HLine />
  </TouchableOpacity>


export const Default = ({
  action,
  image,
  title,
  secondary,
  sub,
  meta,
  onPress,
  testID
}) =>
  <Rounded
    style={{
      width: "100%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 5,
      elevation: 5,
    }}
  >
    {image && (
      <ImageContainer>
        <ImgSliderItems source={image} />
      </ImageContainer>
    )}
    <View style={{ marginHorizontal: 16, marginVertical: 10 }}>
      {meta && <Typography.SP color={colors.gray}>{sub}</Typography.SP>}
      <Typography.Sub1 color={colors.black}>{title}</Typography.Sub1>
      {secondary && (
        <Typography.P color={colors.gray} numberOfLines={1}>
          {secondary}
        </Typography.P>
      )}
    </View>
    {action && (
      <TouchableOpacity onPress={onPress} testID="cardsTouchable">
        <ViewMore testID={testID}>
          <Typography.P color={colors.gray}>{action}</Typography.P>
        </ViewMore>
      </TouchableOpacity>
    )}
  </Rounded>

//Card Parts

export const Review = ({ imagexsmall, secondary, title, content, rating }) => {
  return (
    <Outlined>
      <Lists.UserList
        title={title}
        imagexsmall={imagexsmall}
        secondary={secondary}
      />
      {rating ?
        <IconLabel.FA
          icon="star"
          label={rating.toFixed(2)}
          label2={null}
          color={colors.red}
        />
        : null}
      <Typography.P numberOfLines={5}>{content}</Typography.P>
    </Outlined>
  );
};

const Rounded = styled.View`
  background-color: white;
  border-radius: 12px;
`;

const ListCard = styled.View`
  width: 260px;
  height: 270px;
  margin: 0 10px;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 350px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

// const MainImage = styled.Image`
//   width: 100%;
//   height: 100%;
// `;

const HLine = styled.View`
  width: 100%;
  margin: 0 auto;
  height: 1px;
  background-color: #e6e6e6;
`;

const Outlined = styled.View`
  width: 100%;
  height: 240px;
  background-color: white;
  border: 1px solid ${colors.lightgray};
  border-radius: 10px;
  padding: 20px;
`;

const ViewMore = styled.View`
  padding: 24px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.faintgray};
`;
