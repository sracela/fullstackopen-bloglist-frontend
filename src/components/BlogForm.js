import React from 'react'
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ( props
) => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.blog.value;
    event.target.blog.value = "";
    dispatch(createBlog(title));
  };

  return (
    <form onSubmit={addBlog}>
      <input name="blog" />
      <button type="submit">add</button>
    </form>
  );
}

export default BlogForm
