import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, EDIT_TODO, Clear_Todos, SET_Filter, TOGGLE_ISEDITING, SET_EDITEDTODO } from './actionTypes.js'

export function addTodo(name){
  return {
    type: ADD_TODO,
    payload: {
      name,
    }
  }
}

export function deleteTodo(id){
  return {
    type: DELETE_TODO,
    payload: {
      id,
    }
  }
}

export function toggleTodo(id){
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    }
  }
}

export function editTodo(id, name){
  return {
    type: EDIT_TODO,
    payload: {
      id, name
    }
  }
}

export function clearTodos() {
  return {
    type: Clear_Todos
  }
}

export function filterTodo(filter){
  return {
    type: SET_Filter,
    payload: {
      filter,
    }
  }
}

export function toggleIsEditing() {
  return {
    type:TOGGLE_ISEDITING,
  }
}

export function setEditedTodo(id, name) {
  return {
    type:SET_EDITEDTODO,
    payload: {
      id, name
    }
  }
}
