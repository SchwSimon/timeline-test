import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

  // log store changes
store.subscribe(() => {
	console.log(store.getState())
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
