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
    case "COMMENT_BLOG": {
      const id = action.data.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments
          ? [...blogToChange.comments, action.data.comment]
          : [action.data.comment],
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
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


export const addCommentToBlog = ({id, comment}) => async (dispatch) => {
  try {
    await blogService.comment(id, comment);
    dispatch({
      type: "COMMENT_BLOG",
      data: {id, comment},
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject();
  }
};

export const initializeBlogs = () => 
  async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch({
        type: "INIT_BLOGS",
        data: blogs,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  };

export default blogReducer
