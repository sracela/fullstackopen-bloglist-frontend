import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import blogReducer from "./reducers/blogReducer"
import togglableReducer from "./reducers/togglableReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  visibility: togglableReducer,
});

const store = createStore(reducer);

/** 
 * ! Detele when finished, just for debugging purposes
 */
console.log(store.getState());
store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


/** 
 * TODO: toggleVisibilityOf in Blogs.js/Blog
**/