import React, { useContext } from 'react';
import { DataContext } from '../../context/dataState';

export default function Notification() {
  const { message } = useContext(DataContext);

  return (
    <div className="notification">
      <p
        className={message.status === "success" ? "notification-title success-text" : "notification-title error-text"}>
        {message.title}</p>
      <p className="notification-description">{message.description}</p>
    </div>
  );
}
