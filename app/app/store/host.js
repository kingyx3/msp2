// Action types
const CLEAR_HOST_DATA = 'CLEAR_HOST_DATA';
const SET_SPACE_TYPE = 'SET_SPACE_TYPE';
const SET_NUM_SPACES = 'SET_NUM_SPACES';
const SET_PRICE = 'SET_PRICE';
const SET_PEAKPRICE = 'SET_PEAKPRICE';
const SET_OFFPEAKPRICE = 'SET_OFFPEAKPRICE';
const SET_WEEKDAY_RULE = 'SET_WEEKDAY_RULE';
const SET_SATURDAY_RULE = 'SET_SATURDAY_RULE';
const SET_SUNDAY_RULE = 'SET_SUNDAY_RULE';
const SET_IMAGES = 'SET_IMAGES';
const SET_CURR_LOCATION = 'SET_CURR_LOCATION';
const SET_REVGEOCODE = 'SET_REVGEOCODE';
const SET_TITLE = 'SET_TITLE';
const SET_DESCRIPTION = 'SET_DESCRIPTION';
const SET_MONTHS_AHEAD = 'SET_MONTHS_AHEAD';
const SET_SPACE_BOOKINGS = 'SET_SPACE_BOOKINGS';
const SET_SPACE_AVAILABILITY = 'SET_SPACE_AVAILABILITY';
const SET_CANCELLATION_POLICY = 'SET_CANCELLATION_POLICY'

const initialStore = {
  spaceType: '',
  numSpaces: 0,
  price: 0,
  peakPrice: 0,
  offPeakPrice: 0,
  weekdayRule: {},
  saturdayRule: {},
  sundayRule: {},
  images: [],
  location: {},
  address: '',
  title: '',
  description: '',
  monthsAhead: 0,
  spaceBookings: [],
  spaceAvailability: [],
  cancellationPolicy: { label: 'Medium', numberOfHours: 12 }
};

// Action creators
export function clearHostData() {
  return ((dispatch) => {
    dispatch({ type: CLEAR_HOST_DATA })
  })
}

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

export const setNumSpaces = (num) => {
  return (dispatch) => {
    dispatch({
      type: SET_NUM_SPACES,
      payload: {
        num,
      },
    });
  };
};

export const setPrice = (num) => {
  return (dispatch) => {
    dispatch({
      type: SET_PRICE,
      payload: {
        num,
      },
    });
  };
};

export const setPeakPrice = (num) => {
  return (dispatch) => {
    dispatch({
      type: SET_PEAKPRICE,
      payload: {
        num,
      },
    });
  };
};

export const setOffPeakPrice = (num) => {
  return (dispatch) => {
    dispatch({
      type: SET_OFFPEAKPRICE,
      payload: {
        num,
      },
    });
  };
};

export const setWeekdayRule = (ruleset) => {
  return (dispatch) => {
    dispatch({
      type: SET_WEEKDAY_RULE,
      payload: {
        ruleset,
      },
    });
  };
};

export const setSaturdayRule = (ruleset) => {
  return (dispatch) => {
    dispatch({
      type: SET_SATURDAY_RULE,
      payload: {
        ruleset,
      },
    });
  };
};

export const setSundayRule = (ruleset) => {
  return (dispatch) => {
    dispatch({
      type: SET_SUNDAY_RULE,
      payload: {
        ruleset,
      },
    });
  };
};

export const setImages = (images) => {
  return (dispatch) => {
    // console.log(images);
    dispatch({
      type: SET_IMAGES,
      payload: {
        images,
      },
    });
  };
};

export const setCurrLocation = (location) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURR_LOCATION,
      payload: {
        location,
      },
    });
  };
};

export const setRevGeoCode = (address) => {
  return (dispatch) => {
    dispatch({
      type: SET_REVGEOCODE,
      payload: {
        address,
      },
    });
  };
};

export const setTitle = (title) => {
  return (dispatch) => {
    dispatch({
      type: SET_TITLE,
      payload: {
        title,
      },
    });
  };
};

export const setDescription = (description) => {
  return (dispatch) => {
    dispatch({
      type: SET_DESCRIPTION,
      payload: {
        description,
      },
    });
  };
};

export const setCancellationPolicy = (cancellationPolicy) => {
  return (dispatch) => {
    dispatch({
      type: SET_CANCELLATION_POLICY,
      payload: {
        cancellationPolicy,
      },
    });
  };
};

export const setMonthsAhead = (monthsAhead) => {
  return (dispatch) => {
    dispatch({
      type: SET_MONTHS_AHEAD,
      payload: {
        monthsAhead,
      },
    });
  };
};

// Reducer
const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case CLEAR_HOST_DATA:
      return initialStore;
    case SET_SPACE_TYPE:
      return { ...state, spaceType: action.payload.spaceType };
    case SET_NUM_SPACES:
      return { ...state, numSpaces: action.payload.num }
    case SET_PRICE:
      return { ...state, price: action.payload.num };
    case SET_PEAKPRICE:
      return { ...state, peakPrice: action.payload.num };
    case SET_OFFPEAKPRICE:
      return { ...state, offPeakPrice: action.payload.num };
    case SET_WEEKDAY_RULE:
      return { ...state, weekdayRule: action.payload.ruleset };
    case SET_SATURDAY_RULE:
      return { ...state, saturdayRule: action.payload.ruleset };
    case SET_SUNDAY_RULE:
      return { ...state, sundayRule: action.payload.ruleset };
    case SET_IMAGES:
      return { ...state, images: action.payload.images };
    case SET_CURR_LOCATION:
      return { ...state, location: action.payload.location };
    case SET_REVGEOCODE:
      return { ...state, address: action.payload.address };
    case SET_TITLE:
      return { ...state, title: action.payload.title };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload.description };
    case SET_MONTHS_AHEAD:
      return { ...state, monthsAhead: action.payload.monthsAhead };
    case SET_SPACE_BOOKINGS:
      return { ...state, spaceBookings: action.payload.spaceBookingsArray };
    case SET_SPACE_AVAILABILITY:
      return { ...state, spaceAvailability: action.payload.spaceAvailability };
    case SET_CANCELLATION_POLICY:
      return { ...state, cancellationPolicy: action.payload.cancellationPolicy };
    default:
      return state;
  }
};

export default reducer;
