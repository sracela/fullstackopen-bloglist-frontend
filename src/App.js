import React from "react";
import {createBlog, likeBlog} from "./reducers/blogReducer"
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state);
  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.blog.value;
    event.target.blog.value = "";
    dispatch(createBlog(title));
  };

  const onLikeBlog = (id) => {
    dispatch(likeBlog(id));
  };
  return (
    <div>
      <form onSubmit={addBlog}>
        <input name="blog" />
        <button type="submit">add</button>
      </form>
      <ul>
        {blogs.map((blog) => (
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
