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
 * TODO: Redirect del router
 * TODO: backend, que devuelva el user cuando creas un blog
 * TODO: clean DB
 * ? meter un enum para los ids de Togglable
 * ? caducar sesion
**/