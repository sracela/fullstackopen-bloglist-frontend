import React from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";

const App = () => {
  return (
    <div>
      <h1>Blogs Application</h1>
      <BlogForm />
      <Blogs />
    </div>
  );
};

export default App;
