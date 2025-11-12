import React from 'react'
import './Notification.css'

function Notification({ show, message }) {
  return (
    <div className={`notification ${show ? 'show' : ''}`}>
      {message}
    </div>
  )
}

export default Notification
