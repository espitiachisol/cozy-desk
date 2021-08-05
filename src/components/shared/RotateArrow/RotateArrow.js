import React from "react";
import "./RotateArrow.css";
const RotateArrow = ({ toggle }) => {
  return (
    <div
      className="rotate-arrow"
      style={{
        transform: `${toggle ? "rotate(180deg)" : "rotate(0deg)"}`,
      }}
    ></div>
  );
};
export default RotateArrow;
