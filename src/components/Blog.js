import React, {useState} from 'react'
const Blog = ({ blog, onLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>

      <div style={hideWhenVisible}>
      
      {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author} 
        <button onClick={toggleVisibility}>hide</button></div> 
        <p>{blog.url}</p>
        <p>likes: {blog.likes}</p>
        {blog.user && 
        <p>{blog.user.username}</p>}
        <button onClick={() => onLike(blog)}>like</button>
      </div>
  </div>
)}

export default Blog
