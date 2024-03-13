import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import * as Yup from "yup";
import * as Network from 'expo-network';

//import components
import AppForm from "../../components/forms/AppForm";
import * as Button from "../../components/Button";
import * as TextInput from "../../components/forms/AppInput";
import { loginWithEmail, loginWithEmailz, registerWithEmail, showOfflineAlert } from '../../components/Firebase/firebase';
import SubmitBtn from "../../components/forms/SubmitBtn";
// import Colors from '../../components/forms/Colors';
import colors from "../../config/colors";
//import styles and assets
import styled from "styled-components/native";
import * as Typography from "../../config/Typography";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a registered email')
    .email()
    .label('Email'),
});

const Login = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);

  async function handleOnLogin(values) {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      // Device is connected to the internet
      setDisabled(true)
      const { email } = values;
      try {
        // For svc acct
        await loginWithEmail(email, 'QnIVZ-ke7c3_nGcU$QkMFi@iFftsOT!497M-QBq8EdY2b7bdrJHETZVS8SrL-Iop');
      } catch (error) {
        if (error.message.includes("auth/user-not-found")) {
          // User does not exist
          await registerWithEmail(email);
        } else if (error.message.includes("auth/wrong-password")) {
          // User exists
        } else {
          console.log('error.message', error.message)
        }
        try {
          await loginWithEmailz(email)
          navigation.navigate('Email Link Sent', email)
        } catch (e) {
          console.log('Email Link Error: ', e)
        }
      }
      setDisabled(false)
    } else {
      // Device is not connected to the internet
      showOfflineAlert()
    }
  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <Input></Input>
        <Input></Input>
        <Main>
          <Header>
            <Logo source={require("../../assets/icon.png")}></Logo>
            <Typography.H1 testID={'welcome-text'} color={colors.red}>Welcome to {process.env.EXPO_PUBLIC_APP_NAME}</Typography.H1>
            <Typography.Sub1 color={colors.red}>Find and rent spaces on an hourly basis</Typography.Sub1>
          </Header>
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={values => handleOnLogin(values)}//onSubmit={() => handleOnLogin} //navigation.navigate("HomeStack")}
            validationSchema={validationSchema}
          >
            <Input>
              <Text>Email</Text>
              <TextInput.Default
                testID="email-input"
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                clearButtonMode="always"
                textContentType="emailAddress"
              />
            </Input>
            <SubmitBtn
              testID="submit-email-button"
              title="Continue with Email"
              disabled={disabled}
            />
            {/* <Text style={styles.errorText}>{loginError}</Text> */}
          </AppForm>
        </Main>
      </KeyboardAvoidingView>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  padding: 26px;
  flex: 1;
  /* justify-content: center; */
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

export default Login;
