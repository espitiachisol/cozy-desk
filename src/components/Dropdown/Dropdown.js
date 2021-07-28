import React from "react";
import "./Dropdown.css";
const Dropdown = ({ options, onSelectedChange, Selected }) => {
  const renderedOptions = options.map((option) => {
    return (
      <option key={option} className="option">
        {option}
      </option>
    );
  });
  let thisSelected = Selected;
  return (
    <div className="select">
      <select
        value={thisSelected}
        onChange={(e) => {
          onSelectedChange(parseInt(e.target.value, 10));
        }}
      >
        {renderedOptions}
      </select>
    </div>
  );
};
export default Dropdown;
