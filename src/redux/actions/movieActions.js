import API from '../../utils/api';
import { setAlert } from './alertActions';

// Action Types
export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
// In movieActions.js or wherever appropriate
export const FETCH_MOVIE_DETAILS_FAIL = 'FETCH_MOVIE_DETAILS_FAIL';
// In movieActions.js or wherever appropriate
export const FETCH_MOVIES_FAIL = 'FETCH_MOVIES_FAIL';

export const FETCH_MOVIE_DETAILS_REQUEST = 'FETCH_MOVIE_DETAILS_REQUEST';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';
export const FETCH_MOVIE_DETAILS_FAILURE = 'FETCH_MOVIE_DETAILS_FAILURE';

export const CREATE_MOVIE_REQUEST = 'CREATE_MOVIE_REQUEST';
export const CREATE_MOVIE_SUCCESS = 'CREATE_MOVIE_SUCCESS';
export const CREATE_MOVIE_FAILURE = 'CREATE_MOVIE_FAILURE';

export const UPDATE_MOVIE_REQUEST = 'UPDATE_MOVIE_REQUEST';
export const UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS';
export const UPDATE_MOVIE_FAILURE = 'UPDATE_MOVIE_FAILURE';

// Fetch all movies
export const fetchMovies = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MOVIES_REQUEST });

    const { data } = await API.get('/movies');
    
    dispatch({
      type: FETCH_MOVIES_SUCCESS,
      payload: data
    });

  } catch (err) {
    const error = err.response?.data?.message || 'Failed to fetch movies';
    
    dispatch({
      type: FETCH_MOVIES_FAILURE,
      payload: error
    });

    dispatch(setAlert(error, 'error'));
  }
};

// Fetch single movie details
export const fetchMovieDetails = (movieId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MOVIE_DETAILS_REQUEST });

    const { data } = await API.get(`/movies/${movieId}`);
    
    dispatch({
      type: FETCH_MOVIE_DETAILS_SUCCESS,
      payload: data
    });

  } catch (err) {
    const error = err.response?.data?.message || 'Failed to fetch movie details';
    
    dispatch({
      type: FETCH_MOVIE_DETAILS_FAILURE,
      payload: error
    });

    dispatch(setAlert(error, 'error'));
  }
};

// Admin: Create new movie
export const createMovie = (movieData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MOVIE_REQUEST });

    const { data } = await API.post('/movies', movieData);
    
    dispatch({
      type: CREATE_MOVIE_SUCCESS,
      payload: data
    });

    dispatch(setAlert('Movie created successfully', 'success'));
    return data;

  } catch (err) {
    const error = err.response?.data?.message || 'Failed to create movie';
    
    dispatch({
      type: CREATE_MOVIE_FAILURE,
      payload: error
    });

    dispatch(setAlert(error, 'error'));
    throw err;
  }
};

// Admin: Update movie
export const updateMovie = (movieId, movieData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MOVIE_REQUEST });

    const { data } = await API.put(`/movies/${movieId}`, movieData);
    
    dispatch({
      type: UPDATE_MOVIE_SUCCESS,
      payload: data
    });

    dispatch(setAlert('Movie updated successfully', 'success'));
    return data;

  } catch (err) {
    const error = err.response?.data?.message || 'Failed to update movie';
    
    dispatch({
      type: UPDATE_MOVIE_FAILURE,
      payload: error
    });

    dispatch(setAlert(error, 'error'));
    throw err;
  }
};

// Helper function for admin actions
export const adminMovieAction = (action, movieData, movieId = null) => async (dispatch) => {
  switch (action) {
    case 'create':
      return dispatch(createMovie(movieData));
    case 'update':
      return dispatch(updateMovie(movieId, movieData));
    default:
      throw new Error('Invalid admin action');
  }
};