import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { toggleVisibility } from "../reducers/togglableReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";

const BlogForm = (props) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) =>
    state.togglables.find((a) => a.id === props.id)
  )?.visibility;

  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetURL, ...url } = useField("text");

  const handleReset = () => resetTitle(resetAuthor(resetURL()));

  useEffect(handleReset, [visible])

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog(title.value, author.value, url.value));
    dispatch(() => dispatch(toggleVisibility(props.id)));
    dispatch(setNotification(`New blog "${title.value}" created`, 3));
    handleReset()
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        title:
        <input {...title} />
        <br />
        author:
        <input {...author} />
        <br />
        url:
        <input {...url} />
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default BlogForm
