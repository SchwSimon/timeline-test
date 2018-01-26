import * as types from './action-types';

export const addTodo = todo => ({
  type: types.ADD_TODO,
  payload: {
    id: 0,
    title: todo,
    done: false,
    priority: 1
  }
});

export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  payload: filter
});

export const setTodoOrder = order => ({
  type: types.SET_TODO_ORDER,
  payload: order
});

export const toggleTodoDone = id => ({
  type: types.TOGGLE_TODO_DONE,
  payload: id*1 // force integer
});
