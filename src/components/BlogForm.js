import React from 'react'
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { useField } from "../hooks";

const BlogForm = () => {
  const dispatch = useDispatch();

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog(title.value, author.value, url.value));
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
