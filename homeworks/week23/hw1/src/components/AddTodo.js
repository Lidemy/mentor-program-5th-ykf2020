import { useState } from 'react'
export default function AddTodo({ addTodo }) {
  const [inputValue, setInputValue] = useState('')
  return (
    <>
    <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
    <button onClick = {() => {addTodo(inputValue); setInputValue('')  }}>add Todo</button>
    </>
  )
}
