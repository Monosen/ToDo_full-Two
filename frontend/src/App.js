import { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Form from './components/form/form.component';
import TodoList from './components/todo-list/todo-list.component';

import './App.css';

const App = () => {
    // State
    const [todos, setTodos] = useState([]);

    const addTodo = async (todo) => {
        try {
            await axios.post(`${process.env.REACT_APP_URL_BASE}/todos`, {
                content: todo.content
            });

            setTodos((prevState) => [...prevState, todo]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTodos = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_URL_BASE}/todos`
            );

            const resTodos = res.data.data.todos;

            setTodos(resTodos);
        } catch (error) {
            console.log(error);
        }
    };

    const editTodo = async (id, newContent) => {
        try {
            await axios.patch(`${process.env.REACT_APP_URL_BASE}/todos/${id}`, {
                content: newContent
            });

            setTodos((prevState) => {
                const currentTodos = prevState;

                const todoIndex = currentTodos.findIndex(
                    (todo) => +todo.id === +id
                );

                const updatedTodo = currentTodos[todoIndex];

                updatedTodo.content = newContent;

                currentTodos[todoIndex] = updatedTodo;

                return [...currentTodos];
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_URL_BASE}/todos/${id}`);

            setTodos((prevState) => {
                const currentTodos = prevState;

                const updatedTodos = currentTodos.filter(
                    (todo) => +todo.id !== +id
                );

                return [...updatedTodos];
            });
        } catch (error) {
            console.log(error);
        }
    };

    // When component is mounted, fetch todos
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="app">
            <Form onAddTodo={addTodo} />
            <TodoList
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
                items={todos}
            />
        </div>
    );
};

export default App;
