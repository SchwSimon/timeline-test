import * as filter from '../../actions/todo-filters';

describe('Filter callback functions', () => {
  const todo = {
    done: true
  };

  it('done() must return true', () => {
    expect(filter.done(todo)).toBeTruthy();
  });

  it('undone() must return false', () => {
    expect(filter.undone(todo)).toBeFalsy();
  });
});
