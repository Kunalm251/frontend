

// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // Only here
import store from './redux/store';
import App from './App';
import './main.css';
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Only Router wrapper */}
        <App /> {/* App.js should NOT have another Router */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);