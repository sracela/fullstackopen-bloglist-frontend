import React from "react";

const Users = () => {
    return (
      <div style={{ maxWidth: "100%", padding: "5px", textAlign: "center" }}>
        <h2 style={{ letterSpacing: "2px" }}>USERS</h2>
        <table>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>6</td>
          </tr>
        </table>
      </div>
    );
}

export default Users;