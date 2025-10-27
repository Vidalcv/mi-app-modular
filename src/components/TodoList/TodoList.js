import React, { useState } from 'react';
import './TodoList.css';


const TodoList = () => {
    const [tasks, setTasks] = useState([
        
    ]);

    const [inputValue, setInputValue] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setInputValue('');
    };

    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="todo-container">
            <h2 className="todo-title">Mi Lista de Tareas</h2>

            <form onSubmit={handleAddTask} className="todo-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe una nueva tarea..."
                    className="todo-input"
                />
                <button type="submit" className="todo-add-btn">＋</button>
            </form>

            <ul className="todo-list">
                {tasks.map(task => (
                    <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                        <span
                            className="todo-text"
                            onClick={() => handleToggleComplete(task.id)}
                        >
                            {task.text}
                        </span>
                        <div className="todo-actions">
                            <button
                                type="button"
                                className={`icon-btn ${task.completed ? 'checked' : ''}`}
                                onClick={() => handleToggleComplete(task.id)}
                                aria-label={task.completed ? 'Marcar como no completada' : 'Marcar como completada'}
                                title="Marcar completada"
                            >
                                {task.completed ? (
                                    // marcar  SVG
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    // desmarcar circle SVG
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                )}
                            </button>
                            <button
                                type="button"
                                className="icon-btn delete"
                                onClick={() => handleDeleteTask(task.id)}
                                aria-label="Eliminar tarea"
                                title="Eliminar tarea"
                            >
                                {/* Trash SVG */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;