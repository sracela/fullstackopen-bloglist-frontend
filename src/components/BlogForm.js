import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { toggleVisibility } from "../reducers/togglableReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const BlogForm = () => {
  const id = "blogForm";
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const visible = useSelector((state) =>
    state.togglables.find((a) => a.id === id)
  )?.visibility;

  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetURL, ...url } = useField("text");

  const handleReset = () => resetTitle(resetAuthor(resetURL()));

  useEffect(handleReset, [visible])

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      user: currentUser,
    };
    try {
    const returnedBlog = await blogService.create(newBlog);
    dispatch(createBlog(newBlog));
    dispatch(() => dispatch(toggleVisibility(id)));
    dispatch(setNotification(`New blog "${returnedBlog.title}" created`, 3));
    handleReset();

    } catch (e) {
    dispatch(setNotification(`Error creating new blog`, 3));
    handleReset();
      
    }
  };

  return (
    <div style={{ maxWidth: "50%", padding: "5px" }}>
      <h2>Create a new blog</h2>
      <Togglable buttonLabel="new blog" id={id}>
        <form onSubmit={addBlog}>
          title:
          <input {...title} />
          <br />
          <br />
          author:
          <input {...author} />
          <br />
          <br />
          url:
          <input {...url} />
          <br />
          <br />
          <button type="submit">add</button>
          <br />
          <br />
        </form>
      </Togglable>
    </div>
  );
}

export default BlogForm
