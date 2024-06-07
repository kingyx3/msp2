// IDEA:
// WRITE OPERATIONS => CLOUD FUNCTIONS
// READ OPERATIONS => WEB SDK

import { firestore, auth, database, functions, storage, app } from './firebaseConfig'; // Adjust the path as necessary
import { updateProfile } from "firebase/auth";
import { collection, doc, onSnapshot, query, where, getDocs, getDoc, runTransaction, serverTimestamp, Timestamp, orderBy, limit } from 'firebase/firestore';
import { ref, onValue, once, get, set, update, increment, off, serverTimestamp as RTDBServerTimestamp } from 'firebase/database';
import { httpsCallable } from 'firebase/functions';
import { ref as storageRef, uploadBytes, listAll, deleteObject } from 'firebase/storage';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, onAuthStateChanged, signInWithEmailAndPassword, signInAnonymously, signOut, sendPasswordResetEmail } from "firebase/auth";

import { Image } from 'expo-image';

import _ from 'lodash' //import _, { set } from 'lodash'
// import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common'
import { activesgSpaceSummary } from '../../config/appConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

const deepmerge = require('deepmerge')

// Email link Auth
export const loginWithEmailLink = async (email) => {
  const latestRandomKey = Math.random().toString(36).substring(2);
  // actionCodeSettings for email link login
  let actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://makeshiftplans.com/?key=' + latestRandomKey, //Linking.createURL(),
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'host.exp.Exponent'
    },
    android: {
      packageName: process.env.EXPO_PUBLIC_ANDROID_ID,
      installApp: true,
      minimumVersion: '15'
    },
    dynamicLinkDomain: process.env.EXPO_PUBLIC_DLINK // need custom domain, then link in dynamics in firebase console
  };
  return sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(async () => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.

      // await AsyncStorage.setItem('latestRandomKey', latestRandomKey)
      // await AsyncStorage.setItem('emailForSignIn', email)

      await SecureStore.setItemAsync('latestRandomKey', latestRandomKey);
      await SecureStore.setItemAsync('emailForSignIn', email);

      // Alert.alert('Email sent!', 'Please check your email inbox/spam/junk for login link.', [
      //   { text: 'OK', onPress: () => console.log('OK Pressed') },
      // ]);
      // console.log("latestRandomKey & email set in async store")
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
      console.log(errorCode)
      console.log(errorMessage)
    });
}

// Auth
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginAnonymously = () => {
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
      console.log('User is signed in anonymously via Firebase Auth!')
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage)
      // ...
    });
}

export const logout = async () => signOut(auth);

export const passwordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};
// Function to create user (USER-C) (2W)
export const registerWithEmail = async (email) => {
  const CFregisterWithEmail = httpsCallable(functions, 'registerWithEmail');
  const inputs = { email };
  return CFregisterWithEmail(inputs);
};

// Function to update user name
export const updateUserName = async (name) => {
  const user = auth.currentUser;
  const userId = user.uid;
  const userNameRef = ref(database, `users/${userId}`);

  // Updating name in Firebase Auth
  try {
    await updateProfile(user, {
      displayName: name,
    });
  } catch (error) {
    console.log(error);
  }

  // Updating name in Firebase RTDB
  set(userNameRef, { name });
};

// Function to get user name
export const getUserName = async (userId) => {
  try {
    const userNameRef = ref(database, `users/${userId}`);
    const snapshot = await get(userNameRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userName = Object.values(userData)[0];
      // console.log('userName', userName)
      return userName
    } else {
      // Handle the case where the user data doesn't exist
      return
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle the error gracefully, e.g., set a default name or show an error message
  }
};

//  Fucntion to get cancellationPolicies
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

//Function to update expo token
export const updateExpoPushToken = async (expoPushToken) => {
  const CFupdateExpoPushToken = httpsCallable(functions, 'updateExpoPushToken');
  const inputs = { expoPushToken };
  return CFupdateExpoPushToken(inputs);
};

export const updateAvatar = async (uri) => uploadImage(uri, '', '')

// Function to fetch user info (USER-R) (1R)
export function fetchUser() {
  return (dispatch) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const userDocRef = doc(firestore, 'users', user.uid);
    const listener = onSnapshot(userDocRef, (snapshot) => {
      console.log("NUMBER OF READS (fetchUser): 1")
      if (snapshot.exists()) {
        let userData = snapshot.data();
        // Convert all Timestamps, including nested ones, to ISO strings
        userData = convertTimestampsToIsoStrings(userData);
        dispatch({ type: "FETCH_USER", payload: { user: userData } });
      } else {
        console.log('User does not exist');
      }
    });
    return listener
  };
}

