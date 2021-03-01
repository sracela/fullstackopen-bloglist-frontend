import React from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Comments from "./Comments";
const Blog = ({ blog }) => {
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
        borderRadius: "8px",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "50px 20px",
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
        <div style={{ display: "flex" }}>
          <button onClick={handleLike(blog)}>like</button>
          <div style={{ width: "10px" }}></div>
          <button onClick={handleRemove(blog)}>remove</button>
        </div>
        <br />
        {/* <Togglable buttonLabel="show" id={`blog_${blog.id}`}>
          <Pane>
            <Paragraph color="muted" marginTop={8}>
              url: {blog.url}
            </Paragraph>
          </Pane>
        </Togglable> */}
        <Comments blogId={blog.id} comments={blog.comments} />
      </div>
    </div>
  );
};
export default Blog;
