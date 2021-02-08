import React from "react";
import { createStore } from "redux";

const blogReducer = (state = [], action) => {
  if (action.type === "NEW_BLOG") {
    state.concat(action.data);
    return state;
  }

  return state;
};

const store = createStore(blogReducer);

store.dispatch({
  type: "NEW_BLOG",
  data: {
    title: "Prueba 1",
    author: "sara",
    url: "prueba1.com",
    likes: 1,
  },
});

store.dispatch({
  type: "NEW_BLOG",
  data: {
    title: "Prueba 2",
    author: "sara",
    url: "prueba1.com",
    likes: 2,
  },
});

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
