import React, { useState, useEffect } from 'react'; // <-- Añade useEffect
import { db } from '../../firebaseConfig'; // <-- Importa nuestra config
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"; // <-- Importa funciones de Firestore
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';


const TodoList = () => {
    const [tasks, setTasks] = useState([]);

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const collectionRef = collection(db, "tasks");

        // 2. Creamos una consulta (query) para ordenar las tareas por fecha
        const q = query(collectionRef, orderBy("createdAt", "asc"));

        // 3. onSnapshot es el ¡ESCUCHADOR EN TIEMPO REAL!
        // Se dispara una vez al inicio y luego CADA VEZ que los datos cambian
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newTasks = [];
            querySnapshot.forEach((doc) => {
                newTasks.push({
                    ...doc.data(),
                    id: doc.id // El ID del documento es importante
                });
            });
            setTasks(newTasks); // Actualizamos nuestro estado de React
        });
        return () => unsubscribe(); // Limpiamos el escuchador al desmontar el componente
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        await addDoc(collection(db, "tasks"), {
            text: inputValue,
            isCompleted: false,
            createdAt: serverTimestamp()
        });

        setInputValue('');
    };

    // Now receives the whole task object (we bind it when rendering TodoItem)
    const handleToggleComplete = async (task) => {
        if (!task || !task.id) return;
        const taskRef = doc(db, "tasks", task.id);
        const current = task.isCompleted ?? task.isComplete ?? task.completed ?? false;
        await updateDoc(taskRef, {
            isCompleted: !current
        });
    };

    const handleDeleteTask = async (id) => {
        const taskRef = doc(db, "tasks", id);
        await deleteDoc(taskRef);
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
                  <TodoItem 
                    key={task.id}
                    task={task}
                    // Pasa la función correctamente: bind the task object
                    onToggleComplete={() => handleToggleComplete(task)}
                    onDeleteTask={handleDeleteTask}
                  />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;