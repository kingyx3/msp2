import React, { useState } from "react";
import { Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import styled from "styled-components/native";
import * as Button from "../components/Button";
import * as TextInput from "../components/forms/AppInput";
import { updateUserName } from '../components/Firebase/firebase';
import SubmitBtn from "../components/forms/SubmitBtn";
import colors from "../config/colors";
import * as Typography from "../config/Typography";
import AppForm from "../components/forms/AppForm";

const InputName = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Main>
            <Header>
              <Typography.H1 color={colors.red}>How can we address you?</Typography.H1>
            </Header>
            <AppForm
              initialValues={{ name: "" }}
              onSubmit={values => updateUserName(values.name)}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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

const Header = styled.View`
  margin-bottom: 60px;
`;

const Input = styled.View`
  padding-bottom: 26px;
`;

const styles = StyleSheet.create({
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: colors.red,
    fontSize: Platform.OS === 'ios' ? 18 : 12,
    fontWeight: '600',
  },
  errorText: {
    marginTop: 20,
    marginLeft: 15,
    color: colors.red,
    fontSize: Platform.OS === 'ios' ? 16 : 10,
    marginBottom: 5,
    fontWeight: '600',
  },
});

export default InputName;