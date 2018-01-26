import reducer, { initialState } from '../../reducers/todo-reducer';
import * as types from '../../actions/action-types';

describe('reducer: layers', () => {
  const defaultState = {
    visibilityFilter: 'SHOW_ALL',
    order: 'ASC',
    entities: []
  };

  it('initial state', () => {
    expect(initialState).toEqual(defaultState);
  });

	it('return initialState on default action', () => {
    expect(reducer(undefined, {type: null})).toEqual(defaultState);
  });

  it('ADD_TODO', () => {
    const action = {
      type: types.ADD_TODO,
      payload: {}
    };
    const state = {
      ...defaultState,
      entities: [...defaultState.entities, {id: 1}] // auto incremnet gets set
    };
    expect(reducer(undefined, action)).toEqual(state);
  });

  it('SET_VISIBILITY_FILTER', () => {
    const action = {
      type: types.SET_VISIBILITY_FILTER,
      payload: 'filter'
    };
    const state = {
      ...defaultState,
      visibilityFilter: 'filter'
    };
    expect(reducer(undefined, action)).toEqual(state);
  });

  it('SET_TODO_ORDER', () => {
    const action = {
      type: types.SET_TODO_ORDER,
      payload: 'order'
    };
    const state = {
      ...defaultState,
      order: 'order'
    };
    expect(reducer(undefined, action)).toEqual(state);
  });

  it('TOGGLE_TODO_DONE', () => {
    const action = {
      type: types.TOGGLE_TODO_DONE,
      payload: 1
    };
    const prevState = {
      ...defaultState,
      entities: [{id: 1, done: false}, {id: 2, done: false}]
    };
    const state = {
      ...prevState,
      entities: [{id: 1, done: true}, {id: 2, done: false}]
    };
    expect(reducer(prevState, action)).toEqual(state);
  });
});
