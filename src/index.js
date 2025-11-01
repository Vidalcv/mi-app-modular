import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom'; // <-- Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>{/*Provee el contexto del tema a toda la aplicación*/}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
