import React, { useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import { logout } from "./reducers/auth";

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logout());
  }

  if (!isLoggedIn) {
    return (
      <>
        <Notification />
        <Login />
      </>
    );
  }
  return (
    <div>
      <h1>Blogs Application</h1>
      <Notification />
      <p>{currentUser.name} logged-in</p>
      <button onClick={onLogout}>LOGOUT</button>
      <BlogForm />
      <Blogs />
    </div>
  );
};

export default App;
