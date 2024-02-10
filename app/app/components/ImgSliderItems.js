import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { Image } from 'expo-image';

const { width, height } = Dimensions.get("window");

const ImgSliderItems = ({ source, customStyle, placeholder }) =>
  <Image
    testID="image-component"
    style={customStyle ? customStyle : styles.image}
    source={source}
    placeholder={placeholder}
    cachePolicy="disk" />

const styles = StyleSheet.create({
  image: {
    width: width, // width, "100%"
    height: "100%",
    contentFit: "contain", // contain/cover
  },
});

export default ImgSliderItems;
