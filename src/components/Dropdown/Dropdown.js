import React from "react";
import "./Dropdown.css";
const Dropdown = ({ options, onSelectedChange }) => {
  const renderedOptions = options.map((option) => {
    return (
      <option key={option} className="option">
        {option}
      </option>
    );
  });

  return (
    <div className="select">
      <select
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
