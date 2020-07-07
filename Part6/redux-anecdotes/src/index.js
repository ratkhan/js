import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { createStore, combineReducers } from "redux";
import anecdoteService from './services/anecdotes'
import { composeWithDevTools } from "redux-devtools-extension";

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducer
)



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)