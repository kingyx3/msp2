import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";

//import components

import ImageInputList from "../../components/ImageInputList";

//import styles and assets
import styled from "styled-components/native";
import { H, Sub1, P } from "../../config/Typography";
import colors from "../../config/colors";
import * as Button from "../../components/Button";

//import redux
import { connect } from "react-redux";
import { setImages } from "../../store/host";

const HostingEdit5 = (props) => {
  const [imageUris, setImageUris] = useState([]);
  const [count, setCount] = useState(0)
  const { editMode, selectedSpace } = props.route.params

  useEffect(() => { // used to set initial value to state
    if (selectedSpace && !count) {
      setImageUris(selectedSpace.images)
      setCount(1)
    }
  }, [count, selectedSpace])

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
  };

  const onNavigate = () => {
    console.log(imageUris)
    props.setImages(imageUris);
    props.navigation.navigate(editMode ? "HostingEdit7" : "HostingStep6", { editMode, selectedSpace });
  };

  return (
    <Container>
      <Main>
        <H>Add a photo of your space</H>
        <Sub1 colors={colors.darkgray}>
          Make your space stand out with great photos
        </Sub1>
        <Step style={{ paddingTop: 10 }}>
          <ImageInputList
            imageUris={imageUris}
            onAddImage={handleAdd}
            onRemoveImage={handleRemove}
          />
        </Step>
        <Step>
        </Step>
      </Main>
      <Next>
        <Left></Left>
        <BtnContainer>
          <Button.BtnContain
            label="Next"
            size="small"
            disabled={imageUris.length > 0 ? false : true}
            color={imageUris.length > 0 ? colors.red : colors.lightgray}
            onPress={() => onNavigate()}
          />
        </BtnContainer>
      </Next>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.ScrollView`
  flex: 1;
  padding: 24px;
`;

const Next = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.faintgray};
  background-color: white;
`;

const Left = styled.View``;

const BtnContainer = styled.View`
  width: 30%;
`;

const Step = styled.View`
  margin: 20px 0;
`;

const InputWrapper = styled.View`
  margin: 15px 0 10px 0;
`;

const Flex = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 10px 0;
`;

export default connect(null, { setImages })(HostingEdit5);
