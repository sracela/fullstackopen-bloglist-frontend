import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === "NONE") {
    return null;
  }
  const style = {
    position: 'sticky',
    top: '10px',
    padding: 10,
    zIndex: 1000,
    maxWidth: '50%'
  };
  // <div className="error" style={{ color: error ? 'red' : 'green' }}></div>
  return (
    <div style={style}>
      <p className={notification.iserror ? "error" : "success"}>{notification.message}</p>
    </div>
  );
};

export default Notification;
