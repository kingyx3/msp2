// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FIREBASE_CONFIG = {
    apiKey: process.env.REACT_APP_FB_apiKey,
    authDomain: process.env.REACT_APP_FB_authDomain,
    databaseURL: process.env.REACT_APP_FB_databaseURL,
    projectId: process.env.REACT_APP_FB_projectId,
    storageBucket: process.env.REACT_APP_FB_storageBucket,
    messagingSenderId: process.env.REACT_APP_FB_messagingSenderId,
    appId: process.env.REACT_APP_FB_appId
};

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
const firestore = getFirestore(app);
const auth = getAuth(app)
const database = getDatabase(app);
const storage = getStorage(app)
const functions = getFunctions(app, "asia-southeast1");

export { firestore, auth, database, functions, storage, app };