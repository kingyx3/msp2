import React, { useState, useEffect } from "react";
import { Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, Platform, Alert } from "react-native";
import styled from "styled-components/native";
import { updateUserName, updateUserReferral, getUserIdByEmail } from '../components/Firebase/firebase';
import SubmitBtn from "../components/forms/SubmitBtn";
import * as Button from "../components/Button"
import colors from "../config/colors";
import * as Typography from "../config/Typography";
import * as Linking from "expo-linking";
import appsFlyer from "react-native-appsflyer";

const InputName = ({ navigation }) => {
  const [name, setName] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url;
      console.log("Deep link URL:", url);

      appsFlyer.onAppOpenAttribution((data) => {
        console.log("AppsFlyer Attribution Data:", data);

        // Process the deep link data
        if (data.deepLinkValue) {
          Alert.alert("Deep Link Processed", `Value: ${data.deepLinkValue}`);
        }
      });
    };

    // Listen for deep links
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Cleanup
    return () => subscription.remove();
  }, []);

  // useEffect(() => {
  //   // Listen for deep links
  //   const handleDeepLink = async (res) => {
  //     Alert.alert("Response", res)
  //     if (res && res.deepLinkValue) {
  //       console.log('Deep link data:', res.deepLinkValue);
  //       console.log('Deep link custom parameters:', res.deepLinkParams);

  //       // Access inviting user ID
  //       const invitingUserEmail = res.deepLinkParams?.customerUserId;
  //       const invitingUserEmail2 = res.deepLinkParams?.additionalParameters.referrerId;
  //       const invitingUserId = await getUserIdByEmail(invitingUserEmail)
  //       Alert.alert("invitingUserId & Emails", invitingUserId, invitingUserEmail + " " + invitingUserEmail2);

  //       setReferralCode(invitingUserId);
  //     }
  //   };

  //   appsFlyer.onDeepLink(handleDeepLink);

  //   // Cleanup listener
  //   return () => {
  //     appsFlyer.onDeepLink(null);
  //   };
  // }, []);

  // useEffect(() => {
  //   const checkInitialURL = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     if (!initialUrl) return;

  //     const data = new URL(initialUrl);
  //     const referralCodeX = data.searchParams.get('r');
  //     if (!referralCodeX) return;

  //     // setReferralCode(referralCodeX);
  //     setReferralCode(initialUrl);
  //   };

  //   checkInitialURL();
  // }, []);

  const handleSubmit = async () => {
    if (!name) {
      Alert.alert("Error", "Name is required");
      return;
    }

    setDisabled(true);
    try {
      await updateUserName(name);
      // Assuming updateUserReferral is defined in firebase as well
      await updateUserReferral(referralCode);
      // Alert.alert('Success', 'Your information has been updated.');
    } catch (error) {
      // Alert.alert("Error", "An error occurred while updating your information.");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Main>
            <Header>
              <Typography.H1 color={colors.red}>How should we address you?</Typography.H1>
            </Header>
            <Input>
              <Text>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                clearButtonMode="always"
                textContentType="name"
                maxLength={+(process.env.EXPO_PUBLIC_USERNAME_MAX_LENGTH || 30)}
                style={styles.textInput}
              />
            </Input>
            <Input>
              <Text>Referral Code (Optional)</Text>
              <TextInput
                value={referralCode}
                onChangeText={setReferralCode}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                clearButtonMode="always"
                textContentType="name"
                maxLength={30}
                style={styles.textInput}
              />
            </Input>
            <Button.BtnContain
              label="Continue"
              color={colors.red}
              disabled={disabled}
              onPress={handleSubmit}
              testID={"name-input-button"}
            />
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default InputName;