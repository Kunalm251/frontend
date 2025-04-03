import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import bookingReducer from './bookingReducer';
import { LOGOUT } from '../actions/authActions';

// Combine all reducers
const appReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  bookings: bookingReducer,
  // Add other reducers here
});

/**
 * Root reducer with state reset on logout
 * @param {Object} state - Current Redux state
 * @param {Object} action - Dispatched action
 * @returns {Object} New state
 */
const rootReducer = (state, action) => {
  // Clear all state on logout except router
  if (action.type === LOGOUT) {
    // Preserve router state if using connected-react-router
    const { router } = state;
    return appReducer({ router }, action);
  }

  return appReducer(state, action);
};

export default rootReducer;