// Function to fetch user ip location - non firebase
export function fetchIpLocation() {
  return (dispatch) => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(userIpLocation => {
        // console.log('User ip location =>', userIpLocation)
        dispatch({ type: "FETCH_USER_IP_LOCATION", payload: { userIpLocation }, });
      })
      .catch(error => {
        console.log('Unable to get user ip location =>', error)
      });
  }
}
// *Function to update user info (USER-U)
// Function to delete user (USER-D)
// Function to create an space (SPACE-C) (XR, 4W)
export async function createSpace(spaceType, price, peakPrice, offPeakPrice, localImages, location, title, description, spaceCount, cancellationPolicy, monthsAhead, openingHours, needHostConfirm) {
  const CFcreateSpace = httpsCallable(functions, 'createSpace');
  const spaceRef = doc(collection(firestore, "spaces"));
  const spaceId = spaceRef.id;
  const inputs = {
    spaceId,
    spaceType,
    price,
    peakPrice,
    offPeakPrice,
    localImages,
    location,
    title,
    description,
    spaceCount,
    monthsAhead,
    cancellationPolicy,
    openingHours,
    needHostConfirm,
  };

  try {
    await Promise.all(localImages.map((image, index) => uploadImage(image, spaceId, index)));
    console.log("SPACE IMAGES UPLOADED SUCCESSFULLY");

    const userId = auth.currentUser.uid;
    const imagePath = `users/${userId}/spaces/${spaceId}/images/`;
    const listRef = storageRef(storage, imagePath);

    const res = await listAll(listRef);

    await Promise.all(
      res.items.map((itemRef, i) => {
        const itemNum = itemRef.toString().split('images/')[1];
        if (itemNum >= localImages.length) {
          return deleteObject(itemRef)
            .then(() => console.log("IMAGE FILE @ " + itemRef + " DELETED"))
            .catch((e) => Promise.reject("IMAGE FILE DELETION ERROR: " + e));
        }
      })
    );

    console.log('ALL EXTRA IMAGE FILES DELETED');
    await CFcreateSpace(inputs);
    console.log("SPACE CREATED SUCCESSFULLY");

  } catch (e) {
    console.error(e);
    if (e.message.includes('IMAGE FILE DELETION ERROR')) {
      return Promise.reject('FAILED TO DELETE EXTRA IMAGE FILES: ' + e.message);
    } else if (e.message.includes('SPACE IMAGES UPLOADING ERROR')) {
      return Promise.reject("SPACE IMAGES UPLOADING ERROR: " + e.message);
    } else {
      return Promise.reject(e);
    }
  }
}


