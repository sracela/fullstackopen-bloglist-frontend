import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./App.css";
import store from './store'
import { Pane } from 'evergreen-ui'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Pane width="100%" height="100vh">
        <App />
      </Pane>
    </Router>
  </Provider>,
  document.getElementById("root")
);