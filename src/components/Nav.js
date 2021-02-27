import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/auth";

import {
  Pane,
  Heading,
  HomeIcon,
  Menu,
  UserIcon,
  ApplicationsIcon,LogOutIcon
} from "evergreen-ui";

const Nav = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        width="20vw"
        height="100%"
        paddingX={32}
        paddingY={32}
      >
        <Heading size={800} is="h1" cursor="pointer" padding={0}>
          Blog App
        </Heading>
        {/* <Link style={{ textDecoration: "none" }} to="/login">
          <Menu.Item intent="danger">login</Menu.Item>
          <em>{currentUser.name} logged in </em>
        </Link> */}
        <Menu>
          <Menu.Group>
            <Link style={{ textDecoration: "none" }} to="/">
              <Menu.Item icon={HomeIcon}>home</Menu.Item>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/blogs">
              <Menu.Item icon={ApplicationsIcon}>blogs</Menu.Item>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/users">
              <Menu.Item icon={UserIcon}>users</Menu.Item>
            </Link>
          </Menu.Group>
          <Menu.Divider />
          {!isLoggedIn &&
            <Menu.Group>
              <Menu.Item icon={LogOutIcon}><button onClick={onLogout}>LOGOUT</button></Menu.Item>
            </Menu.Group>
          }
        </Menu>
      </Pane>
    </nav>
  );
};

export default Nav;
