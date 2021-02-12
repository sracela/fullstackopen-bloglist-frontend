import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import blogReducer from "./reducers/blogReducer";
import togglableReducer from "./reducers/togglableReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  visibility: togglableReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;