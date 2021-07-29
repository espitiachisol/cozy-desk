import React from "react";
import "./Alert.css";
const Alert = ({ setShowAlert, confirm, message }) => {
  return (
    <div className="alert-con">
      <div
        className="delete alert-delete"
        onClick={() => {
          setShowAlert(false);
        }}
      >
        X
      </div>
      <div className="alert-message">
        <h3>{message.title}</h3>
        <p>{message.text}</p>
      </div>
      <button className="button-style" onClick={confirm}>
        Yes,I understand.
      </button>
    </div>
  );
};
export default Alert;
