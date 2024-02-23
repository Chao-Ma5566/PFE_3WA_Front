import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App.js';
import StoreProvider from './components/StoreProvider.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
