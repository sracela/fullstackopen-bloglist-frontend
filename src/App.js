import React, { useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import { logout } from "./reducers/auth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const Home = () => <h2>Welcome !</h2>
const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.auth);
  
  const padding = {
    padding: 5,
  };

  useEffect(() => {
    dispatch(initializeBlogs());
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
    <Router>
      <div style={{position: 'absolute', top: 0, right: 0, margin: '10px'}}>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <div>
        <h1>Blogs Application</h1>
        <Notification />
        <p>{currentUser.name} logged-in</p>
        <button onClick={onLogout}>LOGOUT</button>
      </div>
      <Switch>
        <Route path="/blogs">
          <BlogForm />
          <Blogs />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    // <div>
    //   <h1>Blogs Application</h1>
    //   <Notification />
    //   <p>{currentUser.name} logged-in</p>
    //   <button onClick={onLogout}>LOGOUT</button>
    //   <BlogForm />
    //   <Blogs />
    // </div>
  );
};

export default App;
