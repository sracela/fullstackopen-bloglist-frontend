import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import App from "./App";
import "./App.css";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


/** 
 * TODO: Login!!
 * TODO: Probar server con Login
 * TODO: Notification styled, error red, success green
**/