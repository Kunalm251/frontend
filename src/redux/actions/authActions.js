import axios from 'axios';
import { setAuthToken } from '../../utils/api';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGOUT = 'LOGOUT';

// Load User (Check if token is valid)
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth/me');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth/signup', formData, config);
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response?.data?.errors || [{ msg: 'Registration failed' }];
    
    dispatch({
      type: REGISTER_FAIL,
      payload: errors
    });

    throw errors; // Re-throw for form handling
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email, password });
    
    const res = await axios.post('/api/auth/login', body, config);
    
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });

    return { success: true }; // Return success status
    
  } catch (err) {
    const error = err.response?.data?.message || 'Login failed';
    
    dispatch({
      type: 'LOGIN_FAIL',
      payload: error
    });

    return { success: false, error }; // Return error status
  }
};

// Logout / Clear Auth
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('token');
};