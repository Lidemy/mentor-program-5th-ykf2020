import { toggleIsEditing, setEditedTodo } from '../redux/actions.js'
import { selectIsEditing } from '../redux/selectors.js'
import { useDispatch, useSelector } from 'react-redux'
import EditTodo from '../components/EditTodo.js'

export default function({ id, name }) {
  const isEditing = useSelector(selectIsEditing)
  const dispatch = useDispatch()
  return (
    <EditTodo
      id={id}
      name={name}
      isEditing={isEditing}
      setEditedTodo={(payload) => dispatch(setEditedTodo(payload.id, payload.name))}
      toggleIsEditing={() => dispatch(toggleIsEditing())}
    />
  )
}
