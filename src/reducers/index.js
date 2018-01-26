import { combineReducers } from 'redux';
import todo from './todo-reducer.js';
import timeline from './timeline-reducer.js';

const rootReducer = combineReducers({
  todo,
  timeline
});

export default rootReducer;
