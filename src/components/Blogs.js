import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";

const Blog = ({ blog, onLike, onRemove }) => {
  return (
    <li
      key={blog.id}
      style={{
        border: "1px solid gray",
        padding: "10px",
        borderRadius: "8px",
        width: "200px",
        height: "230px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <h3>{blog.title}</h3>
      <p>Created by: {blog.author}</p>
      {blog.user && <p>Username: {blog.user.username}</p>}
      <Togglable buttonLabel="show" id={`blog_${blog.id}`}>
        <div>
          <p>
            <small>It can be visited at {blog.url}</small>
          </p>
          <p>
            <strong>likes:</strong> {blog.likes}
          </p>
          <div>
            <button onClick={onLike}>like</button>
            <button onClick={onRemove}>remove</button>
          </div>
          <br />
        </div>
      </Togglable>
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
    <div style={{ maxWidth: "100%", padding: "5px", textAlign: "center" }}>
      <h2>Blogs</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          columnGap: "20px",
          rowGap: "20px",
          listStyle: "none",
          alignItems: "center",
        }}
      >
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
