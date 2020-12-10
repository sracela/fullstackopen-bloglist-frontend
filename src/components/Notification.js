import React from 'react'

const Notification = ({ message, error }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error" style={{color: error ? "red" : "green"}}>
        {message}
      </div>
    )
  }

export default Notification