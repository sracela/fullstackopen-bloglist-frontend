const initialState = [
  {
    title: 'Prueba 1',
    author: 'sara',
    url: 'prueba1.com',
    likes: 1,
    id: 1,
  },
  {
    title: 'Prueba 2',
    author: 'sara',
    url: 'prueba2.com',
    likes: 0,
    id: 2,
  },
]

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG': {
    const id = action.data.id
    const blogToChange = state.find((n) => n.id === id)

    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    }
    return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    }
    case 'REMOVE_BLOG': {
    const id = action.data.id;
    return state.filter((blog) => (blog.id !== id));
    }
  default:
    return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createBlog = (title, author, url) => {
  return {
    type: 'NEW_BLOG',
    data: {
      title,
      author,
      url,
      likes: 0,
      id: generateId(),
    },
  }
}

export const likeBlog = (id) => {
  return {
    type: 'LIKE_BLOG',
    data: { id },
  }
}

export const removeBlog = (id) => {
  return {
    type: "REMOVE_BLOG",
    data: { id },
  };
};

export default blogReducer
