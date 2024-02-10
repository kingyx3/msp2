import React from "react";
import { View, ScrollView } from "react-native";

//import components
import ImageInput from "../components/ImageInput";

//import styles and assets
import styled from "styled-components/native";
import Colors from "../config/colors";
import { EvilIcons } from "@expo/vector-icons";

const ImageInputList = ({ imageUris = [], onRemoveImage, onAddImage }) => {
  return (
    <ScrollView horizontal>
      <Container>
        {imageUris.map((uri) => (
          < View testID={"image-input"} key={uri} style={{ marginRight: 10 }}>
            <ImageInput
              imageUri={uri}
              onChangeImage={() => onRemoveImage(uri)}
            />
          </View>
        ))}
        <View testID='image-input-touchable'>
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </Container>
    </ScrollView>
  );
};

const Container = styled.View`
  flex-direction: row;
`;

export default ImageInputList;
