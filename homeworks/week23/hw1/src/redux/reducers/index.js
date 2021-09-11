import { combineReducers } from 'redux'
import todos from './todos'
import filter from './filter'
import edit from './edit'

export default combineReducers({
  todoState: todos,
  filterState: filter,
  editState: edit
})
