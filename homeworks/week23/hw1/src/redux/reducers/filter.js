import { SET_Filter } from '../actionTypes.js'

const initialState = {
  filter:'all'
}

export default function filterReducer(state = initialState, action){
  switch(action.type) {
    case SET_Filter: {
      return {
        ...state,
        filter: action.payload.filter
      }
    }
    default: {
      return state
    }
  }
}
