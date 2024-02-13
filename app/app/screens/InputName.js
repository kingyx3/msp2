import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Platform } from "react-native";
// import * as Yup from "yup";

//import components
// import AppForm from "../../components/forms/AppForm";
import * as Button from "../components/Button";
import * as TextInput from "../components/forms/AppInput";
import { updateUserName } from '../components/Firebase/firebase';
import SubmitBtn from "../components/forms/SubmitBtn";
import colors from "../config/colors";
//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../config/Typography";
import AppForm from "../components/forms/AppForm";

const InputName = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Container>
      <Main>
        <Header>
          <Typography.H1 color={colors.red}>How can we address you?</Typography.H1>
        </Header>
        <AppForm
          initialValues={{ name: "" }}
          onSubmit={values => {
            updateUserName(values.name)
          }}
        >
          <Input>
            <Text>Name</Text>
            <TextInput.Default
              name="name"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              clearButtonMode="always"
              textContentType="name"
              maxLength={+(process.env.EXPO_PUBLIC_USERNAME_MAX_LENGTH)}
            />
          </Input>
          <SubmitBtn
            title="Continue"
            disabled={disabled}
          />
        </AppForm>
      </Main>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  padding: 26px;
  flex: 1;
  justify-content: center;
`;

const Btn = styled.View`
  display: flex;
  margin: 10px 0;
`;

const Header = styled.View`
  margin-bottom: 60px;
`;

const Input = styled.View`
  padding-bottom: 26px;
`;

const Logo = styled.Image`
  width: 60px;
  height: 60px;
  resize-mode: contain;
  margin: 10px 0;
`;

const styles = StyleSheet.create({
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: colors.red,
    fontSize: Platform.OS === 'ios' ? 18 : 12,
    fontWeight: '600'
  },
  // backButton: {
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  errorText: {
    marginTop: 20,
    marginLeft: 15,
    color: colors.red,
    fontSize: Platform.OS === 'ios' ? 16 : 10,
    marginBottom: 5,
    fontWeight: '600'
  }
});

export default InputName;
