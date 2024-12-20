import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Network from 'expo-network';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { loginWithEmail, loginWithEmailLink, registerWithEmail, showOfflineAlert } from '../../components/Firebase/firebase';
import { BtnContainNew } from '../../components/Button';

export default function App(props) {
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  async function handleOnLogin(email) {
    const validEmail = validateEmail(email)
    setEmailValid(validEmail)
    if (validEmail) {
      const networkState = await Network.getNetworkStateAsync();
      if (networkState.isConnected) {
        // Device is connected to the internet
        setDisabled(true)
        try {
          // For svc acct
          await loginWithEmail(email, 'QnIVZ-ke7c3_nGcU$QkMFi@iFftsOT!497M-QBq8EdY2b7bdrJHETZVS8SrL-Iop');
        } catch (error) {
          if (error.code === 'auth/user-disabled') {
            Alert.alert("Error", "User account deleted", ["Ok"])
          } else {
            // Alert.alert("Error code", error.code,["Ok"])
            // invalid-credentials => login, else register
            await registerWithEmail(email);
            try {
              await loginWithEmailLink(email)
              props.navigation.navigate('Email Link Sent', email)
            } catch (e) {
              // Alert.alert(e)
              console.log('Email Link Error: ', e)
            }
          }
        } finally {
          setDisabled(false)
        }
      } else {
        // Device is not connected to the internet
        showOfflineAlert()
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
      </View>
      <Text testID={'welcome-text'} style={styles.title}>Welcome To {process.env.EXPO_PUBLIC_APP_NAME}</Text>
      <Text style={styles.subtitle}>Find and rent spaces on an hourly basis</Text>
      <TextInput
        style={[styles.input, !isEmailValid && styles.inputError]}
        testID="email-input"
        disabled={disabled}
        onChangeText={setEmail}
        value={email}
        clearButtonMode="always"
        textContentType="emailAddress"
        placeholder="Enter email address"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!isEmailValid && <Text style={styles.errorText}>Please enter a valid email address.</Text>}
      <BtnContainNew
        testID={'submit-email-button'}
        label={'Continue with Email'}
        disabled={disabled}
        onPress={() => handleOnLogin(email)}
      />
      <Text style={styles.agreementText}>
        By continuing, you agree to our{' '}
        <Text style={styles.link}>Privacy Policy</Text>,{' '}
        <Text style={styles.link}>Terms of Service</Text>, and the{' '}
        <Text style={styles.link}>Payments Terms of Service</Text>
      </Text>
      <View style={{ padding: 100 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    paddingHorizontal: wp('8%'),
  },
  logoContainer: {
    marginBottom: hp('5%'),
  },
  logo: {
    width: wp('35%'),
    height: wp('35%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#5a2d82',
    textAlign: 'left',
    width: '100%',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: 'black',
    textAlign: 'left',
    marginBottom: hp('2%'),
    width: '100%',
  },
  input: {
    height: hp('5%'),
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: wp('2%'),
    marginBottom: hp('2%'),
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: hp('2%'),
    textAlign: 'left',
    width: '100%',
  },
  agreementText: {
    color: '#5a2d82',
    textAlign: 'left',
    marginBottom: hp('3%'),
    width: '100%',
  },
  link: {
    textDecorationLine: 'underline',
  },
});


// import React, { useState } from "react";
// import { Text, StyleSheet, View, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
// import * as Yup from "yup";
// import * as Network from 'expo-network';

// //import components
// import AppForm from "../../components/forms/AppForm";
// import * as Button from "../../components/Button";
// import * as TextInput from "../../components/forms/AppInput";
// import { loginWithEmail, loginWithEmailLink, registerWithEmail, showOfflineAlert } from '../../components/Firebase/firebase';
// import SubmitBtn from "../../components/forms/SubmitBtn";
// // import Colors from '../../components/forms/Colors';
// import colors from "../../config/colors";
// //import styles and assets
// import styled from "styled-components/native";
// import * as Typography from "../../config/Typography";

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .required('Please enter a registered email')
//     .email()
//     .label('Email'),
// });

// const Login = ({ navigation }) => {
//   const [disabled, setDisabled] = useState(false);

// async function handleOnLogin(values) {
//   const networkState = await Network.getNetworkStateAsync();
//   if (networkState.isConnected) {
//     // Device is connected to the internet
//     setDisabled(true)
//     const { email } = values;
//     try {
//       // For svc acct
//       await loginWithEmail(email, 'QnIVZ-ke7c3_nGcU$QkMFi@iFftsOT!497M-QBq8EdY2b7bdrJHETZVS8SrL-Iop');
//     } catch (error) {
//       await registerWithEmail(email);
//       try {
//         await loginWithEmailLink(email)
//         navigation.navigate('Email Link Sent', email)
//       } catch (e) {
//         // Alert.alert(e)
//         console.log('Email Link Error: ', e)
//       }
//     }
//     setDisabled(false)
//   } else {
//     // Device is not connected to the internet
//     showOfflineAlert()
//   }
// }

//   return (
//     <Container>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : null}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
//       >
//         <Input></Input>
//         <Input></Input>
//         <Main>
//           <Header>
//             <Logo source={require("../../assets/icon.png")}></Logo>
//             <Typography.H1 testID={'welcome-text'} color={colors.red}>Welcome to {process.env.EXPO_PUBLIC_APP_NAME}</Typography.H1>
//             <Typography.Sub1 color={colors.red}>Find and rent spaces on an hourly basis</Typography.Sub1>
//           </Header>
//           <AppForm
//             initialValues={{ email: "", password: "" }}
//             onSubmit={values => handleOnLogin(values)}//onSubmit={() => handleOnLogin} //navigation.navigate("HomeStack")}
//             validationSchema={validationSchema}
//           >
//             <Input>
//               <Text>Email</Text>
//               <TextInput.Default
//                 editable={!disabled}
//                 testID="email-input"
//                 name="email"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 keyboardType="email-address"
//                 clearButtonMode="always"
//                 textContentType="emailAddress"
//               />
//             </Input>
//             <SubmitBtn
//               testID="submit-email-button"
//               title="Continue with Email"
//               disabled={disabled}
//             />
//             {/* <Text style={styles.errorText}>{loginError}</Text> */}
//           </AppForm>
//           <Terms>
//             <Typography.P color={colors.gray}>
//               By tapping Continue with Email, you agree to our Terms of Service, Payments Terms of Service, and Privacy Policy.
//             </Typography.P>
//           </Terms>
//         </Main>
//       </KeyboardAvoidingView>
//     </Container>
//   );
// };

// const Container = styled.ScrollView`
//   flex: 1;
//   background-color: white;
// `;

// const Main = styled.View`
//   padding: 26px;
//   flex: 1;
//   /* justify-content: center; */
// `;

// const Btn = styled.View`
//   display: flex;
//   margin: 10px 0;
// `;

// const Header = styled.View`
//   margin-bottom: 60px;
// `;

// const Input = styled.View`
//   padding-bottom: 26px;
// `;

// const Logo = styled.Image`
//   width: 60px;
//   height: 60px;
//   resize-mode: contain;
//   margin: 10px 0;
// `;

// const Terms = styled.View`
//   margin-top: 20px;
// `;

// const styles = StyleSheet.create({
//   footerButtonContainer: {
//     marginVertical: 15,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   forgotPasswordButtonText: {
//     color: colors.red,
//     fontSize: Platform.OS === 'ios' ? 18 : 12,
//     fontWeight: '600'
//   },
//   // backButton: {
//   //   justifyContent: 'center',
//   //   alignItems: 'center'
//   // },
//   errorText: {
//     marginTop: 20,
//     marginLeft: 15,
//     color: colors.red,
//     fontSize: Platform.OS === 'ios' ? 16 : 10,
//     marginBottom: 5,
//     fontWeight: '600'
//   }
// });

// export default Login;
