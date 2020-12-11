import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ( { createBlog }
) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


  const handleTitleChange = ({ target }) => {
    setNewBlog({ ...newBlog, title: target.value })
  }


  const handleAuthorChange = ({ target }) => {
    setNewBlog({ ...newBlog, author: target.value })
  }


  const handleUrlChange = ({ target }) => {
    setNewBlog({ ...newBlog, url: target.value })
  }


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ ...newBlog })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }
  return(
    <div>
      <h2>Create a new note</h2>
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
            onChange={handleAuthorChange}
          />
        </div>
        <div>
              url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>)
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
