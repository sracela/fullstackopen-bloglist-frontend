const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.data];
    case "LIKE_BLOG": {
      const id = action.data.id;
      const blogToChange = state.find((n) => n.id === id);

      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    }
    default:
      return state;
  }
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createBlog = (title) => {
  return {
    type: "NEW_BLOG",
    data: {
      title,
      author: "sara",
      url: "prueba1.com",
      likes: 2,
      id: generateId(),
    },
  };
};

export const likeBlog = (id) => {
  return {
    type: "LIKE_BLOG",
    data: { id },
  };
};

export default blogReducer;
