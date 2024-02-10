import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";

import ImgSlider from "../components/ImgSlider";

//import styles and assets
import styled from "styled-components/native";
import Colors from "../config/colors";
import { H4, SP } from "../config/Typography";
import { FontAwesome } from "@expo/vector-icons";

const Card = ({ images, rating, reviews, subtitle, title, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} testID="cardTouchable">
      <Container>
        <ImgSlider data={images} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <FontAwesome name="star" color={Colors.red} />
          <SP>{rating}</SP>
          <SP>{`(${reviews})`}</SP>
        </View>
        <H4 colors={Colors.black}>{title}</H4>
        <Subtitle>{`$${subtitle}`}</Subtitle>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  margin: 16px 0;
  ${Platform.select({
  ios: {
    fontFamily: "Avenir",
  },
  android: {
    fontFamily: "Roboto",
  },
})};
`;

const Subtitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0;
`;

export default Card;
