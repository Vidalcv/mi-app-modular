import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeSwitcher = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);// Usar el contexto del tema

    return (
            <button onClick={toggleTheme} className="theme-switcher">
                Cambiar a modo {theme === 'light' ? 'oscuro' : 'claro'}
            </button>
    );
};

export default ThemeSwitcher;
