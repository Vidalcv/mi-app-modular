import React from 'react';
import '../TodoList/TodoList.css';

const TodoItem = ({ task, onToggleComplete, onDeleteTask }) => {
    const completed = task.isCompleted ?? task.isComplete ?? task.completed ?? false;

    return (
        <li key={task.id} className={`todo-item ${completed ? 'completed' : ''}`}>
            <span
                className="todo-text"
                onClick={onToggleComplete}
            >
                {task.text}
            </span>
            <div className="todo-actions">
                <button
                    type="button"
                    className={`icon-btn ${completed ? 'checked' : ''}`}
                    onClick={onToggleComplete}
                    aria-label={completed ? 'Marcar como no completada' : 'Marcar como completada'}
                    title="Marcar completada"
                >
                    {completed ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    )}
                </button>

                <button
                    type="button"
                    className="icon-btn delete"
                    onClick={() => onDeleteTask(task.id)}
                    aria-label="Eliminar tarea"
                    title="Eliminar tarea"
                >
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
    );
};

export default TodoItem;
