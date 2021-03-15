import loginService from "../services/login";

const user = JSON.parse(window.localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}

export const login = ({ username, password }) => async (dispatch) => {
  try {
    const data = await loginService.login({ username, password });
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { user: data },
    });
    return Promise.resolve();
  } catch (e) {
    dispatch({
      type: "LOGIN_FAIL",
    });
    return Promise.reject();
  }
};

export const logout = () => (dispatch) => {
  loginService.logout();

  dispatch({
    type: "LOGOUT",
  });
};
