export const setAlert = (message, type = 'success') => ({
    type: 'SET_ALERT',
    payload: { message, type }
  });
  
  export const clearAlert = () => ({
    type: 'CLEAR_ALERT'
  });