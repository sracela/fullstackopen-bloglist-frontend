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
import { logout } from "./reducers/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Notification from "./components/Notification";


const Home = () => (
  <div>
    <h2>Welcome !</h2>
    <p>Please Log in to see posted Blogs</p>
  </div>
);
const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.auth);
  
  const padding = {
    padding: 5,
  };

  useEffect(() => {
    try {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    } catch (e) {
      console.log("problem loading blogs")
    }
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logout());
  }

  // if (!isLoggedIn) {
  //   return (
  //     <>
  //       <Notification />
  //       <Login />
  //     </>
  //   );
  // }
  return (
    <Router>
      <div style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {isLoggedIn ? 
          <div>
            <em>{currentUser.name} logged in</em>
            <button onClick={onLogout}>LOGOUT</button>
          </div>
        : 
          <Link style={padding} to="/login">
            login
          </Link>
        }
      </div>
      <div>
        <h1>Blogs Application</h1>
        <Notification />
      </div>
      <Switch>
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
        <Route
          path="/users/:id"
          render={() => (isLoggedIn ? <User /> : <Redirect to="/login" />)}
        />
        <Route
          path="/blogs/:id"
          render={() => (isLoggedIn ? <Blog /> : <Redirect to="/login" />)}
        />
        {/* <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route> */}
        {/* <Route path="/blogs"></Route> */}
        {/* <Route path="/users">
          <Users />
        </Route> */}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
