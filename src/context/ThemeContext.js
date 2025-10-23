import React,{createContext,useState} from "react";

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
});
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');// Estado para el tema
    // Función para alternar entre temas
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    // Proveer el contexto a los componentes hijos
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}; 
export default ThemeContext;