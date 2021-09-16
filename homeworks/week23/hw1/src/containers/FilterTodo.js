import { filterTodo } from '../redux/actions.js'
import { useSelector } from 'react-redux'
import { selectFilter } from '../redux/selectors.js'
import { useDispatch } from 'react-redux'
import FilterTodo from '../components/FilterTodo.js'

export default function() {
  const filter = useSelector(selectFilter)
  const dispatch = useDispatch()
  return (
    <FilterTodo filter={filter} filterTodo={(payload) => dispatch(filterTodo(payload))}/>
  )
}