// Function to fetch space summary (SPACE-R) - USER (XR) => XR depends on allspaces (number of allspaces / 100 (per spaceType))
export function setSpaceSummary(spaceType) {
  return async (dispatch) => {

    const querySnapshot = query(
      collection(firestore, 'allspaces'),
      where("spaceType", "==", spaceType)
    );

    return getDocs(querySnapshot)
      .then((snapshot) => {
        console.log("NUMBER OF READS (setSpaceSummary):", snapshot.docs.length);
        let spaceSummary = {};
        snapshot.docs.forEach(doc => {
          spaceSummary = { ...spaceSummary, ...doc.data() };
        });

        if (activesgSpaceSummary[spaceType]) {
          spaceSummary = deepmerge.all([spaceSummary, activesgSpaceSummary[spaceType]]);
        }

        return dispatch({ type: 'SET_SPACE_SUMMARY', payload: { spaceSummary } });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
}

// Function to get available spaces (SPACE-R) - USER (XR) => XR depends on allspacesavailability (number of dates involved * number of allspaces / 100 (per spaceType))
export function setSelectedSpaces(spaceType, start, end, spaceSummaryz) {
  let spaceSummary = JSON.parse(JSON.stringify(spaceSummaryz));
  // export function setSelectedSpaces(spaceType, start, end, spaceSummaryz) { //, country, city
  return ((dispatch) => {
    console.log('Getting available', spaceType, 'from:', start, 'to:', end)
    start = start.valueOf()
    end = end.valueOf()
    let timeSlots = getTimeSlots(start, end)
    let dates = Array.from(new Set(timeSlots.map(timeSlot => new Date(timeSlot).toISOString().slice(0, 10).replace(/-/g, ''))));

    console.log('dates', dates)
    const allSpacesAvailabilityRef = collection(firestore, 'allspacesavailability');

    const q = query(
      allSpacesAvailabilityRef,
      where('spaceType', '==', spaceType),
      where('date', 'in', dates) // Note: 'in' query supports only up to 10 items
    );

    getDocs(q)
      .then(async (snapshot) => {
        console.log("NUMBER OF READS (setSelectedSpaces):", snapshot.docs.length + 1)

        // collect full list of spaceIds
        let spaceIds = [];
        snapshot
          .forEach((doc) => Object.values(doc.data())
            .forEach((timeSlot) => Object.keys(timeSlot) // spaceIds.add(spaceId))
              .forEach((spaceId) => spaceIds.push(spaceId))))
        spaceIds = Array.from(new Set(spaceIds))

        // get all timeSlotSpaces
        let timeSlotSpaces = {}
        for (let i = 0; i < snapshot.docs.length; i++) {
          let data = snapshot.docs[i].data() // doc.data() is {spaceType : spaceType, spaceId1:true, datetime: {spaceId1: spaceCount}}
          let newData = {}
          for (let timeSlot in data) {
            // console.log('timeSlot', timeSlot)
            if (timeSlots.includes(parseInt(timeSlot))) {
              newData[timeSlot] = data[timeSlot]
            }
          }
          // console.log('newData', newData)
          timeSlotSpaces = deepmerge.all([{ ...timeSlotSpaces }, newData]) // merging available spaces to get object with all potential spaces
        }

        // get all available spaces from db
        const availableSpaces = {}
        for (let i = 0; i < spaceIds.length; i++) {
          let periodAvailabilityArray = []
          for (const timeSlot in timeSlotSpaces) {
            const spaceTimeSlotAvailabilityObj = timeSlotSpaces[timeSlot]
            // console.log('spaceTimeSlotAvailabilityObj', spaceTimeSlotAvailabilityObj)
            const spaceTimeSlotAvailabilityArray = spaceTimeSlotAvailabilityObj[spaceIds[i]]
            // console.log('spaceTimeSlotAvailabilityArray', spaceTimeSlotAvailabilityArray, 'spaceIds[i]', spaceIds[i])
            if (spaceTimeSlotAvailabilityArray) {
              if (periodAvailabilityArray.length == 0) {
                periodAvailabilityArray = spaceTimeSlotAvailabilityArray
              } else {
                periodAvailabilityArray = periodAvailabilityArray.map((e, idx) => e + (spaceTimeSlotAvailabilityArray)[idx])
              }
            }
          }
          // console.log('spaceId', spaceIds[i])
          // console.log('timeSlots.length', timeSlots.length)
          // console.log('periodAvailabilityArray', periodAvailabilityArray)

          // if (periodAvailabilityArray.includes(timeSlots.length)) { // if every doc/timeslot has this listing available, add it to avaiableSpaces
          //   availableSpaces[spaceIds[i]] = { periodAvailabilityArray }
          // }

          if (periodAvailabilityArray.includes(timeSlots.length)) {
            let periodPrice = periodAvailabilityArray[0]
            periodAvailabilityArray.shift() // remove first (pricing) element from array
            // let fees = calcBookerFee(periodPriceExclFees)
            // let periodPrice = periodPriceExclFees + fees
            availableSpaces[spaceIds[i]] = {
              periodAvailabilityArray: periodAvailabilityArray,
              periodPrice,
              // periodPriceExclFees,
              // fees
            };
          }
        }

        if (Object.keys(availableSpaces).length == 0) { // *** to clear the selectedSpaces variable in redux
          console.log("NO AVAILABLE SPACES FOR THESE TIMESLOTS") //
          dispatch({ type: 'SET_SELECTED_SPACES', payload: { selectedSpaces: [] } })
          return
        }

        // console.log('priceSummary', priceSummary)

        let combinedSpaces = deepmerge.all([spaceSummary, availableSpaces])
        // console.log("combinedSpaces are", combinedSpaces['B9A4EO8N4FH30G5PU0CIZC']) //
        let selectedSpaces = []
        for (let key in combinedSpaces) {
          if (combinedSpaces[key].title
            && combinedSpaces[key].images
            && combinedSpaces[key].location
            && combinedSpaces[key].periodAvailabilityArray
            && combinedSpaces[key].periodPrice > 0
            && !(combinedSpaces[key].disabled)) {
            const rating = getRating(combinedSpaces[key].ratingCount, combinedSpaces[key].ratingTotal)
            selectedSpaces.push({
              'id': combinedSpaces[key].id,
              'title': combinedSpaces[key].title,
              'images': combinedSpaces[key].images,
              'location': {
                'latitude': combinedSpaces[key].location.latitude,
                'longitude': combinedSpaces[key].location.longitude,
                'street': combinedSpaces[key].location.geoapify.street,
                'suburb': combinedSpaces[key].location.geoapify.suburb,
                'country': combinedSpaces[key].location.geoapify.country
              },
              'periodAvailabilityArray': combinedSpaces[key].periodAvailabilityArray,
              'periodPrice': combinedSpaces[key].periodPrice,
              // 'periodPriceExclFees': combinedSpaces[key].periodPriceExclFees,
              // 'fees': combinedSpaces[key].fees,
              'disabled': combinedSpaces[key].disabled,
              'third_party': combinedSpaces[key].third_party,
              'reviews': combinedSpaces[key].ratingCount,
              'rating': rating,
              'userId': combinedSpaces[key].userId,
              'needHostConfirm': combinedSpaces[key].needHostConfirm,
            })
          }
        }

        // console.log('spaceSummary:', spaceSummary)
        // console.log('spaceIds:', spaceIds)
        // console.log('timeSlotSpaces:', timeSlotSpaces)
        // console.log('availableSpaces', availableSpaces)
        // console.log('combinedSpaces', combinedSpaces)
        // console.log("selectedSpaces are", selectedSpaces)
        // console.log("setting selectedSpaces", selectedSpaces)
        dispatch({ type: 'SET_SELECTED_SPACES', payload: { selectedSpaces } })
      })
      .catch((e) => console.log("ALLSPACESAVAILABILITY DOCS READ ERROR:", e))
  })
}

// Function to get user selected space (SPACE-R) - USER (1R)
export function setSelectedSpace(selectedSpaceId) {
  return (dispatch) => {
    const spaceRef = doc(firestore, 'spaces', selectedSpaceId);

    const listener = onSnapshot(spaceRef, async (snapshot) => {
      console.log("NUMBER OF READS (setSelectedSpace): 1")
      if (snapshot.exists()) {
        let selectedSpace = snapshot.data();
        // Convert all Timestamps, including nested ones, to ISO strings
        selectedSpace = convertTimestampsToIsoStrings(selectedSpace);

        // if (selectedSpace && selectedSpace.reviews && selectedSpace.reviews.spaceReviewDT) {
        //   for (const key in selectedSpace.reviews.spaceReviewDT) {
        //     if (selectedSpace.reviews.spaceReviewDT[key].hasOwnProperty('userId')) {
        //       // Access and run your function on userId here
        //       const userId = selectedSpace.reviews.spaceReviewDT[key].userId;
        //       selectedSpace.reviews.spaceReviewDT[key].userName = await getUserName(userId, () => { })
        //     }
        //   }
        // }

        dispatch({ type: "SET_SELECTED_SPACE", payload: { selectedSpace } });
      } else {
        console.log('Error selecting space')
      }
    });
    return listener

    // getDoc(spaceRef)
    //   .then(async (snapshot) => {
    //     let selectedSpace = snapshot.data();

    //     // Convert all Timestamps to ISO Strings
    //     selectedSpace = convertTimestampsToIsoStrings(selectedSpace);

    //     // console.log(selectedSpace?.reviews?.spaceReviewDT)
    //     // selectedSpace?.reviews?.spaceReviewDT
    //     if (selectedSpace && selectedSpace.reviews && selectedSpace.reviews.spaceReviewDT) {
    //       for (const key in selectedSpace.reviews.spaceReviewDT) {
    //         if (selectedSpace.reviews.spaceReviewDT[key].hasOwnProperty('userId')) {
    //           // Access and run your function on userId here
    //           const userId = selectedSpace.reviews.spaceReviewDT[key].userId;
    //           selectedSpace.reviews.spaceReviewDT[key].userName = await getUserName(userId, () => { })
    //         }
    //       }
    //     }

    //     dispatch({ type: "SET_SELECTED_SPACE", payload: { selectedSpace } });
    //   })
    //   .catch((e) => console.log('Error selecting space: ' + e));
  };
}

export async function fetchSpaceReviews(spaceId, setSpaceReviews) {
  const spaceReviewsRef = collection(doc(firestore, 'spaces', spaceId), 'spacereviews');
  try {
    const snapshot = await getDocs(spaceReviewsRef);
    console.log("NUMBER OF READS (fetchSpaceReviews):", snapshot.docs.length);

    let spaceReviews = {};
    snapshot.docs.forEach((doc) => {
      spaceReviews = { ...spaceReviews, ...doc.data() };
    });
    const spaceReviewsArray = Object.values(spaceReviews);
    return setSpaceReviews(spaceReviewsArray)
  } catch (e) {
    console.log('Error (fetchSpaceReviews)', e)
    return {}
  }
}

// Function to fetch user's spaces (SPACE-R) - HOST (XR) => XR depends on userspaces (number of userspaces / 100)
export function fetchUserSpaces() {
  return (dispatch) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const userSpacesRef = collection(firestore, 'users', user.uid, 'userspaces');
    const listener = onSnapshot(userSpacesRef, (snapshot) => {
      console.log("NUMBER OF READS (fetchUserSpaces):", snapshot.docs.length);
      let userSpaces = {};
      snapshot.docs.forEach((doc) => {
        // Merge each document's data into the userSpaces object
        userSpaces = { ...userSpaces, ...doc.data() };
      });
      // console.log('userSpaces =>', userSpaces);
      dispatch({ type: "FETCH_USER_SPACES", payload: { userSpaces } });
    });
    return listener
  };
}

// Function to update an space (SPACE-U) (XW)
export async function updateSpace(spaceId, newPrice, newPeakPrice, newOffPeakPrice, newImages, newTitle, newDescription, newCancellationPolicy, monthsAhead, newOpeningHours, newNeedHostConfirm) {
  const CFupdateSpace = httpsCallable(functions, 'updateSpace');
  const inputs = { spaceId, newPrice, newPeakPrice, newOffPeakPrice, newImages, newTitle, newDescription, monthsAhead, newCancellationPolicy, newOpeningHours, newNeedHostConfirm }
  const promises = newImages.map((image, index) => {
    console.log('Uploading image', index + 1, 'out of', newImages.length);
    return uploadImage(image, spaceId, index)
  });

  return Promise.all(promises)
    .then(async () => {
      console.log("All images uploaded successfully")
      return CFupdateSpace(inputs)
    })
    .then(async () => {
      console.log("SPACE UPDATED SUCCESSFULLY!");
      const userId = auth.currentUser.uid;
      const imagePath = `users/${userId}/spaces/${spaceId}/images/`; // {i} remove all images in the path
      const listRef = storageRef(storage, imagePath);

      return listAll(listRef)
        .then((res) => {
          return res.items.forEach((item, i) => {
            // All the items under listRef.
            const itemNum = item.toString().split('images/')[1];
            if (itemNum >= newImages.length) {
              return deleteObject(item)
                .then(() => {
                  return console.log("IMAGE FILE @ " + item + " DELETED");
                })
                .catch((e) => {
                  return Promise.reject("IMAGE FILE DELETION ERROR: " + e);
                });
            }
          });
        })
        .then(async () => {
          console.log('Extra image files deleted!')
          await Image.clearDiskCache()
          await Image.clearMemoryCache()
        })
        .catch((e) => console.log('Failed to delete extra image files!', e));
    })
    .catch((e) => Promise.reject("IMAGES UPLOAD ERROR: " + e))
}
// Function to disable an space (SPACE-U) (XW)
export async function disableSpace(spaceId) {
  const CFdisableSpace = httpsCallable(functions, 'disableSpace');
  const inputs = { spaceId }
  return CFdisableSpace(inputs)
}
// Function to enable an space (SPACE-DU) (XW)
export async function enableSpace(spaceId) {
  const CFenableSpace = httpsCallable(functions, 'enableSpace');
  const inputs = { spaceId }
  return CFenableSpace(inputs)
}
// *Function to deactivate an space (SPACE-D)
export async function deactivateSpace(spaceId) {
  const spaceRef = doc(firestore, "spaces", spaceId);
  const space = await getDoc(spaceRef);
  const { userId, spaceType, allSpacesDocNum, userSpacesDocNum } = space.data();
  const allSpacesRef = doc(firestore, "allspaces", spaceType + allSpacesDocNum);
  const userSpacesRef = doc(firestore, "users", userId, "userspaces", userSpacesDocNum);

  if (userId !== auth.currentUser.uid) {
    return "Unauthorized to deactivate space";
  }

  await runTransaction(firestore, async (transaction) => {
    transaction.update(allSpacesRef, { [`${spaceId}.disabled`]: serverTimestamp() });
    transaction.update(spaceRef, { disabled: serverTimestamp() });
    transaction.update(userSpacesRef, { [`${spaceId}.disabled`]: serverTimestamp() });
  });

  return "Space deactivated successfully";
}
// *Function to (re)activate an space (SPACE-D)
export async function activateSpace(spaceId) {
  const spaceRef = doc(firestore, "spaces", spaceId);
  const space = await getDoc(spaceRef);
  const { userId, spaceType, allSpacesDocNum, userSpacesDocNum } = space.data();
  const allSpacesRef = doc(firestore, "allspaces", spaceType + allSpacesDocNum);
  const userSpacesRef = doc(firestore, "users", userId, "userspaces", userSpacesDocNum);

  if (userId !== auth.currentUser.uid) {
    return "Unauthorized to (re)activate space";
  }

  await runTransaction(firestore, async (transaction) => {
    transaction.update(allSpacesRef, { [`${spaceId}.disabled`]: false });
    transaction.update(spaceRef, { disabled: false });
    transaction.update(userSpacesRef, { [`${spaceId}.disabled`]: false });
  });

  return "Space (re)activated successfully";
}
// *Function to delete an space (SPACE-D)
export function deleteSpace(spaceId) { // need to beware of dependencies i.e. previous bookings etc causing orphaned.. maybe deleted = true?
}

// Function to create a booking (BOOKING-C) (XR+XW+2W) => XR depends on allspacesavailability (number of dates involved)
export async function createBooking(spaceId, start, end, courtId) {//selectedSpace, start, end, price, userBookings) { // TRANSACTION-ED
  const CFcreateBooking = httpsCallable(functions, 'createBooking');
  const inputs = { spaceId, start, end, courtId }
  // console.log(inputs)
  return CFcreateBooking(inputs)
    .then(() => console.log("BOOKING CREATED SUCCESSFULLY!"))
    .catch((e) => Promise.reject(e))
}

// Function to approve bookings
export const approveBooking = async (bookingId) => {
  const CFapproveBooking = httpsCallable(functions, 'approveBooking');
  const inputs = { bookingId };
  return CFapproveBooking(inputs);
};

// **Function to fetch bookings - HOST (BOOKING-R) (1R)
// Function to fetch bookings - USER (BOOKING-R) (XR) => XR depends on userbookings (number of userbookings / 100)
export function fetchUserBookings() {
  return (dispatch) => {
    const userUid = auth.currentUser ? auth.currentUser.uid : null;
    if (!userUid) {
      console.log('User not logged in');
      return;
    }

    const userBookingsRef = collection(firestore, 'users', userUid, 'userbookings');
    const listener = onSnapshot(userBookingsRef, (snapshot) => {
      console.log("NUMBER OF READS (fetchUserBookings):", snapshot.docs.length);
      let userBookings = {};
      snapshot.docs.forEach((docSnapshot) => {
        // Convert each document's data to make sure all values are serializable
        const bookingData = convertTimestampsToIsoStrings(docSnapshot.data());
        // Merge the converted data into the userBookings object
        userBookings = { ...userBookings, ...bookingData };
      });
      dispatch({ type: "FETCH_USER_BOOKINGS", payload: { userBookings } });
    });
    return listener
  };
}

export function fetchUserLogs() {
  return async (dispatch) => {
    const userUid = auth.currentUser ? auth.currentUser.uid : null;
    if (!userUid) {
      console.log('User not logged in');
      return;
    }

    const userLogsRef = collection(firestore, 'users', userUid, 'userlogs');
    const q = query(userLogsRef, orderBy('lastModified', 'desc'), limit(1));

    try {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("NUMBER OF READS (fetchUserLogs):", snapshot.docs.length);
        if (!snapshot.empty) {
          const latestDoc = convertTimestampsToIsoStrings(snapshot.docs[0].data());
          delete latestDoc.lastModified;
          dispatch({ type: "FETCH_USER_LOGS", payload: { userLogs: latestDoc } });
        } else {
          console.log('No user logs found');
          dispatch({ type: "FETCH_USER_LOGS", payload: { userLogs: {} } });
        }
      });

      // Return the unsubscribe function to remove the listener when needed
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching user logs:', error);
      // dispatch({ type: "FETCH_USER_LOGS_ERROR", payload: { error: error.message } });
    }
  };
}

