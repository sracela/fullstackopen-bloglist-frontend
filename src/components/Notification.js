import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === "NONE") {
    return null;
  }
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  // <div className="error" style={{ color: error ? 'red' : 'green' }}></div>
  return <div style={style}>{notification}</div>;
};

export default Notification;
