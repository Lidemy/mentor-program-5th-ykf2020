import { toggleTodo } from '../redux/actions.js'
import { useDispatch } from 'react-redux'
import ToggleTodo from '../components/ToggleTodo.js'

export default function({ id, isDone }) {
  const dispatch = useDispatch()
  return (
    <ToggleTodo id={id} isDone={isDone} toggleTodo={(payload) => dispatch(toggleTodo(payload))}/>
  )
}
