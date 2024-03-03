// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FIREBASE_CONFIG_DEV = {
  apiKey: "AIzaSyCmMVqDNKg07ftVZwBGAAe8_6nuj0wo5Ho",
  authDomain: "makeshiftplans-dev.firebaseapp.com",
  databaseURL: "https://makeshiftplans-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "makeshiftplans-dev",
  storageBucket: "makeshiftplans-dev.appspot.com",
  messagingSenderId: "505686398711",
  appId: "1:505686398711:web:2bdf7092493c5f0a5ae5f2",
  measurementId: "G-ZW3HDVGHM1"
};

const FIREBASE_CONFIG_PROD = {
  apiKey: "AIzaSyDYMlWK4U1D-JoLHHu1yWM84p_GF3aQEhA",
  authDomain: "makeshiftplans-prod.firebaseapp.com",
  projectId: "makeshiftplans-prod",
  storageBucket: "makeshiftplans-prod.appspot.com",
  messagingSenderId: "216928290796",
  appId: "1:216928290796:web:814c2544637cde605422c9",
  measurementId: "G-QW4JP2S1VG"
};

// Initialize Firebase
const app = initializeApp(process.env.EXPO_PUBLIC_TYPE == 'PROD' ? FIREBASE_CONFIG_PROD : FIREBASE_CONFIG_DEV);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);
const auth = getAuth(app)
const database = getDatabase(app);
const storage = getStorage(app)
const functions = getFunctions(app);

export { firestore, auth, database, functions, storage, app };