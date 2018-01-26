import * as types from '../../actions/action-types';

describe('Action types', () => {
  it('REQUEST_TIMELINE', () => {
    expect(types.REQUEST_TIMELINE).toBe('MEMORY/REQUEST_TIMELINE');
  });

  it('RECEIVE_TIMELINE', () => {
    expect(types.RECEIVE_TIMELINE).toBe('MEMORY/RECEIVE_TIMELINE');
  });

  it('ADD_TODO', () => {
    expect(types.ADD_TODO).toBe('MEMORY/ADD_TODO');
  });

  it('SET_VISIBILITY_FILTER', () => {
    expect(types.SET_VISIBILITY_FILTER).toBe('MEMORY/SET_VISIBILITY_FILTER');
  });

  it('SET_TODO_ORDER', () => {
    expect(types.SET_TODO_ORDER).toBe('MEMORY/SET_TODO_ORDER');
  });

  it('TOGGLE_TODO_DONE', () => {
    expect(types.TOGGLE_TODO_DONE).toBe('MEMORY/TOGGLE_TODO_DONE');
  });
});
