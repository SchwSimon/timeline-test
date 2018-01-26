import * as filterTypes from '../../actions/todo-filterTypes';

describe('Filter types', () => {
   it('SHOW_ALL', () => {
     expect(filterTypes.SHOW_ALL).toBe('SHOW_ALL');
   });

   it('SHOW_DONE', () => {
     expect(filterTypes.SHOW_DONE).toBe('SHOW_DONE');
   });

   it('SHOW_UNDONE', () => {
     expect(filterTypes.SHOW_UNDONE).toBe('SHOW_UNDONE');
   });
});
