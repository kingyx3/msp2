// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { envVars } from '../../envConfig';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FIREBASE_CONFIG = {
    apiKey: envVars.REACT_APP_FB_apiKey,
    authDomain: envVars.REACT_APP_FB_authDomain,
    databaseURL: envVars.REACT_APP_FB_databaseURL,
    projectId: envVars.REACT_APP_FB_projectId,
    storageBucket: envVars.REACT_APP_FB_storageBucket,
    messagingSenderId: envVars.REACT_APP_FB_messagingSenderId,
    appId: envVars.REACT_APP_FB_appId
};

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
const firestore = getFirestore(app);
const auth = getAuth(app)
const database = getDatabase(app);
const storage = getStorage(app)
const functions = getFunctions(app, "asia-southeast1");

export { firestore, auth, database, functions, storage, app };