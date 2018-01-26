import sinon from 'sinon';
import { filterTodos, sortTodoAscending, sortTodoDescending, getVisibleSortedTodos } from '../../selectors/todo-selectors';
import * as filterTypes from '../../actions/todo-filterTypes';
import * as filters from '../../actions/todo-filters';

describe('function filterTodos()', () => {
  const filterStub = sinon.stub(Array.prototype, 'filter');
  afterAll(() => {
    filterStub.restore();
  });

  it('must call filter with filters.done', () => {
    filterTodos([], filterTypes.SHOW_DONE);
    expect(filterStub.calledWith(filters.done)).toBeTruthy();
  });

  it('must call filter with filters.undone', () => {
    filterTodos([], filterTypes.SHOW_UNDONE);
    expect(filterStub.calledWith(filters.undone)).toBeTruthy();
  });

  it('must return input argument todos without any filtering on default (or SHOW_ALL)', () => {
    const todos = [];

    expect(filterTodos(todos)).toBe(todos);
    expect(filterTodos(todos, filterTypes.SHOW_ALL)).toBe(todos);
  });
});

describe('sort callback functions', () => {
  const argA = {id: 1};
  const argB = {id: 2};

  describe('function sortTodoAscending()', () => {
    it('must be true if a.id > b.id', () => {
      expect(sortTodoAscending(argB, argA)).toBe(true);
    });
  });

  describe('function sortTodoDescending()', () => {
    it('must be true if a.id < b.id', () => {
      expect(sortTodoDescending(argA, argB)).toBe(true);
    });
  });
});

describe('function getVisibleSortedTodos()', () => {
  it('must return done entities in a descending order', () => {
    const state = {
      todo: {
        entities: [
          {id: 1, done: true},
          {id: 2, done: false},
          {id: 3, done: true},
          {id: 4, done: false},
        ],
        visibilityFilter: 'SHOW_DONE',
        order: 'DESC'
      }
    };
    expect(getVisibleSortedTodos(state)).toEqual([
      {id: 3, done: true},
      {id: 1, done: true},
    ]);
  });
});
