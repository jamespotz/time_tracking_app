import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App'
import './index.css'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { LOG_IN_SUCCESS } from './actions/types';
import store from './store'
import history from './history'

if (!!sessionStorage.user_token) {
  store.dispatch({ type: LOG_IN_SUCCESS })
}

render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();