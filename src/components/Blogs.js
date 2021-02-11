import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

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
              onLike={() => dispatch(likeBlog(blog.id))}
              onRemove={() => dispatch(removeBlog(blog.id))}
            />
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
