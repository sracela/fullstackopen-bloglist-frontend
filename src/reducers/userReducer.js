import userService from "../services/users";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users,
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject();
  }
};

export default userReducer;