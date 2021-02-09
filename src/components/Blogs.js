import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, handleClick }) => {
  return (
    <li key={blog.id}>
      <p>{blog.title}</p>
      <strong>likes:</strong> {blog.likes}
      <button onClick={handleClick}>like</button>
    </li>
  );
};

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state);

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleClick={() => dispatch(likeBlog(blog.id))}
        />
      ))}
    </ul>
  );
};

export default Blogs;
