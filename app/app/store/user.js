// Action types
const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
const FETCH_USER = 'FETCH_USER';
const FETCH_USER_IP_LOCATION = 'FETCH_USER_IP_LOCATION';
const FETCH_USER_SPACES = 'FETCH_USER_SPACES';
const FETCH_USER_BOOKINGS = 'FETCH_USER_BOOKINGS';
const FETCH_USER_LOGS = 'FETCH_USER_LOGS';
const FETCH_USER_HOSTING_LOGS = 'FETCH_USER_HOSTING_LOGS';
const FETCH_USER_MESSAGES = 'FETCH_USER_MESSAGES';
const FETCH_SYS_SPACETYPES = 'FETCH_SYS_SPACETYPES';
const FETCH_PENDING_HOST = 'FETCH_PENDING_HOST';

const initialStore = {
  user: {},
  userIpLocation: {},
  userSpaces: [],
  userBookings: [],
  userLogs: [],
  userHostingLogs: [],
  userMessages: [],
  spaceTypes: [],
  pendingHost: [],
  pendingHostTotalCount: 0,
};

// Action creators
export function clearSearchData() {
  return ((dispatch) => {
    dispatch({ type: CLEAR_USER_DATA })
  })
}
// export const fetchUser = (user) => {
//   return (dispatch) => {
//     dispatch({
//       type: FETCH_USER,
//       payload: {
//         user,
//       },
//     });
//   };
// };

// Reducer
const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case CLEAR_USER_DATA:
      return initialStore
    case FETCH_USER:
      return { ...state, user: action.payload.user };
    case FETCH_USER_IP_LOCATION:
      return { ...state, userIpLocation: action.payload.userIpLocation };
    case FETCH_USER_SPACES:
      return { ...state, userSpaces: action.payload.userSpaces };
    case FETCH_USER_BOOKINGS:
      return { ...state, userBookings: action.payload.userBookings };
    case FETCH_USER_LOGS:
      return { ...state, userLogs: action.payload.userLogs };
    case FETCH_USER_HOSTING_LOGS:
      return { ...state, userHostingLogs: action.payload.userHostingLogs };
    case FETCH_USER_MESSAGES:
      return { ...state, userMessages: action.payload.userMessages };
    case FETCH_SYS_SPACETYPES:
      return { ...state, spaceTypes: action.payload.spaceTypes };
    case FETCH_PENDING_HOST:
      return { ...state, pendingHost: action.payload.pendingHost, pendingHostTotalCount: action.payload.pendingHostTotalCount };
    default:
      return state;
  }
};

export default reducer;
