import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: ""
  });
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

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = { ...newBlog };

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: "",
        author: "",
        url: ""
      });
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

  const handleTitleChange = ({ target }) => {
    // console.log(newBlog)
    setNewBlog({ ...newBlog, title: target.value });
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button type="submit">save</button>
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
          <h2>Create new</h2>
          {blogForm()}
          <br />
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
