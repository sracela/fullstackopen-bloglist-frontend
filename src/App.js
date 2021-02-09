import React from "react";
import { createStore } from "redux";
import blogReducer, {createBlog, likeBlog} from "./reducers/blogReducer"

const store = createStore(blogReducer);

store.dispatch({
  type: "NEW_BLOG",
  data: {
    title: "Prueba 1",
    author: "sara",
    url: "prueba1.com",
    likes: 1,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_BLOG",
  data: {
    title: "Prueba 2",
    author: "sara",
    url: "prueba1.com",
    likes: 2,
    id: 2
  },
});

const App = () => {
  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.blog.value;
    event.target.blog.value = "";
    store.dispatch(createBlog(title));
  };

  const onLikeBlog = (id) => {
    store.dispatch(likeBlog(id));
  };
  return (
    <div>
      <form onSubmit={addBlog}>
        <input name="blog" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((blog) => (
          <li key={blog.id}>
            <p>{blog.title}</p>
            <strong>likes:</strong> {blog.likes}
            <button onClick={() => onLikeBlog(blog.id)}>like</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
