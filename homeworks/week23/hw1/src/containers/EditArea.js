import { editTodo, toggleIsEditing, setEditedTodo } from '../redux/actions.js'
import { useDispatch, useSelector } from 'react-redux'
import { selectEditedTodo } from '../redux/selectors.js'
import EditArea from '../components/EditArea.js'

export default function() {
  const dispatch = useDispatch()
  const editedTodo = useSelector(selectEditedTodo)
  return (
    <EditArea
      editedTodo={editedTodo}
      setEditedTodo={(payload) => dispatch(setEditedTodo(payload.id, payload.name))}
      toggleIsEditing={() => dispatch(toggleIsEditing())}
      editTodo={(payload) => dispatch(editTodo(payload.id, payload.name))}
    />
  )
}
