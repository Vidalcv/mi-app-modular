import React from 'react';
import './Header.css'; // Estilos del header
import ThemeSwitcher from '../ThemeSwitcher';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-nav">
        <h1 className="app-title">
          <span className="cat-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="28" height="28" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7b61ff" />
                  <stop offset="100%" stopColor="#00c6ff" />
                </linearGradient>
              </defs>
              {/* ears */}
              <path d="M12 18 L22 6 L28 20 Z" fill="url(#catGrad)" opacity="0.95" />
              <path d="M52 18 L42 6 L36 20 Z" fill="url(#catGrad)" opacity="0.95" />
              {/* face */}
              <circle cx="32" cy="32" r="18" fill="url(#catGrad)" opacity="0.95" />
              {/* eyes */}
              <circle cx="24" cy="30" r="3" fill="#fff" />
              <circle cx="40" cy="30" r="3" fill="#fff" />
              {/* nose */}
              <path d="M32 34 L30 38 L34 38 Z" fill="#fff" />
            </svg>
          </span>
          <span className="app-title-text">Mi Aplicación Modular</span>
        </h1>
      </div>

      <nav className="main-nav" aria-label="Principal">
        <Link to="/">Inicio</Link>
        <Link to="/tareas">Tareas</Link>
        <Link to="/directorio">Directorio</Link>
      </nav>

      <div className="header-actions">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;