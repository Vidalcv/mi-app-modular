import React, { useState, useEffect } from 'react'; // <-- Añade useEffect
import { db } from '../../firebaseConfig'; // <-- Importa nuestra config
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, getDoc, serverTimestamp } from "firebase/firestore"; // <-- Importa funciones de Firestore
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';


const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

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

    // Escuchador para el historial de tareas (creadas, completadas, eliminadas)
    useEffect(() => {
        const historyRef = collection(db, 'taskHistory');
        const qh = query(historyRef, orderBy('eventAt', 'desc'));
        const unsubHistory = onSnapshot(qh, (qs) => {
            const items = [];
            qs.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
            setHistory(items);
        });
        return () => unsubHistory();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        // 1) Crear la tarea
        const newTaskRef = await addDoc(collection(db, "tasks"), {
            text: inputValue,
            isCompleted: false,
            createdAt: serverTimestamp()
        });

        // 2) Registrar evento en el historial
        try {
            await addDoc(collection(db, 'taskHistory'), {
                taskId: newTaskRef.id,
                text: inputValue,
                event: 'creada',
                eventAt: serverTimestamp()
            });
        } catch (err) {
            console.error('No se pudo registrar el historial de creación:', err);
        }

        setInputValue('');
    };

    const handleToggleComplete = async (task) => {
        if (!task || !task.id) return;
        const taskRef = doc(db, "tasks", task.id);
        const current = task.isCompleted ?? task.isComplete ?? task.completed ?? false;
        const newState = !current;
        await updateDoc(taskRef, {
            isCompleted: newState
        });

        // Registrar evento de completado
        try {
            await addDoc(collection(db, 'taskHistory'), {
                taskId: task.id,
                text: task.text ?? '',
                event: newState ? 'completada' : 'reabierta',
                eventAt: serverTimestamp()
            });
        } catch (err) {
            console.error('No se pudo registrar el historial de completado:', err);
        }
    };

    const handleDeleteTask = async (id) => {
        const taskRef = doc(db, "tasks", id);
        try {
            // Obtener la tarea antes de borrarla para registrar su texto
            const snap = await getDoc(taskRef);
            const data = snap.exists() ? snap.data() : null;
            const text = data?.text ?? '';

            // Registrar evento de borrado
            await addDoc(collection(db, 'taskHistory'), {
                taskId: id,
                text,
                event: 'eliminada',
                eventAt: serverTimestamp()
            });

            // Finalmente borrar
            await deleteDoc(taskRef);
        } catch (err) {
            console.error('Error al borrar la tarea o registrar el historial:', err);
        }
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
                    // Pasa la función correctamente
                    onToggleComplete={() => handleToggleComplete(task)}
                    onDeleteTask={handleDeleteTask}
                  />
                ))}
            </ul>

            {/* Botón para alternar historial */}
            <div className="history-row">
                <button className="history-toggle" type="button" onClick={() => setShowHistory(s => !s)}>
                    {showHistory ? 'Ocultar historial' : `Mostrar historial (${history.length})`}
                </button>
            </div>

            {showHistory && (
                <div className="history-panel">
                    {history.length === 0 ? (
                        <div className="history-empty">No hay eventos aún.</div>
                    ) : (
                        <ul className="history-list">
                            {history.map(h => (
                                <li key={h.id} className="history-item">
                                    <div className="history-meta">
                                        <span className={`history-type ${h.event}`}>{h.event}</span>
                                        <span className="history-text">{h.text}</span>
                                    </div>
                                    <div className="history-date">{h.eventAt && h.eventAt.toDate ? h.eventAt.toDate().toLocaleString() : ''}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default TodoList;