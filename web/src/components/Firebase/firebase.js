import { firestore, auth, database, functions, storage, app } from './firebaseConfig'; // Adjust the path as necessary
// import { updateProfile } from "firebase/auth";
// import { collection, doc, onSnapshot, query, where, getDocs, getDoc, runTransaction, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, onValue, once, get, set, update, increment, serverTimestamp as RTDBServerTimestamp } from 'firebase/database';
// import { httpsCallable } from 'firebase/functions';
// import { ref as storageRef, uploadBytes, listAll, deleteObject } from 'firebase/storage';
// import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, onAuthStateChanged, signInWithEmailAndPassword, signInAnonymously, signOut, sendPasswordResetEmail } from "firebase/auth";

//  Function to get cancellationPolicies
export const getCancellationPolicies = async (setCancellationPolicies) => {
    try {
        const cancellationPolicyRef = ref(database, 'system/cancellationPolicy');
        const snapshot = await get(cancellationPolicyRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const cancellationPolicy = Object.values(data)
            setCancellationPolicies(cancellationPolicy);
            // return cancellationPolicy
            return
        } else {
            // Handle the case where the user data doesn't exist
            setCancellationPolicies('Not Found');
            // return 'Not Found'
            return
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error gracefully, e.g., set a default name or show an error message
    }
};