export function fetchUserHostingLogs() {
  return async (dispatch) => {
    const userUid = auth.currentUser ? auth.currentUser.uid : null;
    if (!userUid) {
      console.log('User not logged in');
      return;
    }

    const userHostingLogsRef = collection(firestore, 'users', userUid, 'userhostinglogs');
    const q = query(userHostingLogsRef, orderBy('lastModified', 'desc'), limit(1));

    try {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("NUMBER OF READS (fetchUserHostingLogs):", snapshot.docs.length);
        if (!snapshot.empty) {
          const latestDoc = convertTimestampsToIsoStrings(snapshot.docs[0].data());
          delete latestDoc.lastModified;
          dispatch({ type: "FETCH_USER_HOSTING_LOGS", payload: { userHostingLogs: latestDoc } });
        } else {
          console.log('No user hosting logs found');
          dispatch({ type: "FETCH_USER_HOSTING_LOGS", payload: { userHostingLogs: {} } });
        }
      });

      // Return the unsubscribe function to remove the listener when needed
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching user hosting logs:', error);
      // dispatch({ type: "FETCH_USER_HOSTING_LOGS", payload: { error: error.message } });
    }
  };
}

// Function to fetch userMessages
export function fetchUserMessages() {
  return async (dispatch) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const chatRef = ref(database, `chatrooms/${user.uid}/`);
    onValue(chatRef, async (snapshot) => {
      let userMessages = snapshot.exists() ? Object.values(snapshot.val()) : [];
      userMessages = userMessages.filter((chat) => chat.chatId);
      userMessages = userMessages.sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);

      // Fetch other user names asynchronously
      const updatedUserMessages = await Promise.all(userMessages.map(async (chat) => {
        const nameRef = ref(database, `users/${chat.otherUserId}`);
        const nameSnapshot = await new Promise((resolve) => onValue(nameRef, resolve, { onlyOnce: true }));
        const result = nameSnapshot.exists() ? Object.values(nameSnapshot.val()) : [];
        return { ...chat, otherUserName: result[0] };
      }));

      dispatch({ type: "FETCH_USER_MESSAGES", payload: { userMessages: updatedUserMessages } });
    });
  };
}

