/* eslint-disable camelcase, prefer-template, prefer-destructuring */
// 選取 input 輸入的值
const todo_input = document.querySelector('.todo-input')
// 選取新增按鈕
const todo_button = document.querySelector('.todo-button')
// 選取整個 ul
const todos = document.querySelector('.todos')
// 選取過濾 todo 類型用的 select 表單
const filter = document.querySelector('.filter')

todo_button.addEventListener('click', addTodo)
todos.addEventListener('click', todoAction)
filter.addEventListener('change', filterAction)
// 設定新增 todo 用的 addTodo 函式
function addTodo(e) {
  // 避免表單送出
  e.preventDefault()
  // 取得 input 中的值
  const value = todo_input.value
  // 設定新的 todo
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

  // 把設定好的 todo 加到 todos 這個 ul 中
  todos.appendChild(todo)
  // 將 input 還原回空值
  todo_input.value = ''
  // 過濾
  filterAction()
}

// 設定更改為已完成或刪除 todo 用的 todoAction 函式
function todoAction(e) {
  if (e.target.classList[0] === 'complete_btn') {
    // 將被按到的 todo 做 completed 這個效果的 class 的 toggle
    e.target.parentElement.classList.toggle('completed')
    filterAction()
  }
  if (e.target.classList[0] === 'delete_btn') {
    const todo = e.target.parentElement
    // 將被按到的 todo 做 gone 這個動畫效果 class 的 新增
    todo.classList.add('gone')
    // gone 的動畫跑完後刪除此 todo
    todo.addEventListener('webkitTransitionEnd', () => {
      todo.remove()
      filterAction()
    })
  }
}

// 設定過濾 todo 類型用的 filterAction 函式
function filterAction(e) {
  // 設定 all_todos 為所有 todos 形成的 Nodelist
  const all_todos = todos.childNodes
  all_todos.forEach((all_todo) => {
    // 根據過濾器的選項決定要顯示的種類的 todo
    switch (filter.value) {
      case 'all':
        all_todo.style.display = 'flex'
        break
      case 'completed':
        if (all_todo.classList.contains('completed')) {
          all_todo.style.display = 'flex'
        } else {
          all_todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!all_todo.classList.contains('completed')) {
          all_todo.style.display = 'flex'
        } else {
          all_todo.style.display = 'none'
        }
        break
    }
  })
}
