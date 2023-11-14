import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FilterContext } from "./contexts/FilterContext";
import "./App.css";
import Select from "./components/Select";
import { useTodo } from "./hooks/UseTodo";

const labels = [
  {
    name: "To Do",
  },
  {
    name: "In Progress",
  },
  {
    name: "In Review",
  },
  {
    name: "Done",
  },
  {
    name: "Closed",
  },
];

type TodoType = {
  id: number;
  name: string;
  status: string;
};


function App() {
  const {todos, setTodos} = useTodo()
  const [filter, setFilter] = useState<string>("all");
  const todoInput = useRef<HTMLInputElement>(null);
  const handleAddTodo = useCallback(() => {
    const todo = todoInput.current;
    if (todo) {
      const lastId = todos[todos.length - 1]?.id || 0;
      const newTodos = [
        ...todos,
        {
          id: lastId + 1 as number,
          name: todo.value as string,
          status: "To Do",
        },
      ];
      setTodos(newTodos);
      todo.value = "";
    }
  }, [todos, setTodos])

  const handleStatusChange = (status: string, id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: status,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const hanldeFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const filterTodos = (todos: TodoType[], filter: string) => {
    if (filter === "all") {
      return todos;
    }
    return todos.filter((todo) => todo.status === filter);
  };

  const filteredTodos = useMemo(() => filterTodos(todos, filter), [todos, filter]);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  , [todos]);

  return (
    <>
      <div className="input-todo">
        <input type="text" id="todo" placeholder="Enter Todo" ref={todoInput} onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className="container">
        <div className="blocks">
          <FilterContext.Provider value={filter}>
          <div className="header">
            <h2>List</h2>
            <div>
              <Select options={labels} onChange={(e) => hanldeFilterChange(e.target.value)} />
            </div>
          </div>
          </FilterContext.Provider>
          <div className="todos">
            {filteredTodos.map((todo, i) => {
              return (
                <div className="todo" key={i}>
                  <p>{todo.name}</p>
                  <div className="action">
                    <select
                      name={`status-${todo.id}`}
                      id={`status-${todo.id}`}
                      onChange={(e) => {
                        handleStatusChange(e.target.value, todo.id);
                      }}
                      value={todo.status}
                    >
                      {labels.map((label, k) => (
                        <option key={k} value={label.name}>
                          {label.name}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => handleDeleteTodo(todo.id)
                    }>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
