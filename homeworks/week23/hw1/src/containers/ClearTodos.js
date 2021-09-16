import { clearTodos } from '../redux/actions.js'
import { useDispatch } from 'react-redux'
import ClearTodos from '../components/ClearTodos.js'

export default function() {
  const dispatch = useDispatch()
  return (
    <ClearTodos clearTodos={() => dispatch(clearTodos())}/>
  )
}
