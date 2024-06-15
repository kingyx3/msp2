import React, { useEffect } from "react";
import { TouchableWithoutFeedback, Alert, View } from "react-native";
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

//import styles and assets
import styled from "styled-components/native";
import Colors from "../config/colors";
import { EvilIcons } from "@expo/vector-icons";
import ImgSliderItem from "./ImgSliderItems";

const ImageInput = ({
  imageUri,
  onChangeImage,
  customStyle, // Created to accomodate user avatar
  placeholder // Created to accomodate user avatar
}) => {

  useEffect(() => {
    requstPermission();
  }, []);

  const requstPermission = async () => {
    const { granted } = await requestMediaLibraryPermissionsAsync();
    if (!granted) Alert.alert("Permission required");
  };

  const handlePress = () => {
    selectImage();
    // if (!imageUri) selectImage();
    // else
    //   Alert.alert("Delete", "Are you sure you want to delete photo?", [
    //     { text: "Yes", onPress: () => onChangeImage() },
    //     { text: "No" },
    //   ]);
  };

  const selectImage = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 0.20,
        allowsEditing: true,
        aspect: [4, 4], //[4, 3]
      });
      if (!result.canceled) onChangeImage(result.assets[0].uri);
    } catch (error) {
      console.log("error reading an image");
    }
  };

  return (
    <TouchableWithoutFeedback testID="image-input-touchable" onPress={handlePress}>
      <View style={{ // Created to accomodate user avatar (bg colour)
        backgroundColor: customStyle ? Colors.white : Colors.faintgray,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: 100,
        width: 100,
      }}>
        {(!imageUri && !placeholder) && <EvilIcons name="camera" size={40} color={Colors.gray} />}
        {(!imageUri && placeholder) &&
          <ImgSliderItem
            customStyle={customStyle ? customStyle : {
              width: '100%',
              height: '100%',
            }}
            source={null}
            placeholder={placeholder}
          />
        }
        {imageUri &&
          <ImgSliderItem
            customStyle={customStyle ? customStyle : {
              width: '100%',
              height: '100%',
            }}
            source={imageUri}
          />
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  background-color: ${Colors.faintgray};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100px;
  width: 100px;
`;

const ImageContainer = styled.Image`
  width: 100%;
  height: 100%;
`;

export default ImageInput;
