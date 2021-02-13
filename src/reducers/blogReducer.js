const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.data];
    case "INIT_BLOGS":
      return action.data;
    case "LIKE_BLOG": {
      const id = action.data.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    }
    case "REMOVE_BLOG": {
      const id = action.data.id;
      return state.filter((blog) => blog.id !== id);
    }
    default:
      return state;
  }
}

export const createBlog = (data) => {
  return {
    type: "NEW_BLOG",
    data
    // {
    //   ...newBlog,
    //   likes: 0,
    //   id: generateId(),
    // },
  };
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


export const initializeBlogs = (blogs) => {
  return {
    type: "INIT_BLOGS",
    data: blogs,
  };
};

export default blogReducer
