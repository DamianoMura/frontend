// src/main.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import global styles
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import './index.css'; // Basic resets and utilities
import './styles/global.css'; // Custom global styles

// Import main App component
import App from './App.jsx';

/**
 * Render the React application inside the root element
 * Wrapped with StrictMode for highlighting potential problems
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
