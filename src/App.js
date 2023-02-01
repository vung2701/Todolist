import { useStore, actions } from "./store";
import { useState, useRef, useCallback } from "react";
import { debounce } from "lodash";


function App() {
  const [state, dispatch] = useStore()
  const {todos, todoInput} = state
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState(0)
  const todoRef = useRef()

  const handleSetTodo = (e) => {
    dispatch(actions.setTodo(e.target.value))
    debounceSet(e);
  }

  const debounceSet = useCallback(
    debounce(e => console.log(e.target.value), 2000),
    []
  ) 

  const handleAdd = () => {
    dispatch(actions.addTodo(todoInput))
    dispatch(actions.setTodo(''))

    todoRef.current.focus();
  }

  const handleSelect = (index) => {
    setShow(true)
    dispatch(actions.setTodo(todos[index]))
    todoRef.current.focus();
    setSelected(index)
  }

  const handleChange = () => {
    setShow(false)
    dispatch(actions.setTodo(''))
    dispatch(actions.changeTodo({selected, todoInput}))

    todoRef.current.focus();
  }

  return (
    <div>
      <input 
        value={todoInput}
        ref={todoRef}
        placeholder="Enter todo..."
        onChange={handleSetTodo}
      />
      {
        
        show 
        ? <button onClick={handleChange}>Edit</button> 
        : <button onClick={handleAdd}>Add</button>
      }
      
      <ul>
        {todos.map((todo, index) => (
          <li 
            key={index}
            onDoubleClick={() => handleSelect(index)}
          >
            {todo}
            <span onClick={index => dispatch(actions.deleteTodo(index))}>&times;</span>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default App;
