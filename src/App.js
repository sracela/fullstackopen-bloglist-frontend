import React from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Togglable from "./components/Togglable";

const App = () => {
  return (
    <div>
      <h1>Blogs Application</h1>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
