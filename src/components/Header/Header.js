import React from 'react';
import './Header.css'; // Estilos del header
import ThemeSwitcher from '../ThemeSwitcher';

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">Mi Aplicación Modular</h1>
      <div className="header-actions">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;