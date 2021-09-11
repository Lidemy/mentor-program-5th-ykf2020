export default function EditArea({ editedTodo, setEditedTodo, toggleIsEditing, editTodo }){
  const handleEditTodo = () => {
    editTodo(editedTodo)
    setEditedTodo({id:'',name:''})
    toggleIsEditing()
  }
  const handleInputChange = (e) => {
    setEditedTodo({...editedTodo, name: e.target.value})
  }
  return (
    <div>
      編輯：
      <input value={editedTodo.name} onChange={handleInputChange}/>
      <button onClick={handleEditTodo}>送出</button>
      <button onClick={toggleIsEditing}>取消</button>
    </div>
  )
}
