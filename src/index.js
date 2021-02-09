import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from "redux";
import blogReducer from "./reducers/blogReducer"

const store = createStore(blogReducer);

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
