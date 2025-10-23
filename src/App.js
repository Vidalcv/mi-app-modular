import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import TodoList from './components/TodoList/TodoList';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useContext } from 'react';
import ThemeContext from './context/ThemeContext';

function App() {
  const {theme} = useContext(ThemeContext);// Usar el contexto del tema
  return (
    <div className={`App ${theme}`}>
      <Header/>
      <ThemeSwitcher/>
      <Welcome name="Desarrollador"/>
      <main>
        <TodoList/>
      </main>
    </div>
  );
}

export default App;
