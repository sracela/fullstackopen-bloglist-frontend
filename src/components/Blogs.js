import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, onLike, onRemove }) => {
  return (
    <li key={blog.id}>
      <h3>{blog.title}</h3>
      <p>Created by: {blog.author}</p>
      <p>
        <small>It can be visited at {blog.url}</small>
      </p>
      <strong>likes:</strong> {blog.likes}
      <div>
        <button onClick={onLike}>like</button>
        <button onClick={onRemove}>remove</button>
      </div>
    </li>
  );
};

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

const handleLike = (id) => () => {
  dispatch(likeBlog(id));
  dispatch(setNotification(`Like!`, 3));
};

const handleRemove = (id) => () => {
  dispatch(dispatch(removeBlog(id)));
  dispatch(setNotification(`Remove!`, 3));
};

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onLike={handleLike(blog.id)}
              onRemove={handleRemove(blog.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
