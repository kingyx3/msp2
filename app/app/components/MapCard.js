import React from "react";
import { Dimensions, TouchableWithoutFeedback, View, Image, Platform } from "react-native";

//import styles and assets
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../config/colors";
import { SP } from "../config/Typography";
import ImgSliderItem from './ImgSliderItems'

const { width, height } = Dimensions.get("window");
// const card_width = width * 0.8;
const widthPct = 0.8;
const card_width = Math.floor(width * widthPct);
const img_width = card_width * 0.35;
const desc_width = card_width - img_width;

const MapCard = ({
  testID,
  image,
  title,
  subtitle,
  rating,
  reviews,
  property,
  overwriteCardWidthPct,
  onPress,
}) =>
  <TouchableWithoutFeedback testID={testID} onPress={onPress}>
    <Container
      style={
        // Adding shadow to the styling outside of styled component to avoid annoying " WARN  Expected style "shadowOpacity: 0.1px" to be unitless" error messages
        [Platform.select({
          android: {
            elevation: 2,
          },
          ios: {
            shadowColor: '#000',
            shadowOpacity: 0.1,
          },
        }), {
          width: overwriteCardWidthPct ? overwriteCardWidthPct * width : null
        }]}
      testID="map-card-touchable"
    >
      <ImgSliderItem
        customStyle={{
          width: img_width,
          height: '100%', // '100%'
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          backgroundColor: 'white',
          contentFit: 'contain'
        }}
        source={image} />
      <Description>
        <SP>{property}</SP>
        <Title numberOfLines={1}>{title}</Title>
        {(reviews == 0 || !reviews) ? null :
          <Rating>
            <FontAwesome name="star" color={Colors.red} />
            <SP>{rating}</SP>
            <SP>{`(${reviews})`}</SP>
          </Rating>
        }
        {subtitle && <Price>{`$${subtitle}`}</Price>}
      </Description>
    </Container>
  </TouchableWithoutFeedback>

const Container = styled.View`
  flex-direction: row;
  width: ${`${card_width}px`};
  height: 110px;
  background-color: white;
  border-radius: 16px;
  margin: 0 10px 20px;
`;

// const ImgContainer = styled.Image`
//   width: ${`${img_width}px`};
//   height: 100%;
//   border-top-left-radius: 16px;
//   border-bottom-left-radius: 16px;
//   background-color: yellow;
// `;

const Description = styled.View`
  width: ${`${desc_width}px`};
  padding: 20px 12px;
`;

const Title = styled.Text`
  font-size: 14px;
`;

const Price = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const Rating = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
`;

export default MapCard;
