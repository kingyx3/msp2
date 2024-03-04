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
const FIREBASE_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_FB_apiKey,
  authDomain: process.env.EXPO_PUBLIC_FB_authDomain,
  databaseURL: process.env.EXPO_PUBLIC_FB_databaseURL,
  projectId: process.env.EXPO_PUBLIC_FB_projectId,
  storageBucket: process.env.EXPO_PUBLIC_FB_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_FB_appId,
};

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);
const auth = getAuth(app)
const database = getDatabase(app);
const storage = getStorage(app)
const functions = getFunctions(app);

export { firestore, auth, database, functions, storage, app };