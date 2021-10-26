import React, { useEffect } from 'react';
import './Notification.css';

const Notification = React.memo(({ notification, setNotification }) => {
  useEffect(() => {
    if (notification?.title) {
      const setTimeoutId = setTimeout(() => {
        setNotification({ title: '', content: '' });
      }, 6000);
      return () => {
        clearTimeout(setTimeoutId);
      };
    }
  }, [setNotification, notification]);
  return (
    <div className="notification-con">
      <p
        className="delete notification-close-window"
        onClick={() => {
          setNotification({ title: '', content: '' });
        }}
      >
        X
      </p>
      <div className="notification-content-con">
        <p className="notification-title">{notification.title}</p>
        <p className="notification-content">{notification.content}</p>
      </div>
    </div>
  );
});
export default Notification;
