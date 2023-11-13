import { useState, useEffect, useRef, useContext, useMemo, useCallback} from 'react'
import './App.css'

const labels= [{
  name: "To Do",
},{
  name: "In Progress",
},{
  name: "In Review",
},{
  name: "Done",
},{
  name: "Closed",
}];

type TodoType = {
  name : string,
  status?: string,
}

function App() {
  
  useEffect(() => {
    const todos = localStorage.getItem('todos')
    if (todos) {
      setTodos(JSON.parse(todos))
    }
    console.log(todos)
  }
  , [])
  const [todos, setTodos] = useState<TodoType[]>([]);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  const todoInput = useRef<HTMLInputElement>(null);
  const handleAddTodo = useCallback(() => {
    const todo = todoInput.current
    if (todo) {
      const newTodos = [...todos, {
        name: todo.value,
        status: labels[0].name
      }]
      setTodos(newTodos)
      todo.value = ''
    }
  }, [todos])

  const handleStatusChange = (e: any) => {
    const status = e.target.value
    const todo = e.target.parentNode.parentNode
    const todoName = todo.firstChild
    const newTodos = todos.map((todo) => {
      if (todo.name === todoName.textContent) {
        return {
          ...todo,
          status
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleDeleteTodo = (e: any) => {
    const todo = e.target.parentNode.parentNode
    const todoName = todo.firstChild
    const newTodos = todos.filter((todo) => todo.name !== todoName.textContent)
    setTodos(newTodos)
  }

  
  
  

  return (
    <>
      <div className='input-todo'>
        <input type="text" id="todo" placeholder="Enter Todo" ref={todoInput} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className='container'>
      {labels.map((label, i) => (
        <div className='blocks' key={i}>
          <div className='header'>
            <h2>{label.name}</h2>
          </div>
          <div className='todos'>
            {todos.map((todo, j) => {
              if (todo.status === label.name) {
                return (
                  <div className='todo' key={j}>
                    <p>{todo.name}</p>
                    <div className='action'>
                      <select name="status" id="status" onChange={handleStatusChange} defaultValue={todo.status}>
                        {labels.map((label, k) => (
                          <option key={k} value={label.name}>{label.name}</option>
                        ))}
                      </select>
                      <button onClick={handleDeleteTodo}>
                        Delete
                      </button>
                    </div>
                  </div>
                )
              }
            }
            )}
          </div>
        </div>
      ))}
      </div>
    </>
  )
}

export default App
