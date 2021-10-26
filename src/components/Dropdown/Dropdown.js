import React from 'react';
import './Dropdown.css';

const Dropdown = React.memo(({
  options, onSelectedChange, Selected, witchAttentionToShow,
}) => (
  <div className="select">
    <select
      value={Selected}
      onChange={(e) => {
        onSelectedChange(parseInt(e.target.value, 10));
      }}
      onClick={witchAttentionToShow}
    >
      {options.map((option) => (
        <option key={option} className="option">
          {option}
        </option>
      ))}
    </select>
  </div>
));
export default Dropdown;
