import React from "react";
import "./SettingBar.css";
import RotateArrow from "../RotateArrow/RotateArrow";
const SettingBar = ({ setMore, more, label }) => {
  return (
    <div className="more-con">
      <button
        onClick={() => {
          setMore(!more);
        }}
      >
        {label}
        <RotateArrow toggle={more} />
      </button>
    </div>
  );
};
export default SettingBar;
