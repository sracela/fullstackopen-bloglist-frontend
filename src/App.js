import React, { useEffect } from "react";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Blog from "./components/Blog";
import User from "./components/User";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Nav from "./components/Nav";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import Notification from "./components/Notification";
import { Pane } from "evergreen-ui";
import Home from "./components/Home";

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
    <Pane display="flex" width="100%" height="100%">
      <Nav />
      <Pane
        display="flex"
        flexDirection="column"
        // background="#f5f5f5"
        background="purpleTint"
        width="100%"
        height="100%"
        paddingX={48}
        paddingY={32}
      >
        <Notification />
        <Switch>
          <Route
            path="/users/:id"
            render={() =>
              isLoggedIn ? <User user={user} /> : <Redirect to="/login" />
            }
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
            render={() => (isLoggedIn ? <Blogs /> : <Redirect to="/login" />)}
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
      </Pane>
    </Pane>
  );
};

export default App;

/* 
TODO: Dialog del blogs
TODO: Back buttons
TODO: Sesion
TODO: Comments togglable
TODO: Scroll blogs, comments
**/
