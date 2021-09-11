import { deleteTodo } from '../redux/actions.js'
import { useDispatch } from 'react-redux'
import DeleteTodo from '../components/DeleteTodo.js'

export default function({ id }) {
  const dispatch = useDispatch()
  return (
    <DeleteTodo id={id} deleteTodo={(payload) => dispatch(deleteTodo(payload))}/>
  )
}
