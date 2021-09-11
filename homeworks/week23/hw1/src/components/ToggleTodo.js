export default function ToggleTodo({ toggleTodo, id, isDone }){
  return (
    <button onClick={() => toggleTodo(id)}>{isDone ? '未完成' : '已完成'}</button>
  )
}
