import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "evergreen-ui";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === "NONE") {
    return null;
  }
  const style = {
    position: 'fixed',
    top: '10px',
    right: '0%',
    padding: 10,
    zIndex: 1000,
    maxWidth: '50%'
  };
  // <div className="error" style={{ color: error ? 'red' : 'green' }}></div>
  return (
    <div style={style}>
 <Alert
    appearance="card"
    intent={notification.iserror ? "danger" : "success"} 
    title={notification.message}
    marginBottom={32}
  />
    </div>
  );
};

export default Notification;