// Function to fetch userMessages
export function fetchPendingHost() {
  return async (dispatch) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const pendingHostRef = ref(database, `users/${user.uid}/pendingHost`);
    const unsubscribe = onValue(pendingHostRef, async (snapshot) => {
      let pendingHost = snapshot.exists() ? snapshot.val() : {};
      let pendingHostTotalCount = Object.values(pendingHost).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      // console.log('pendingHost', pendingHost)
      dispatch({ type: "FETCH_PENDING_HOST", payload: { pendingHost, pendingHostTotalCount } });
    });

    // Return the unsubscribe function to allow the caller to remove the listener when necessary
    return () => {
      off(pendingHostRef, '', unsubscribe);
    };
  };
}

// Function to fetch spaceTypes
export function fetchSpaceTypes() {
  return (dispatch) => {
    const dbRef = ref(database, 'system/spacetypes/');
    get(dbRef).then((snapshot) => {
      let spaceTypes = [];
      if (snapshot.exists()) {
        spaceTypes = Object.values(snapshot.val());
      }
      dispatch({ type: "FETCH_SYS_SPACETYPES", payload: { spaceTypes } });
    });
  };
}


// Function to fetch booking - DETAILED (1R)
export function fetchBooking(bookingId) {
  return (dispatch) => {
    const bookingRef = doc(collection(firestore, 'bookings'), bookingId);

    const listener = onSnapshot(bookingRef, (snapshot) => {
      console.log("NUMBER OF READS (fetchBooking): 1")
      if (snapshot.exists()) {
        let selectedBooking = snapshot.data();
        // Convert all Timestamps, including nested ones, to ISO strings
        selectedBooking = convertTimestampsToIsoStrings(selectedBooking);
        dispatch({ type: "SET_SELECTED_BOOKING", payload: { selectedBooking } });
      } else {
        console.log('Error fetching booking')
      }
    });
    return listener
  };
}
// Function to update booking (BOOKING-U)
// Function to delete a booking (BOOKING-D) (XR+XW+2W) => XR depends on allspacesavailability (number of dates involved)
export async function cancelBooking(bookingId) { //booking, space) { // TRANSACTION-ED
  const CFcancelBooking = httpsCallable(functions, 'cancelBooking');
  const inputs = { bookingId }
  // console.log(inputs)
  return CFcancelBooking(inputs)
    .then(() => console.log("BOOKING DELETED SUCCESSFULLY!"))
    .catch((e) => Promise.reject("BOOKING DELETION ERROR: " + e))
}

