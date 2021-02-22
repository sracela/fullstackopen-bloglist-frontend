import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./App.css";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);


/*
 * TODO: 7.17: comments, step1
 * TODO: backend, que devuelva el user cuando creas un blog
 * TODO: clean DB
 * ? meter un enum para los ids de Togglable
 * ? caducar sesion
**/