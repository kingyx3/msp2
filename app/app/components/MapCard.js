import React from "react";
import { Dimensions, TouchableWithoutFeedback, View, Image, Platform, Text } from "react-native";

//import styles and assets
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../config/colors";
import { SP } from "../config/Typography";
import ImgSliderItem from './ImgSliderItems'
import colors from "../config/colors";

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
  description,
  caption,
  rating,
  reviews,
  property,
  notificationCount,
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SP>{property}</SP>
          {notificationCount > 0 && (
            <View
              style={{
                marginLeft: 5,
                backgroundColor: Colors.red,
                borderRadius: 10,
                paddingVertical: 2,
                paddingHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 10 }}>{notificationCount + " pending"}</Text>
            </View>
          )}
        </View>
        <Title numberOfLines={1}>{title}</Title>
        {reviews ?
          < Rating >
            <FontAwesome name="star" color={Colors.red} />
            <SP>{rating}</SP>
            <SP>{`(${reviews})`}</SP>
          </Rating>
          : null
        }
        {subtitle && <Text>{subtitle}</Text>}
        {description && <Text style={{ color: colors.gray }}>{description}</Text>}
      </Description>
      {/* Instant Book Status */}
      {caption && <View style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: caption == "Disabled" ? Colors.lightgray : Colors.red,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}>
        <Text style={{
          fontSize: 12,
          color: 'white',
          fontWeight: 'bold',
        }}>{caption}
        </Text>
      </View>
      }
    </Container>
  </TouchableWithoutFeedback >

const Container = styled.View`
  flex-direction: row;
  width: ${`${card_width}px`};
  height: 110px;
  background-color: white;
  border-radius: 16px;
  margin: 10px 10px 5px;
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
