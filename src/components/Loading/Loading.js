import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="loading-box">
      <p>uploading</p>
      <div className="loading-con">
        <div className="dot1"></div>
        <div className="dot2"></div>
        <div className="dot3"></div>
      </div>
    </div>
  );
};
export default Loading;
