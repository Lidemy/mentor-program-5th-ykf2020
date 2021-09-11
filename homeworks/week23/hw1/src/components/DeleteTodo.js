export default function DeleteTodo({ deleteTodo, id }){
  return (
    <button onClick={() => deleteTodo(id)}>delete</button>
  )
}
