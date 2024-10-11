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
import * as Updates from 'expo-updates';
import navigationTheme from "./app/navigation/navigationTheme";
import RootStack from "./app/navigation/RootStack";
import AuthStack from "./app/navigation/AuthStack";
import InputName from "./app/screens/InputName";
// import { createStaticData } from "./app/components/Firebase/firebase";
import { auth, database } from './app/components/Firebase/firebaseConfig'
import { isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from 'firebase/database';
import * as Application from 'expo-application';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasName, setHasName] = useState(false);
  const [foregrounded, setForegrounded] = useState(false);
  // createStaticData()
  const useUrl = Linking.useURL();

  useEffect(() => {
    async function checkForAppStoreUpdates() {
      // Check for updates using your custom logic (checks for 1.0.2 number only not the version code etc)
      if (Application.nativeApplicationVersion != process.env.EXPO_PUBLIC_nativeApplicationVersion) {
        if (Platform.OS === 'android') {
          Alert.alert(
            'Update available',
            'Please update the app for a better experience.', // + " | " + Application.nativeApplicationVersion + ', ' + process.env.EXPO_PUBLIC_nativeApplicationVersion,
            [
              {
                text: 'Update', onPress: () => Linking.openURL("https://play.google.com/store/apps/details?id=" + process.env.EXPO_PUBLIC_ANDROID_ID)
              }, // open store if update is needed.
              {
                text: 'Later', onPress: () => console.log('Later pressed!')
              },
            ],
            { cancelable: false }
          );
        } else if (Platform.OS === 'ios') {
        } else {
        }
      }
    }
    async function checkForExpoUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        // Doesnt work on Expo Go - will error out here.
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        // alert(`Error fetching latest Expo update: ${error}`);
        console.log('checkForExpoUpdates error: ', error)
      }
      setLoaded(true);
    }

    if (process.env.EXPO_PUBLIC_SKIP_UPDATE_CHECK) {
      setLoaded(true);
    } else {
      checkForExpoUpdates();
      checkForAppStoreUpdates();
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const email = await SecureStore.getItemAsync('emailForSignIn');
        const latestRandomKey = await SecureStore.getItemAsync('latestRandomKey');

        if (useUrl && isSignInWithEmailLink(auth, useUrl)) {
          if (useUrl.includes(latestRandomKey)) {
            if (email) {
              await signInWithEmailLink(auth, email, useUrl);
              await SecureStore.deleteItemAsync('emailForSignIn');
              await SecureStore.deleteItemAsync('latestRandomKey');
            } else {
              Alert.alert('Different Device', 'Please login using the same device.', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]);
            }
          } else {
            Alert.alert('Link Expired', 'Please use the latest link sent to your email.', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
        }
      } catch (error) {
        console.error('Email link login error', error);
      }
    };

    checkAuth().catch(console.error);
  }, [useUrl]);


  // Not very useful, doesnt really help to persist auth
  useEffect(() => {
    // Check if app is foregrounded
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        setForegrounded(Math.random())
      }
    });

    // Clean up listeners
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      // if foregrounded?]
      auth.currentUser.getIdToken(true)
        .then(function (idToken) {
          console.log('idToken: ', idToken)
        }).catch(function (error) {
          console.log('idTokenError: ', error)
        });
    }
  }, [foregrounded])

  useEffect(() => {
    const handleLinkEvent = (event) => {
      const url = event.url;
      Alert.alert('URL Detected', url);
    };

    // Check if the app was opened with a URL
    const checkInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        Alert.alert('Initial URL Detected', initialUrl);
      }
    };

    // Set up the listener for URL changes
    Linking.addEventListener('url', handleLinkEvent);

    // Check the initial URL when the app launches
    checkInitialURL();

    return () => {
      Linking.removeEventListener('url', handleLinkEvent);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if (user) {

      // if (useUrl) {
      //   const data = new URL(useUrl);
      //   const referralCode = data.searchParams.get('r');
      //   if (referralCode) {
      //     Alert.alert("Referral Code", `Your referral code is: ${referralCode}`);
      //   } else {
      //     Alert.alert("Referral Code", `No referral code found. URL is: ${useUrl}`);
      //   }
      // } else {
      //   Alert.alert("URL", "No URL found.");
      // }

      // const userRef = firebase.firestore().collection('users').doc(user.uid);
      // await userRef.set({ referralLink }, { merge: true });
      // }
      // Check if name exists to set logged in status
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
    // Clean up the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [useUrl]);

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
