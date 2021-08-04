import React from "react";
import "./SettingBar.css";
const SettingBar = ({ setMore, more, label }) => {
  return (
    <div className="more-con">
      <button
        onClick={() => {
          setMore(!more);
        }}
      >
        {label}
        <div
          style={{
            transform: `${more ? "rotate(180deg)" : "rotate(0deg)"}`,
          }}
        ></div>
      </button>
    </div>
  );
};
export default SettingBar;
