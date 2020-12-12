import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('Succesfuly login')
      setIsError(false)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setIsError(true)
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const onLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage('New Blog Added')
      setIsError(false)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setErrorMessage('Something went wrong adding a new blog')
      setIsError(true)
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, {
        ...blogObject,
        likes: blogObject.likes + 1
      })
      console.log('returnedBlog', returnedBlog)
      setBlogs(
        blogs.map((x) =>
          x.id === returnedBlog.id ? { ...x, likes: returnedBlog.likes } : x
        )
      )
      setErrorMessage('Like!')
      setIsError(false)
    } catch (exception) {
      setErrorMessage('Something went wrong updating a new blog')
      setIsError(true)
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Do you really want to remove ${blogObject.title}?`)) {
      try {
        await blogService.remove(blogObject.id)
        setBlogs(
          blogs.filter((blog) =>
            blog.id !== blogObject.id  )
        )

        setErrorMessage('Removed!')
        setIsError(false)
      } catch (exception) {
        setErrorMessage('Something went wrong removing blog')
        setIsError(true)
      }

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)}
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])
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
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <h2>Blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} onLike={updateBlog} onRemove={blog.user === undefined ? null : blog.user.name === user.name ? removeBlog : null}/>
            ))}
        </div>
      )}
    </div>
  )
}

export default App
