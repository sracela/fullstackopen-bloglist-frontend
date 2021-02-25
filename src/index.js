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
 * ? meter un enum para los ids de Togglable
 * ? caducar sesion
**/