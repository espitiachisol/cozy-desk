import React from "react";
import "./NoDataMessage.css";
const NoDataMessage = ({ userState, userMessage, guestMessage }) => {
  return (
    <div className="no-data-message-display">
      {userState ? (
        <div className="user-no-data-message">
          <p>{userMessage.title}</p>
          <p>{userMessage.content}</p>
        </div>
      ) : (
        <div className="guest-no-data-message">
          <p>{guestMessage.title}</p>
          <p>{guestMessage.content}</p>
        </div>
      )}
    </div>
  );
};
export default NoDataMessage;
