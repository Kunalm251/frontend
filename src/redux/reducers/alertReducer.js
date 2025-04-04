const initialState = {
    message: null,
    type: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ALERT':
        return {
          ...state,
          message: action.payload.message,
          type: action.payload.type
        };
      case 'CLEAR_ALERT':
        return {
          ...state,
          message: null,
          type: null
        };
      default:
        return state;
    }
  };