//Function to fetch spaceavailability (for Hosts)
export function fetchSpaceAvailability(spaceId) {
  return async (dispatch) => {
    const spaceAvailabilityRef = collection(doc(firestore, 'spaces', spaceId), 'spaceavailability');

    try {
      const snapshot = await getDocs(spaceAvailabilityRef);
      console.log("NUMBER OF READS (fetchSpaceAvailability):", snapshot.docs.length);

      let spaceAvailability = {};
      snapshot.docs.forEach((doc) => {
        spaceAvailability = { ...spaceAvailability, ...doc.data() };
      });
      delete spaceAvailability.allSpacesDocNum;
      delete spaceAvailability.spaceType;

      return dispatch({ type: 'SET_SPACE_AVAILABILITY', payload: { spaceAvailability } });
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };
}

//Function to fetch spacebookings (for Hosts)
export function fetchSpaceBookings(spaceId) {
  return async (dispatch) => {
    const spaceBookingsRef = collection(doc(firestore, 'spaces', spaceId), 'spacebookings');

    try {
      const unsubscribe = onSnapshot(spaceBookingsRef, (snapshot) => {
        console.log("NUMBER OF READS (fetchSpaceBookings):", snapshot.docs.length);
        if (!snapshot.empty) {
          let spaceBookings = {};
          snapshot.docs.forEach((doc) => {
            spaceBookings = { ...spaceBookings, ...doc.data() };
          });
          spaceBookings = convertTimestampsToIsoStrings(spaceBookings)
          const spaceBookingsArray = Object.values(spaceBookings);
          dispatch({ type: 'SET_SPACE_BOOKINGS', payload: { spaceBookingsArray } });
        } else {
          console.log('No space bookings found');
          dispatch({ type: "SET_SPACE_BOOKINGS", payload: { spaceBookingsArray: [] } });
        }
      });
      // Return the unsubscribe function to remove the listener when needed
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching user hosting logs:', error);
      // dispatch({ type: "FETCH_USER_HOSTING_LOGS", payload: { error: error.message } });
    }
  }
}

// Function to update blocked dates
export async function updateBlocked(spaceId, updatedEvents) {
  const CFupdateBlocked = httpsCallable(functions, 'updateBlocked');
  const inputs = { spaceId, updatedEvents }
  // console.log(inputs)
  return CFupdateBlocked(inputs)
    .then(() => console.log("BLOCKED DATES UPDATED SUCCESSFULLY!"))
    .catch((e) => Promise.reject('Sorry, an error occured. Please try again later.'))
  //Promise.reject("BLOCKED DATES UPDATING ERROR: " + e))
}

// Function to update new availabilities
export async function newAvailability() {
  const CFnewAvailability = httpsCallable(functions, 'newAvail');
  // const inputs = { spaceId, updatedEvents }
  // console.log(inputs)
  return CFnewAvailability()
    .then(() => console.log("NEW AVAILABILITY UPDATED SUCCESSFULLY!"))
    .catch((e) => Promise.reject("NEW AVAILABILITYS UPDATING ERROR: " + e))
}

// Function to create new review / update previous review
export async function createReview(spaceId, review, rating) {
  const CFcreateReview = httpsCallable(functions, 'createReview');
  const inputs = { spaceId, review, rating }
  // console.log(inputs)
  return CFcreateReview(inputs)
    .then(() => console.log("NEW REVIEW CREATED SUCCESSFULLY!"))
    .catch((e) => Promise.reject("NEW REVIEW CREATION ERROR: " + e))
}

// Function to send message (firebase database)
export async function createMessage(receiverId, _id, text) {
  const senderId = auth.currentUser.uid;
  const chatId = getChatId(senderId, receiverId);

  const chatSenderRef = ref(database, `chatrooms/${senderId}/${chatId}`);
  const chatReceiverRef = ref(database, `chatrooms/${receiverId}/${chatId}`);
  const messageRef = ref(database, `messages/${chatId}/${_id}`);

  const messageObj = {
    _id,
    text,
    createdAt: RTDBServerTimestamp(),
    user: {
      _id: senderId
    },
  };

  set(chatSenderRef, {
    chatId,
    otherUserId: receiverId,
    lastMessage: messageObj,
  });
  set(chatReceiverRef, {
    chatId,
    otherUserId: senderId,
    lastMessage: messageObj,
    unread: increment(1)
  });
  set(messageRef, messageObj);
}

// Function to read message (firebase database)
export async function readMessage(senderId) {
  const receiverId = auth.currentUser.uid;
  const chatId = getChatId(senderId, receiverId);
  const chatReceiverRef = ref(database, `chatrooms/${receiverId}/${chatId}`);

  update(chatReceiverRef, { unread: 0 });
}

/////////////////////////////////////////////////////////////////////////////
export async function getPaymentSheet(topUpAmount) {
  const CFgetPaymentSheet = httpsCallable(functions, 'getPaymentSheet');
  const inputs = { topUpAmount }
  // console.log(inputs)
  return CFgetPaymentSheet(inputs)
    .then((result) => {
      console.log("PAYMENT SHEET OBTAINED SUCCESSFULLY!")
      // console.log(result)
      return result.data
    })
    .catch((e) => Promise.reject("PAYMENT SHEET ERROR: " + e))
}

export async function getPublicKey() {
  const CFgetPublicKey = httpsCallable(functions, 'getPublicKey');
  return CFgetPublicKey()
    .then((result) => {
      console.log("PUBLIC KEY OBTAINED SUCCESSFULLY!");
      return result.data;
    })
    .catch((e) => {
      console.error("PUBLIC KEY ERROR:", e);
      return Promise.reject(e);
    });
}

export async function getAccountLink() {
  const CFgetAccountLink = httpsCallable(functions, 'getAccountLink');
  return CFgetAccountLink()
    .then((result) => {
      console.log("ACCOUNT LINK OBTAINED SUCCESSFULLY!");
      return result.data;
    })
    .catch((e) => {
      console.error("ACCOUNT LINK ERROR:", e);
      return Promise.reject(e);
    });
}

/////////////////////////////////////////////////////////////////////////////

// Helper functions
const uploadImage = async (uri, spaceId, i) => {
  let childPath;
  if (spaceId === '' && i === '') {
    childPath = `users/${auth.currentUser.uid}/avatar/0`;
  } else {
    childPath = `users/${auth.currentUser.uid}/spaces/${spaceId}/images/${i}`;
  }

  const storagePath = storageRef(storage, childPath);

  if (uri) {
    const blob = await uriToBlob(uri);
    return uploadBytes(storagePath, blob, {
      contentType: 'image/png',
    })
      .then(() => console.log(`Image ${i + 1} uploaded`, uri))
      .catch((e) => {
        console.log(`Image ${i + 1} failed to be uploaded`, e)
        return Promise.reject(`Image ${i + 1} failed to be uploaded.` + e)
      });
  } else {
    return deleteObject(storagePath);
  }
};

export function calcPeriodPriceExclFees(start, end, price, peakPrice, offPeakPrice, openingHours) {
  let total = 0;
  let current = start
  if (openingHours) {
    while (current < end) {
      const date = new Date(current);
      const dayOfWeek = date.getUTCDay(); // Sunday = 0, Monday = 1, .... Saturday = 6
      const currentHour = date.getUTCHours();
      const index = dayOfWeek * 24 + currentHour
      const priceType = openingHours[index];
      if (priceType === 1) {
        total += price;
      } else if (priceType === 2) {
        total += peakPrice;
      } else if (priceType === 3) {
        total += offPeakPrice;
      }
      current += 60 * 60 * 1000
    }
  }
  return total;
}

export const camelToFlat = (camel) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")

  let flat = ""

  camelCase.forEach(word => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
  })
  return flat
}

