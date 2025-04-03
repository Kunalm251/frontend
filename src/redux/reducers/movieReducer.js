import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAIL
} from '../actions/movieActions';

const initialState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
    case FETCH_MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false
      };
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        currentMovie: action.payload,
        loading: false
      };
    case FETCH_MOVIES_FAIL:
    case FETCH_MOVIE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};