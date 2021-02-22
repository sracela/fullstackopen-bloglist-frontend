import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/auth";

const Nav = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.auth);

  const padding = {
    padding: 5,
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f5f5f5",
        padding: '10px'
      }}
    >
      <h1>Blogs Application</h1>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      {isLoggedIn ? (
        <div>
          <em>{currentUser.name} logged in </em>
          <button onClick={onLogout}>LOGOUT</button>
        </div>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </nav>
  );
};

export default Nav;
