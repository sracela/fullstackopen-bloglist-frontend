import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.find((n) => n.id === id.toString());
  if (!user) {
    return (<div>no data</div>);
  }
  return (
    <div>
      <h2>{user?.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user?.blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => ( 
            <Link to={`/blogs/${blog.id}`}><li key={blog.id}>{blog.title}</li></Link>
          ))}
      </ul>
    </div>
  );
};

export default User;
