import { createSelector } from 'reselect';
import * as filterTypes from '../actions/todo-filterTypes';
import * as filters from '../actions/todo-filters';

const getTodos = state => state.todo.entities;
const getVisibilityFilter = state => state.todo.visibilityFilter;
const getOrder = state => state.todo.order;

  // return the filtered todos
export const filterTodos = (todos, filter) => {
  switch(filter) {
    case filterTypes.SHOW_DONE:
      return todos.filter(filters.done);

    case filterTypes.SHOW_UNDONE:
      return todos.filter(filters.undone);

    case filterTypes.SHOW_ALL:
    default:
      return todos;
  }
}

  // Ascending sort callback function
export const sortTodoAscending = (a, b) => a.id > b.id;
  // Descending sort callback function
export const sortTodoDescending = (a, b) => a.id < b.id;

/**
 * Returns the visible (filtered by visibilityFilter)
 * todo entities in the selected order
 */
export const getVisibleSortedTodos = createSelector(
  [getTodos, getVisibilityFilter, getOrder],
  (todos, filter, order) => {
      // filter the todos by the given visibility filter
    const visibleTodos = filterTodos(todos, filter);
      // sort the todos by the given order
    visibleTodos.sort((order === 'ASC') ? sortTodoAscending : sortTodoDescending);

    return visibleTodos;
  }
);
