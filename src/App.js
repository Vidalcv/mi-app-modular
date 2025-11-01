import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ThemeContext from './context/ThemeContext';

// Importar el Layout y las Páginas
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import TodoList from './components/TodoList/TodoList';
import UserDirectory from './components/UserDirectory/UserDirectory';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tareas" element={<TodoList />} />
          <Route path="directorio" element={<UserDirectory />} />
          <Route path="*" element={<h2 style={{padding: '1.5rem'}}>Página no encontrada</h2>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
