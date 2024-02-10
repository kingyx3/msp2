import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
// import thunk from 'redux-thunk'; // No longer needed, as it's included by default

// // Define your initial state here if needed
// const initialState = {
//   city: "",
//   startDay: "",
//   endDay: "",
//   adult: 0,
//   child: 0,
//   infant: 0,
// };

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: initialState,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(yourAdditionalMiddleware), // Only if you need additional middleware
});

export default store;

// import { createStore, applyMiddleware } from "redux";
// // import search from "./search";
// import rootReducer from "./reducer";
// import thunk from "redux-thunk";

// // const initialStore = {
// //   city: "",
// //   startDay: "",
// //   endDay: "",
// //   adult: 0,
// //   child: 0,
// //   infant: 0,
// // };

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   // initialStore,
//   applyMiddleware(...middleware)
// );

// export default store;