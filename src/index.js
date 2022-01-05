import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import './index.css';
import reportWebVitals from './reportWebVitals';

import store from './store'
import Routes from './components/Routes'


render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
