import React from 'react';
// import './ErrorMessage.css';

const Message = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{message}</p>
      <button 
        className="error-retry"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

export default Message;