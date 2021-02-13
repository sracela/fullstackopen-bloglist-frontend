import React, { useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch } from "react-redux";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
  }, [dispatch]);
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
