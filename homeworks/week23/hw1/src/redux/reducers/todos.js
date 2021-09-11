import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, EDIT_TODO, Clear_Todos } from '../actionTypes.js'

let todoId = 0

const initialState = {
  todos:[]
}

export default function todosReducer(state = initialState, action){
  switch(action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos:[
          ...state.todos,
          {
            id: todoId++,
            name: action.payload.name,
            isDone: false,
          }
        ]
      }
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map(todo => todo.id !== action.payload.id ? todo : {...todo, isDone: !todo.isDone})
      }
    }
    case EDIT_TODO: {
      return {
        ...state,
        todos: state.todos.map(todo => todo.id !== action.payload.id ? todo : {...todo, name: action.payload.name})
      }
    }
    case Clear_Todos: {
      return {
        ...state,
        todos:[]
      }
    }
    default: {
      return state
    }
  }
}
