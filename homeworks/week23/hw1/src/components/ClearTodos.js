export default function ClearTodos({ clearTodos }){
  return (
    <button onClick={() => clearTodos()}>clear all</button>
  )
}
