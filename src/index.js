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
 * TODO: revisar app-copy y borrar lo que sobre
 * TODO: backend, que devuelva el user cuando creas un blog
 * TODO: clean DB
 * TODO: meter un enum para los ids de Togglable
**/