// Support functions
function keepNum(num, obj) {
  for (let key in obj) {
    if (!isNaN(obj[key]) && obj[key] !== num) {
      delete obj[key];
    }
  }
  return obj;
}

const toIntArray = (arr) => arr.map(Number);
function getTimeSlots(start, end) {
  let timeSlots = []
  for (let i = start; i < end; i += 3600000) {
    timeSlots.push(i) // getting array of starting time for each selected timeslots in UTC milliseconds
  }
  console.log("Timeslots are:", timeSlots)
  return timeSlots
}

// Function Archives
export const clearSelectedSpace = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_SELECTED_SPACE',
    });
  };
};

export const clearSelectedBooking = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_SELECTED_BOOKING',
    });
  };
};


// Function to compare similarity between 2 strings
// https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
export function similarity(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  let costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// Sorting sender/receipient ids by alphabetic order
export function getChatId(a, b) {
  if (a.localeCompare(b, 'en-US') == -1) {
    return a + b
  } else {
    return b + a
  }
}

export const uriToBlob = async (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response)
    }
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)

    xhr.send(null)
  })
}

export function getTimingDiffFromUTC() {
  const date = new Date();
  const timeZoneOffsetInMinutes = date.getTimezoneOffset();
  const timeZoneOffsetInHours = -(timeZoneOffsetInMinutes / 60);
  return timeZoneOffsetInHours
}
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////

