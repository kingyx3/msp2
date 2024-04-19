// Action types
const SET_SPACE_TYPE = 'SET_SPACE_TYPE';
const SET_START = 'SET_START';
const SET_END = 'SET_END';
const SET_SELECTED_SPACE = 'SET_SELECTED_SPACE';
const SET_SELECTED_SPACES = 'SET_SELECTED_SPACES';
const SET_SPACE_SUMMARY = 'SET_SPACE_SUMMARY';
const SET_SELECTED_BOOKING = 'SET_SELECTED_BOOKING';
const CLEAR_SELECTED_SPACE = 'CLEAR_SELECTED_SPACE'
const CLEAR_SELECTED_BOOKING = 'CLEAR_SELECTED_BOOKING'

const initialStore = {
  spaceType: '',
  startDay: '',
  endDay: '',
  selectedSpace: {},
  selectedSpaces: [],
  selectedBooking: { status: "" },
  spaceSummary: {},
};

// Action creators
export const setSpaceType = (spaceType) => {
  return (dispatch) => {
    dispatch({
      type: SET_SPACE_TYPE,
      payload: {
        spaceType,
      },
    });
  };
};

export const setStart = (start) => {
  return (dispatch) => {
    dispatch({
      type: SET_START,
      payload: {
        start,
      },
    });
  };
};

export const setEnd = (end) => {
  return (dispatch) => {
    dispatch({
      type: SET_END,
      payload: {
        end,
      },
    });
  };
};

// Reducer
const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case SET_SPACE_TYPE:
      return { ...state, spaceType: action.payload.spaceType };
    case SET_START:
      return { ...state, start: action.payload.start };
    case SET_END:
      return { ...state, end: action.payload.end };
    // case ADD_ADULT:
    //   return { ...state, adult: action.payload.num };
    // case ADD_CHILD:
    //   return { ...state, child: action.payload.num };
    // case ADD_INFANT:
    //   return { ...state, infant: action.payload.num };
    case SET_SPACE_SUMMARY:
      console.log('space summary is set!')
      return { ...state, spaceSummary: action.payload.spaceSummary };
    case SET_SELECTED_SPACES:
      console.log('selected spaces is set!')
      return { ...state, selectedSpaces: action.payload.selectedSpaces };
    case SET_SELECTED_SPACE:
      console.log('selected space is set!')
      return { ...state, selectedSpace: action.payload.selectedSpace };
    case SET_SELECTED_BOOKING:
      console.log('selected booking is set!')
      return { ...state, selectedBooking: action.payload.selectedBooking };
    case CLEAR_SELECTED_SPACE:
      console.log('selected space is cleared!')
      return { ...state, selectedSpace: {} };
    case CLEAR_SELECTED_BOOKING:
      console.log('selected booking is cleared!')
      return { ...state, selectedBooking: {} };
    default:
      return state;
  }
};

export default reducer;
