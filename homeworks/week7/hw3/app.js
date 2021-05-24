/* eslint-disable */
const todo_input = document.querySelector('.todo-input')
const todo_button = document.querySelector('.todo-button')
const todos = document.querySelector('.todos')
const complete_button = document.querySelector('.complete_btn')
const delete_button = document.querySelector('.delete_btn')
const filter = document.querySelector('.filter')

todo_button.addEventListener('click',addTodo)
todos.addEventListener('click',todoAction)
filter.addEventListener('change',filterAction)

function addTodo(e){

  e.preventDefault()
  value = todo_input.value

  const todo = document.createElement('div')
  todo.classList.add('todo')

  const todo_content = document.createElement('li')
  todo_content.innerText = value

  const complete_button = document.createElement('button')
  complete_button.innerHTML = '<i class="fas fa-check"></i>'
  complete_button.classList.add('complete_btn')

  const delete_button = document.createElement('button')
  delete_button.innerHTML = '<i class="fas fa-trash">'
  delete_button.classList.add('delete_btn')

  todo.appendChild(todo_content)
  todo.appendChild(complete_button)
  todo.appendChild(delete_button)

  todos.appendChild(todo)

  todo_input.value = ''

  filterAction()
}

function todoAction(e){
  if (e.target.classList[0]==='complete_btn') {
    e.target.parentElement.classList.toggle('completed')
    filterAction()
  }
  if (e.target.classList[0]==='delete_btn') {
    const todo = e.target.parentElement
    const todos = e.target.parentElement.parentElement
    todo.classList.add('gone')
    todo.addEventListener('webkitTransitionEnd',function(){
      todo.remove()
      filterAction()
    })

  }
}

function filterAction(e){
  const all_todos = todos.childNodes
  all_todos.forEach((all_todo) => {
    switch(filter.value){
      case "all":
        all_todo.style['display'] = "flex"
        break;
      case "completed":
        if(all_todo.classList.contains('completed')){
          all_todo.style['display'] = "flex"
        } else {
          all_todo.style['display'] = "none"
        }
        break;
      case "uncompleted":
        if(!all_todo.classList.contains('completed')){
          all_todo.style['display'] = "flex"
        } else {
          all_todo.style['display'] = "none"
        }
        break;
    }
  })
}
