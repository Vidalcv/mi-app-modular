import React from "react";
const Welcome = ({ nombre }) => {
    if (nombre === "Desarrollador") {
        return (
            <div>
                <h2>Bienvenido, {nombre}! eres un crack!</h2>
                <p>Este es un ejemplo de un componente modularizado</p>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Bienvenido, {nombre}!</h2>
                <p>Este es un ejemplo de un componente modularizado</p>
            </div>
        );
    }

};
export default Welcome;