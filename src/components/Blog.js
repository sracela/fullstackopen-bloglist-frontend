import React from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({blog}) => {
  const dispatch = useDispatch();

  if (!blog) {
    return <div>no data</div>;
  }

  const handleLike = (blogObject) => async () => {
    try {
      await dispatch(likeBlog(blogObject));
      dispatch(setNotification(`Like!`, false, 3));
    } catch (e) {
      dispatch(setNotification(`Error liking the blog!`, true, 3));
    }
  };

  const handleRemove = (blogObject) => async () => {
    if (window.confirm(`Do you really want to remove ${blogObject.title}?`)) {
      try {
        await dispatch(removeBlog(blogObject));
        dispatch(setNotification(`Remove!`, false, 3));
      } catch (e) {
        dispatch(setNotification(`Error removing the blog!`, true, 3));
      }
    }
  };
  return (
    <div
      key={blog.id}
        style={{
        
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "10px",
        borderRadius: "8px",
        width: "300px",
        height: "325px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        textAlign: "center"
      }}
    >
      <h3>{blog.title}</h3>
      <p>Created by: {blog.author}</p>
      {blog.user && <p>Username: {blog.user.username}</p>}
      <div>
        <p>
          <small>It can be visited at {blog.url}</small>
        </p>
        <p>
          <strong>likes:</strong> {blog.likes}
        </p>
        <div>
          <button onClick={handleLike(blog)}>like</button>
          <button onClick={handleRemove(blog)}>remove</button>
        </div>
        <br />
      </div>
    </div>
  );
};
export default Blog;
