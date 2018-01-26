import * as types from '../../actions/action-types';
import * as actions from '../../actions/todo-actions';

describe('Actions', () => {
  it('addTodo', () => {
    const todo = 'todo';
    const payload = {
      id: 0,
      title: todo,
      done: false,
      priority: 1
    };

    expect(actions.addTodo(todo)).toEqual({
      type: types.ADD_TODO,
      payload
    });
  });

   it('setVisibilityFilter', () => {
     const payload = 'filter';
     expect(actions.setVisibilityFilter(payload)).toEqual({
       type: types.SET_VISIBILITY_FILTER,
       payload
     });
   });

   it('setTodoOrder', () => {
     const payload = 'order';
     expect(actions.setTodoOrder(payload)).toEqual({
       type: types.SET_TODO_ORDER,
       payload
     });
   });

   it('toggleTodoDone (must cast to integer)', () => {
     const payload = '1';
     expect(actions.toggleTodoDone(payload)).toEqual({
       type: types.TOGGLE_TODO_DONE,
       payload: payload*1
     });
   });
});
