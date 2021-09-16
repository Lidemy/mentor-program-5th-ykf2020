export default function EditTodo({ id, name, isEditing, setEditedTodo, toggleIsEditing }){
  const handleClick = () => {
    if(!isEditing){
      toggleIsEditing()
    }
    setEditedTodo({id, name})
  }
  return (
    <button onClick={handleClick}>編輯</button>
  )
}
