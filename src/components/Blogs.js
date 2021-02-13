import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, onLike, onRemove }) => {
  return (
    <li
      key={blog.id}
      style={{
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        padding: "10px",
        borderRadius: "8px",
        width: "300px",
        height: "325px",
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

  const handleLike = (blogObject) => async () => {
    try {
      await blogService.update(blogObject.id, {
        ...blogObject,
        likes: blogObject.likes + 1,
      });
      dispatch(likeBlog(blogObject.id));
      dispatch(setNotification(`Like!`, 3));
    } catch (e) {
      dispatch(setNotification(`Error liking the blog!`, 3));
    }
  };

  const handleRemove = (blogObject) => async () => {
    if (window.confirm(`Do you really want to remove ${blogObject.title}?`)) {
      try {
        await blogService.remove(blogObject.id);
        dispatch(dispatch(removeBlog(blogObject.id)));
        dispatch(setNotification(`Remove!`, 3));
      } catch (e) {
        dispatch(setNotification(`Error removing the blog!`, 3));
      }
    }
  };

  return (
    <div style={{ maxWidth: "100%", padding: "5px", textAlign: "center" }}>
      <h2 style={{letterSpacing: '2px'}}>BLOGS</h2>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(325px, 1fr))",
          columnGap: "30px",
          rowGap: "30px",
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
              onLike={handleLike(blog)}
              onRemove={handleRemove(blog)}
            />
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
