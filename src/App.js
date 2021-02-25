import React, { useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Blog from "./components/Blog";
import User from "./components/User";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Nav from './components/Nav'
import {
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Notification from "./components/Notification";

const Home = ({ greeting }) => (
  <div>
    <h2>Welcome !</h2>
    <p>{greeting}</p>
  </div>
);
const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const matchBlog = useRouteMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id.toString())
    : null;
  const matchUser = useRouteMatch("/users/:id");
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id.toString())
    : null;

  useEffect(() => {
    try {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    } catch (e) {
      console.log("problem loading blogs or users");
    }
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Notification />
      <Switch>
        <Route
          path="/users/:id"
          render={() => (isLoggedIn ? <User user={user}/> : <Redirect to="/login" />)}
        />
        <Route
          path="/blogs/:id"
          render={() =>
            isLoggedIn ? <Blog blog={blog} /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/users"
          render={() => (isLoggedIn ? <Users /> : <Redirect to="/login" />)}
        />
        <Route
          path="/blogs"
          render={() =>
            isLoggedIn ? (
              <>
                <BlogForm />
                <Blogs />
              </>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home
            greeting={
              !isLoggedIn
                ? "Please Log in to see posted Blogs"
                : "Click on blogs in the navigation bar to see available blogs"
            }
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
