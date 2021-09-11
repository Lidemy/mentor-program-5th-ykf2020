import { addTodo } from '../redux/actions.js'
import { useDispatch } from 'react-redux'
import AddTodo from '../components/AddTodo.js'

export default function() {
  const dispatch = useDispatch()
  return (
    <AddTodo addTodo={(payload) => dispatch(addTodo(payload))}/>
  )
}
