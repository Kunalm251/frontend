import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../redux/actions/alertActions';
import './Alert.css';

const Alert = () => {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  if (!alert.message) return null;

  return (
    <div className={`alert alert-${alert.type}`}>
      {alert.message}
      <button 
        className="close-btn"
        onClick={() => dispatch(clearAlert())}
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;