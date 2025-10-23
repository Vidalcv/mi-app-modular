import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>{/*Provee el contexto del tema a toda la aplicación*/}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
