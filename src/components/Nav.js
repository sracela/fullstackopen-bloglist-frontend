import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/auth";
import UserWidget from "./UserWidget"
import {
  Pane,
  Heading,
  HomeIcon,
  Menu,
  UserIcon,
  ApplicationsIcon,
  LogOutIcon,
  LogInIcon,
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
        display="grid"
        gridTemplateRows="1fr 3fr 4fr 1fr"
        width="25vw"
        height="100%"
        paddingX={32}
        paddingY={32}
      >
        <Heading size={800} is="h1" cursor="pointer" padding={0}>
          Blog Application
        </Heading>
        <Pane height={200}>
          {isLoggedIn && <UserWidget currentUser={currentUser} />}
        </Pane>
        <Menu>
          <Menu.Group>
            <Link style={{ textDecoration: "none" }} to="/">
              <Menu.Item icon={HomeIcon}>Home</Menu.Item>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/blogs">
              <Menu.Item icon={ApplicationsIcon}>Blogs</Menu.Item>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/users">
              <Menu.Item icon={UserIcon}>Users</Menu.Item>
            </Link>
          </Menu.Group>
          <Pane height={200}></Pane>
        </Menu>

        <Menu.Group>
          {isLoggedIn ? (
            <Menu.Item onClick={onLogout} icon={LogOutIcon}>
              LOG OUT
            </Menu.Item>
          ) : (
            <Link style={{ textDecoration: "none" }} to="/login">
              <Menu.Item icon={LogInIcon}>LOG IN</Menu.Item>
            </Link>
          )}
        </Menu.Group>
      </Pane>
    </nav>
  );
};

export default Nav;
