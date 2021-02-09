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
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleClick={() => dispatch(likeBlog(blog.id))}
            />
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
