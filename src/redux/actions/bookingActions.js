import axios from 'axios';

// Action Types
export const CREATE_BOOKING_REQUEST = 'CREATE_BOOKING_REQUEST';
export const CREATE_BOOKING_SUCCESS = 'CREATE_BOOKING_SUCCESS';
export const CREATE_BOOKING_FAIL = 'CREATE_BOOKING_FAIL';
export const GET_USER_BOOKINGS_REQUEST = 'GET_USER_BOOKINGS_REQUEST';
export const GET_USER_BOOKINGS_SUCCESS = 'GET_USER_BOOKINGS_SUCCESS';
export const GET_USER_BOOKINGS_FAIL = 'GET_USER_BOOKINGS_FAIL';
export const CANCEL_BOOKING_REQUEST = 'CANCEL_BOOKING_REQUEST';
export const CANCEL_BOOKING_SUCCESS = 'CANCEL_BOOKING_SUCCESS';
export const CANCEL_BOOKING_FAIL = 'CANCEL_BOOKING_FAIL';

// Create New Booking
export const createBooking = (movieId, seats, showtime) => async (dispatch) => {
  dispatch({ type: CREATE_BOOKING_REQUEST });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    const body = JSON.stringify({ movieId, seats, showtime });

    const res = await axios.post('/api/bookings', body, config);
    
    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: res.data
    });

    return res.data; // Return booking data for redirection
  } catch (err) {
    const error = err.response?.data?.message || 'Booking failed';
    
    dispatch({
      type: CREATE_BOOKING_FAIL,
      payload: error
    });

    throw error;
  }
};

// Get User Bookings
export const getUserBookings = () => async (dispatch) => {
  dispatch({ type: GET_USER_BOOKINGS_REQUEST });

  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    const res = await axios.get('/api/bookings', config);
    
    dispatch({
      type: GET_USER_BOOKINGS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const error = err.response?.data?.message || 'Failed to load bookings';
    
    dispatch({
      type: GET_USER_BOOKINGS_FAIL,
      payload: error
    });
  }
};

// Cancel Booking
export const cancelBooking = (bookingId) => async (dispatch) => {
  dispatch({ type: CANCEL_BOOKING_REQUEST });

  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    await axios.delete(`/api/bookings/${bookingId}`, config);
    
    dispatch({
      type: CANCEL_BOOKING_SUCCESS,
      payload: bookingId
    });
  } catch (err) {
    const error = err.response?.data?.message || 'Cancellation failed';
    
    dispatch({
      type: CANCEL_BOOKING_FAIL,
      payload: error
    });

    throw error;
  }
};





// import api from '../../utils/api';

// export const createBooking = (movieId, seats) = 