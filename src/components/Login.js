import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import { login } from "../reducers/auth";
import {
  useHistory,
} from "react-router-dom";
import { Card, Heading, Paragraph, Pane, Button, TextInputField, ArrowRightIcon } from "evergreen-ui";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

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
<Card
        elevation={3}
        margin="auto"
        background="white"
        textAlign="center"
        width={500}
  >
    <Pane> <img src={"welcome.jpg"} 
   width="100%"  alt="Welcome!"/></Pane>

   <Pane padding={32}>
    <Heading size={900}> Log-in!</Heading>
    <Paragraph marginTop="default">You are a click aside of seeing a lot of hilarious blogs from our users</Paragraph>
    </Pane>
    <Pane  background="purpleTint" padding={32} width="100%" position="relative"
        textAlign="left">
      <form onSubmit={handleLogin}>
        <TextInputField
  label="Username"
  placeholder="i.e. supersara"
  {...username}
/>
        <TextInputField
  label="Password"
  placeholder="i.e. supersara"
  {...password}
/>
        <Button type="submit" appearance="primary" height={40} iconAfter={ArrowRightIcon} position="absolute" right={"0%"} marginRight={32} marginBottom={32}>
          LOG IN
        </Button>
        <br />
        <br />
      </form></Pane>
    </Card>
  );
};

export default Login;