export async function getCancelByHours(setCancelByHours, spaceCancellationPolicy) {
  get(ref(database, 'system/cancellationPolicy'))
    .then((snapshot) => {
      const cancellationPolicy = snapshot.val();
      const cancellationPolicyArr = Object.entries(cancellationPolicy)
        .find(([key, _]) => key === spaceCancellationPolicy);
      const numberOfHours = cancellationPolicyArr?.[1]?.numberOfHours;
      setCancelByHours(numberOfHours);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getAvatarLink(userId) {
  return `https://firebasestorage.googleapis.com/v0/b/${process.env.EXPO_PUBLIC_FB_projectId}.appspot.com/o/users%2F${userId}%2Favatar%2F0?alt=media`
}

export const showOfflineAlert = () => {
  Alert.alert(
    'Device is offline',
    'Please check your internet connection',
    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );
};

// Helper function to convert Timestamp fields to ISO strings
function convertTimestampsToIsoStrings(obj) {
  if (obj instanceof Timestamp) {
    return obj.toDate().toISOString();
  } else if (Array.isArray(obj)) {
    return obj.map(convertTimestampsToIsoStrings);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, convertTimestampsToIsoStrings(value)])
    );
  } else {
    return obj;
  }
}

export function getRating(ratingCount, ratingTotal) {
  let rating
  if (ratingCount == 0) {
    rating = 0
  } else {
    rating = (ratingTotal / ratingCount).toFixed(2)
  }
  return rating
}