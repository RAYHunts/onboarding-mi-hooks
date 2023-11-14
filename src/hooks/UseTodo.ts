import { useEffect, useState } from 'react';

type Todo = {
    id: number;
    name: string;
    status: string;
};

type UseTodo = {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
};

export const useTodo = (): UseTodo => {
    const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem("todos") || "[]"));
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
      , [todos]);
    return {
        todos,
        setTodos,
    };
};