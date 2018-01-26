import rootReducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// enable redux devtools... can this be done with Webpack instead?
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(thunkMiddleware)
);

export default initialState => {
  return createStore(rootReducer, initialState, enhancers);
};
