import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  // const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
    return (
      <div style={{ maxWidth: "100%", padding: "5px", textAlign: "center" }}>
        <h2 style={{ letterSpacing: "2px" }}>USERS</h2>
        <table>
          <thead>
            <th></th>
            <th>blogs created</th>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
                {/* <td>user.blogs.lenght</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Users;