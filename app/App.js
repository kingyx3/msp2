import React, { useEffect } from "react";
import useState from 'react-usestateref';
import { Alert, Text, View, StatusBar, StyleSheet, Platform, ActivityIndicator, AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./app/store/store";
import styled from "styled-components/native";
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import navigationTheme from "./app/navigation/navigationTheme";
import RootStack from "./app/navigation/RootStack";
import AuthStack from "./app/navigation/AuthStack";
import InputName from "./app/screens/InputName";
// import { checkUserName } from "./app/components/Firebase/firebase";
import { auth, database } from './app/components/Firebase/firebaseConfig'
import { isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from 'firebase/database';
import * as Application from 'expo-application';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasName, setHasName] = useState(false);

  // ---------------
  const useUrl = Linking.useURL();

  useEffect(() => {
    async function checkForAppStoreUpdates() {
      // Check for updates using your custom logic (checks for 1.0.2 number only not the version code etc)
      if (Application.nativeApplicationVersion != process.env.EXPO_PUBLIC_nativeApplicationVersion) {
        Alert.alert(
          'Update available',
          'Please update the app for a better experience.', // + " | " + Application.nativeApplicationVersion + ', ' + process.env.EXPO_PUBLIC_nativeApplicationVersion,
          [
            {
              text: 'Update', onPress: () => Linking.openURL("https://play.google.com/store/apps/details?id=com.makeshiftplans.android")
            }, // open store if update is needed.
            { text: 'Later', onPress: () => console.log('Later Pressed') }
          ],
          { cancelable: false }
        );
      }
    }
    if (Platform.OS === 'android') {
      checkForAppStoreUpdates();
    }
  }, []);

  useEffect(() => {
    // declare the data fetching function
    const checkAuth = async () => {
      const email = await SecureStore.getItemAsync('emailForSignIn');
      const latestRandomKey = await SecureStore.getItemAsync('latestRandomKey')

      if (useUrl) {
        // Confirm the link is a sign-in with email link.
        if (isSignInWithEmailLink(auth, useUrl)) {
          // Additional state parameters can also be passed via URL.
          // This can be used to continue the user's intended action before triggering
          // the sign-in operation.
          if (useUrl.includes(latestRandomKey)) {
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            if (email) {
              // The client SDK will parse the code from the link for you.
              try {
                await signInWithEmailLink(auth, email, useUrl)
                // Clear email & randomkey from storage.
                await SecureStore.deleteItemAsync('emailForSignIn');
                await SecureStore.deleteItemAsync('latestRandomKey');
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
              } catch (e) {
                // Alert.alert('Email link login error', e, [
                //   { text: 'OK', onPress: () => console.log('OK Pressed') },
                // ]);
              }
            } else {
              // Alert.alert('Cannot find Email', 'User opened the link on a different device.', [
              //   { text: 'OK', onPress: () => console.log('OK Pressed') },
              // ]);
            }
          } else {
            // Alert.alert('Not Latest Email Link', '', [
            //   { text: 'OK', onPress: () => console.log('OK Pressed') },
            // ]);
          }
        } else {
          // Alert.alert('Not Email Link', '', [
          //   { text: 'OK', onPress: () => console.log('OK Pressed') },
          // ]);
        }
      }
    }
    // call the function
    checkAuth()
      // make sure to catch any error
      .catch(console.error);
  }, [useUrl])

  useEffect(() => {
    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Clean up listeners
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      // App is foregrounded, execute desired code
      console.log('App is foregrounded');
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userNameRef = ref(database, `users/${user.uid}`);
          const userNameListener = onValue(userNameRef, (snapshot) => {
            if (snapshot.exists()) {
              setHasName(true);
            } else {
              setHasName(false);
            }
            setLoggedIn(true);
          });
          // Return a cleanup function to unsubscribe from the userNameListener
          return () => {
            userNameListener();
          };
        } else {
          setLoggedIn(false);
        }
      });
      setLoaded(true);
      // Clean up the auth state listener when the component unmounts
      return () => unsubscribe();
    }
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const userNameRef = ref(database, `users/${user.uid}`);
  //       const userNameListener = onValue(userNameRef, (snapshot) => {
  //         if (snapshot.exists()) {
  //           setHasName(true);
  //         } else {
  //           setHasName(false);
  //         }
  //         setLoggedIn(true);
  //       });

  //       // Return a cleanup function to unsubscribe from the userNameListener
  //       return () => {
  //         userNameListener();
  //       };
  //     } else {
  //       setLoggedIn(false);
  //     }
  //   });

  //   setLoaded(true);

  //   // Clean up the auth state listener when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  if (loaded) {
    wait(1000).then(() => SplashScreen.hideAsync())
  }

  return (
    <Common>
      <Provider store={store}>
        <NavigationContainer theme={navigationTheme}>
          {loaded && !loggedIn && <AuthStack />}
          {loaded && loggedIn && !hasName && <InputName />}
          {loaded && loggedIn && hasName && <RootStack />}
        </NavigationContainer>
      </Provider>
    </Common>
  );
}

const Common = styled.SafeAreaView`
  ${Platform.select({
  ios: {
    fontFamily: "Avenir",
  },
  android: {
    fontFamily: "Roboto",
    paddingTop: StatusBar.currentHeight,
  },
})}
  flex: 1;
`;

const wait = (msec) => new Promise((resolve, _) => {
  setTimeout(resolve, msec)
});

// eas update --branch development --auto
// eas build -p android -e test (For EAS Build + Detox Test (.apk))
// eas build -p android -e development --auto-submit (For EAS Build + Google Play Submission (.aab))





// Old / Others
// eas update --branch production --message "Updating the app"
// eas submit -p android --latest
