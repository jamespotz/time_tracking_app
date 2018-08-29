import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

render((
  <BrowserRouter forceRefresh={true}>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();