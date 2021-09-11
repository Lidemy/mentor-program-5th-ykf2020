export default function FilterTodo({ filter, filterTodo }){
  return (
    <form>
      <select value={filter} onChange={e => filterTodo(e.target.value)} >
        <option value='all' >ALL</option>
        <option value='done'>DONE</option>
        <option value='not'>NOT DONE YET</option>
      </select>
    </form>
  )
}
