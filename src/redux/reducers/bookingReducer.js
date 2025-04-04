import {
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAIL,
    GET_USER_BOOKINGS_REQUEST,
    GET_USER_BOOKINGS_SUCCESS,
    GET_USER_BOOKINGS_FAIL,
    CANCEL_BOOKING_REQUEST,
    CANCEL_BOOKING_SUCCESS,
    CANCEL_BOOKING_FAIL
  } from '../actions/bookingActions';
  
  const initialState = {
    bookings: [],
    loading: false,
    error: null,
    creating: false,
    canceling: false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case CREATE_BOOKING_REQUEST:
        return {
          ...state,
          creating: true,
          error: null
        };
      case CREATE_BOOKING_SUCCESS:
        return {
          ...state,
          creating: false,
          bookings: [...state.bookings, action.payload]
        };
      case CREATE_BOOKING_FAIL:
        return {
          ...state,
          creating: false,
          error: action.payload
        };
      case GET_USER_BOOKINGS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_USER_BOOKINGS_SUCCESS:
        return {
          ...state,
          bookings: action.payload,
          loading: false
        };
      case GET_USER_BOOKINGS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case CANCEL_BOOKING_REQUEST:
        return {
          ...state,
          canceling: true,
          error: null
        };
      case CANCEL_BOOKING_SUCCESS:
        return {
          ...state,
          canceling: false,
          bookings: state.bookings.filter(
            booking => booking._id !== action.payload
          )
        };
      case CANCEL_BOOKING_FAIL:
        return {
          ...state,
          canceling: false,
          error: action.payload
        };
      default:
        return state;
    }
  };