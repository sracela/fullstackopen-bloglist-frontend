import blogService from "../services/blogs";

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

export const createBlog = (data) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(data);
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject();
  }
  };

export const likeBlog = (blogObject) => async (dispatch) => {
  try {
    await blogService.update(blogObject.id, {
      ...blogObject,
      likes: blogObject.likes + 1,
    });
    dispatch({
      type: "LIKE_BLOG",
      data: blogObject,
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject();
    
  }
  };

export const removeBlog = (blogObject) => 
  async (dispatch) => {
    try{
      await blogService.remove(blogObject.id);
      dispatch({
        type: "REMOVE_BLOG",
        data: blogObject,
      });
    return Promise.resolve();
      }
    catch (e) {
    return Promise.reject();
    }
  };

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export default blogReducer
