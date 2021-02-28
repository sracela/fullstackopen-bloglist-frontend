import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import {
    Heading,
    Pane,
    Avatar,
    Text,
    Badge,
} from "evergreen-ui";

const BlogItem = ({ blog }) => 
{
  return (
    <li
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
      }}
    >
      <Link to={`/blogs/${blog.id}`}>
        <h3>{blog.title}</h3>
      </Link>
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
          <br />
        </div>
      </Togglable>
    </li>
  );
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div style={{ maxWidth: "100%", padding: "5px" }}>
        <Heading size={700}>All Blogs</Heading>
        <BlogForm />
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
              <BlogItem key={blog.id} blog={blog} />
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
