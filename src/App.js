import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage("Succesfuly login");
      setIsError(false);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setIsError(true);
    }

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const onLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const addBlog = async (blogObject) => {

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage("New Blog Added");
      setIsError(false);
    } catch (exception) {
      setErrorMessage("Something went wrong adding a new blog");
      setIsError(true);
    }

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );


  
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      blogService.setToken(user.token);
    }
  }, []);
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} error={isError} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={onLogout}>LOGOUT</button>
          {/* <h2>Create new</h2>
          {blogForm()}
          <br /> */}
          <Togglable buttonLabel='new blog'>
        <BlogForm 
          createBlog={addBlog}/>
        </Togglable>

          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
