// import axios from 'axios';

// // Set base URL for all requests
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
// });

// // Set auth token helper
// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     localStorage.setItem('token', token);
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//     localStorage.removeItem('token');
//   }
// };

// export default api;
import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/actions/authActions';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // For cookies if using them
});

/**
 * Request Interceptor
 * - Adds auth token to requests
 * - Shows loading state if needed
 */
API.interceptors.request.use(
  (config) => {
    // Get token from Redux store or localStorage
    const token = store.getState().auth.token || localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // You can add loading state here if needed
    // store.dispatch({ type: 'START_LOADING' });

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Handles successful responses
 * - Manages error responses globally
 */
API.interceptors.response.use(
  (response) => {
    // You can stop loading state here if needed
    // store.dispatch({ type: 'STOP_LOADING' });

    // Return successful response data
    return response.data;
  },
  (error) => {
    // You can stop loading state here if needed
    // store.dispatch({ type: 'STOP_LOADING' });

    // Handle different error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      switch (error.response.status) {
        case 401: // Unauthorized
          // Dispatch logout action if token is invalid/expired
          store.dispatch(logout());
          localStorage.removeItem('token');
          window.location.href = '/login?session=expired';
          break;

        case 403: // Forbidden
          // Handle insufficient permissions
          console.error('Forbidden:', error.response.data);
          break;

        case 404: // Not Found
          // Handle API endpoint not found
          console.error('Endpoint not found:', error.config.url);
          break;

        case 429: // Too Many Requests
          // Handle rate limiting
          console.error('Rate limited:', error.response.data);
          break;

        case 500: // Server Error
          // Handle server errors
          console.error('Server error:', error.response.data);
          break;

        default:
          console.error('Unhandled error status:', error.response.status);
      }

      // Return error message from server or default message
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'An unexpected error occurred';
      
      return Promise.reject({
        message: errorMessage,
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      return Promise.reject({
        message: 'No response from server. Please check your network connection.',
        status: null
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      return Promise.reject({
        message: 'Error setting up request. Please try again.',
        status: null
      });
    }
  }
);

/**
 * API Methods
 * - Organized by resource type for better maintainability
 */
const api = {
  // Auth endpoints
  auth: {
    login: (email, password) => API.post('/auth/login', { email, password }),
    register: (userData) => API.post('/auth/register', userData),
    logout: () => API.post('/auth/logout'),
    me: () => API.get('/auth/me')
  },

  // Movie endpoints
  movies: {
    getAll: () => API.get('/movies'),
    getById: (id) => API.get(`/movies/${id}`),
    create: (movieData) => API.post('/admin/movies', movieData),
    update: (id, movieData) => API.put(`/admin/movies/${id}`, movieData),
    delete: (id) => API.delete(`/admin/movies/${id}`)
  },

  // Event endpoints
  events: {
    getAll: () => API.get('/events'),
    getById: (id) => API.get(`/events/${id}`),
    create: (eventData) => API.post('/admin/events', eventData),
    update: (id, eventData) => API.put(`/admin/events/${id}`, eventData),
    delete: (id) => API.delete(`/admin/events/${id}`)
  },

  // Booking endpoints
  bookings: {
    create: (bookingData) => API.post('/bookings', bookingData),
    getUserBookings: () => API.get('/bookings'),
    getAll: () => API.get('/admin/bookings'),
    sendNotification: (bookingId) => API.post(`/admin/bookings/${bookingId}/notify`),
    cancel: (bookingId) => API.delete(`/bookings/${bookingId}`)
  },

  // User endpoints
  users: {
    getAll: () => API.get('/admin/users'),
    update: (id, userData) => API.put(`/admin/users/${id}`, userData)
  }
};

export default api;