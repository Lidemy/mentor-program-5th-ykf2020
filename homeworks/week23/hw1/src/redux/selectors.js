export const selectTodos = (store) => store.todoState.todos
export const selectFilter = (store) => store.filterState.filter
export const selectIsEditing = (store) => store.editState.isEditing
export const selectEditedTodo = (store) => store.editState.editedTodo
