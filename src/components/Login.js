import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import { login } from "../reducers/auth";
import {
  useHistory,
} from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("text");

  const handleReset = () => resetUsername(resetPassword());

  const handleLogin = async (event) => {
      event.preventDefault();
    try {
    await dispatch(login({ username: username.value, password: password.value }));
      history.push("/");
      handleReset();
      dispatch(setNotification("Succesfuly login", false, 3));
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", true, 3));
    }
  };  

  return (
    <div style={{ maxWidth: "50%", padding: "5px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        username:
        <input {...username} />
        <br />
        <br />
        password:
        <input {...password} />
        <br />
        <br />
        <button type="submit">login</button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default Login;
