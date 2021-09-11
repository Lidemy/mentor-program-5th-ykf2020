import { TOGGLE_ISEDITING, SET_EDITEDTODO } from '../actionTypes.js'

const initialState = {
  isEditing:false,
  editedTodo: {
    id:'',
    name:''
  }
}

export default function editReducer(state = initialState, action){
  switch(action.type) {
    case TOGGLE_ISEDITING: {
      return {
        ...state,
        isEditing: !state.isEditing
      }
    }
    case SET_EDITEDTODO: {
      return {
        ...state,
        editedTodo: {
          id: action.payload.id,
          name: action.payload.name
        }
      }
    }
    default: {
      return state
    }
  }
}
