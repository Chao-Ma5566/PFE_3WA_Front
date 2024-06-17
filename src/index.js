import App from './App.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import StoreProvider from './components/StoreProvider.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
