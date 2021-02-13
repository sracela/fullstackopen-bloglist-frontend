import React from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h1>Blogs Application</h1>
      <Notification />
        <BlogForm />
      <Blogs />
    </div>
  );
};

export default App;
