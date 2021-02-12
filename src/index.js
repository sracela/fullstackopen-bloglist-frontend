import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import App from "./App";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


/** 
 * TODO: toggleVisibilityOf in Blogs.js/Blog, could i reuse Toggable?
 * TODO: Login!!
 * TODO: Redux + server
 * TODO: Notification styled, error red, success green
**/