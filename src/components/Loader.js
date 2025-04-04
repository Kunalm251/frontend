import React from 'react';
// import './Loader.css';

const Loader = ({ fullPage }) => {
  return (
    <div className={`loader-container ${fullPage ? 'full-page' : ''}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;