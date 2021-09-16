import './App.css';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTodos, selectFilter, selectIsEditing } from './redux/selectors.js'
import AddTodo from './containers/AddTodo.js'
import DeleteTodo from './containers/DeleteTodo.js'
import ToggleTodo from './containers/ToggleTodo.js'
import FilterTodo from './containers/FilterTodo.js'
import EditTodo from './containers/EditTodo.js'
import EditArea from './containers/EditArea.js'
import ClearTodos from './containers/ClearTodos.js'

function App() {
  const todos = useSelector(selectTodos)
  const filter = useSelector(selectFilter)
  const isEditing = useSelector(selectIsEditing)
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    switch (filter) {
      case "done": {
        setFilteredTodos(todos.filter((todo) => todo.isDone));
        break
      }
      case "not": {
        setFilteredTodos(todos.filter((todo) => !todo.isDone));
        break
      }
      default: {
        setFilteredTodos(todos);
      }
    }
  },[todos,filter])

  return (
    <div className="App">
      <AddTodo />
      <ClearTodos />
      <FilterTodo />
      { isEditing && <EditArea /> }
      <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>
          {todo.isDone ? '👌' : ''}{todo.name}
          <EditTodo id={todo.id} name={todo.name} />
          <ToggleTodo id={todo.id} isDone={todo.isDone} />
          <DeleteTodo id={todo.id} />
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
