import React from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h1>Blogs Application</h1>
      <Notification />
      <Togglable buttonLabel="new blog" id="blogForm">
        <BlogForm id="blogForm" />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
