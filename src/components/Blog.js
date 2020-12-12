/* eslint-disable linebreak-style */

import React, { useState } from 'react'
const Blog = ({ blog, onLike, onRemove }) => {
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
    <div style={blogStyle} className="blog">

      <div style={hideWhenVisible} className="default">

        <p>{blog.title} </p>{blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="hide">
        <div>{blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button></div>
        <p>{blog.url}</p>
        <p>likes: <span id="numberOfLikes">{blog.likes}</span></p>
        {blog.user &&
          <p>{blog.user.username}</p>}
        <button id="likeButton" onClick={() => onLike(blog)}>like</button>

        {onRemove !== null && <button id="removeButton" onClick={() => onRemove(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
